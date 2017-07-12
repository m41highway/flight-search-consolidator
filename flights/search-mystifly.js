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
    let result = await mistiflyProxy.airLowFareSearchPromise(mistiflyClient, mistiflySession.CreateSessionResult.SessionId, options);

    return result;
}

module.exports = {
    search: search
}