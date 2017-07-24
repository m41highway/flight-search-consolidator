const Promise = require('bluebird');
const mistiflyProxy = require('../proxy-mystifly');

const search = async function (departDate, returnDate, origin, destination, cabinType) {

    // ------------------------------
    // Step 1: Init proxy
    // ------------------------------
    let mistiflyClient = await mistiflyProxy.createClient;

    // ------------------------------
    // Step 2: Create session
    // ------------------------------
    let mistiflySession = await mistiflyProxy.createSessionPromise(mistiflyClient);

    // ------------------------------
    // Step 3: Flight search
    // ------------------------------
    let options = {
        legs: [
            {
                'origin': origin,
                'destination': destination,
                'departureDateTime': `${departDate}T00:00:00`
            },
            {
                'origin': destination,
                'destination': origin,
                'departureDateTime': `${returnDate}T00:00:00`
            }
        ],
        cabinType: cabinType  // [ 'Economy', 'Business', 'First' ]
    };

    console.log('----- Step 3": Low Fare Search -----');
    console.log(options);
    let res = await mistiflyProxy.airLowFareSearchPromise(mistiflyClient, mistiflySession.CreateSessionResult.SessionId, options);

    if (!res.AirLowFareSearchResult) console.log('Fail to connect to API!');

    if(res.AirLowFareSearchResult.Errors) {
        console.log(res.AirLowFareSearchResult.Errors);
    }


    if (res.AirLowFareSearchResult.PricedItineraries) {
        let fareList = res.AirLowFareSearchResult.PricedItineraries.PricedItinerary;

        console.log(fareList);
        console.log('--------------------------------------');

        let simplifiedList = fareList.map(function(element){
            return {
                currency: element.AirItineraryPricingInfo.ItinTotalFare.TotalFare.CurrencyCode,
                total: element.AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount,
                isPassportMandatory: element.IsPassportMandatory,
                ticketType: element.TicketType,
                fareSourceCode: element.AirItineraryPricingInfo.FareSourceCode,
                segments: element.OriginDestinationOptions.OriginDestinationOption,
            }
        })

        simplifiedList.forEach(function(s){
            console.log('=======================================');
            // console.log(s.fareSourceCode);

            let summaries = [];

            s.segments.forEach(function(seg){
                // console.log(seg);
                let s = seg.FlightSegments.FlightSegment;

                // console.log(seg.FlightSegments.FlightSegment.DepartureAirportLocationCode);
                // console.log(seg.FlightSegments.FlightSegment.ArrivalAirportLocationCode);
                // console.log(seg.FlightSegments.FlightSegment.DepartureDateTime);
                // console.log(seg.FlightSegments.FlightSegment.ArrivalDateTime);
                // console.log(seg.FlightSegments.FlightSegment.OperatingAirline);
                // console.log(seg.FlightSegments.FlightSegment.CabinClassCode);

                let summary = `${s.DepartureAirportLocationCode} -> ${s.ArrivalAirportLocationCode} by ${s.OperatingAirline.Code} ${s.OperatingAirline.FlightNumber} (${s.OperatingAirline.Equipment}) ${s.DepartureDateTime} -> ${s.ArrivalDateTime}`;
                summaries.push(summary);
                console.log(summary);
            })
            s.summaries = summaries;
            // console.log(`${s.totalFare.CurrencyCode} ${s.totalFare.Amount}`);
            console.log(`${s.currency} ${s.totol}`);
        })
        return simplifiedList;
    }
}

module.exports = {
    search: search
}