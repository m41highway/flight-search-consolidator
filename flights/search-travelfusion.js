const proxy = require('../proxy-travelfusion');
const config = require('../config');
const travelfusionRequestHelper = require('../travelfusion-request-helper');

const search = async function (departDate, returnDate, origin, destination) {
    let options = travelfusionRequestHelper.generateSearchOption(departDate, returnDate, origin, destination);

    let res = await proxy.submitSearchRequestPromise(config.travelfusion.flights.apiEndpoint, options);

    // ----------------------------------------------------
    // 1.
    // ----------------------------------------------------
    let jsonObj = JSON.parse(res);
    // console.log(jsonObj.CommandList);
    // routingId = jsonObj.CommandList.StartRouting.RoutingId;

    // ----------------------------------------------------
    // 2.
    // ----------------------------------------------------
    // options = travelfusionRequestHelper.generateResultRequestOption(routingId)
    // res = await proxy.submitResultRequestPromise(config.travelfusion.flights.apiEndpoint, options);

    // jsonObj = JSON.parse(res);


    return jsonObj;
}

module.exports = {
    search: search
}