const config = require('./config.json');

const transformDate = function (date) {

    let travelfusionDate = '';

    const year = date.substring(0, 4);
    const month = date.substring(5,7);
    const day = date.substring(8,10);

    console.log('YYYY', year);
    console.log('MM', month);
    console.log('DD', year);

    travelfusionDate = `${day}/${month}/${year}-10:00`;

    return travelfusionDate;
}

const generateSearchOption = function (departDate, returnDate, origin, destination) {
    const options = {
        body: '<CommandList>' +
        '<StartRouting>' +
            `<XmlLoginId>${config.travelfusion.flights.xmlLoginId}</XmlLoginId>` +
            `<LoginId>${config.travelfusion.flights.xmlLoginId}</LoginId>` +
            `<Mode>plane</Mode>` +
            '<Origin>' +
                `<Descriptor>${origin}</Descriptor>` +
                `<Type>airportgroup</Type>` +
            `</Origin>` +
            `<Destination>` +
                `<Descriptor>${destination}</Descriptor>` +
                `<Type>airportcode</Type>` +
                `<Radius>1000</Radius>` +
            `</Destination>` +
            `<OutwardDates>` +
                // `<DateOfSearch>27/08/2017-10:00</DateOfSearch>` +
                `<DateOfSearch>${transformDate(departDate)}</DateOfSearch>` +
            `</OutwardDates>` +
            `<ReturnDates>` +
                // `<DateOfSearch>30/08/2017-10:00</DateOfSearch>` +
                `<DateOfSearch>${transformDate(returnDate)}</DateOfSearch>` +
            `</ReturnDates>` +
            `<MaxChanges>1</MaxChanges>` +
            `<MaxHops>2</MaxHops>` +
            `<Timeout>40</Timeout>` +
            `<TravellerList>` +
                `<Traveller>` +
                    `<Age>30</Age>` +
                `</Traveller>` +
            `</TravellerList>` +
            `<IncrementalResults>true</IncrementalResults>` +
        `</StartRouting>` +
        `</CommandList>`,
            headers:{
                'Content-Type': 'text/xml; charset=utf-8',
        }
    }
    console.log(options);
    return options;
}

const generateResultRequestOption = function (routingId) {

    const options = {
        body: '<CommandList>' +
            '<CheckRouting>' +
                `<XmlLoginId>${config.travelfusion.flights.xmlLoginId}</XmlLoginId>` +
                `<LoginId>${config.travelfusion.flights.xmlLoginId}</LoginId>` +
                `<RoutingId>${routingId}</RoutingId>` +
            `</CheckRouting>` +
        `</CommandList>`,
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
        }
    }
console.log(options);
    return options;
}

module.exports = {
    generateSearchOption: generateSearchOption,
    generateResultRequestOption: generateResultRequestOption
}