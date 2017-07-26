const proxy = require('../proxy-travelfusion');
const config = require('../config');
const travelfusionRequestHelper = require('../travelfusion-request-helper');

const search = async function (departDate, returnDate, origin, destination) {
    let options = travelfusionRequestHelper.generateSearchOption(departDate, returnDate, origin, destination);

    let res = await proxy.submitSearchRequestPromise(config.travelfusion.flights.apiEndpoint, options);

    let jsonObj = JSON.parse(res);
    console.log(jsonObj.CommandList);

    return jsonObj;
}

module.exports = {
    search: search
}