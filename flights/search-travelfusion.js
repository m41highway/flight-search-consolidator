const proxy = require('../proxy-travelfusion');
const config = require('../config');

const search = async function () {

    const options = {
        body: '<CommandList>' +
        '<StartRouting>' +
            `<XmlLoginId>${config.travelfusion.flights.xmlLoginId}</XmlLoginId>` +
            `<LoginId>${config.travelfusion.flights.xmlLoginId}</LoginId>` +
            `<Mode>plane</Mode>` +
            '<Origin>' +
                // `<Descriptor>LON</Descriptor>` +
                // `<Descriptor>DEL</Descriptor>` +
                `<Descriptor>HKG</Descriptor>` +
                `<Type>airportgroup</Type>` +
            `</Origin>` +
            `<Destination>` +
                // `<Descriptor>MAD</Descriptor>` +
                // `<Descriptor>SIN</Descriptor>` +
                `<Descriptor>NRT</Descriptor>` +
                `<Type>airportcode</Type>` +
                `<Radius>1000</Radius>` +
            `</Destination>` +
            `<OutwardDates>` +
                `<DateOfSearch>27/08/2017-10:00</DateOfSearch>` +
            `</OutwardDates>` +
            `<ReturnDates>` +
                `<DateOfSearch>30/08/2017-10:00</DateOfSearch>` +
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

    console.log('In Travelfusion search function');
    let res = await proxy.submitSearchRequestPromise(config.travelfusion.flights.apiEndpoint, options);

    let jsonObj = JSON.parse(res);
    console.log(jsonObj.CommandList);

    return jsonObj;
}

module.exports = {
    search: search
}