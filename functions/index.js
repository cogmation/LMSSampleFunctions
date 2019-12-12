'use strict';
const functions = require('firebase-functions');
const request = require('request');

const lmsID = "-LrtYiM1kNw7CueH8dZR";// ID of Cogmation Testing LMS, your ID will be provided by Cogmation.

// When a new user is created, ensure VRT system has user as well.
exports.addUserToVRT = functions.auth.user().onCreate((user) => {
    var uid = user.uid;
    return new Promise(function (resolve, reject) {
        request({
            url: functionsHost + addVRTUserURL,
            method: "POST",
            json: true,
            body: { email: user.email, lmsID: lmsID }
        }, (error, response, body) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            if (response.statusCode != 200) {
                reject({ error: 'Invalid status code <' + response.statusCode + '>' })
            }
            resolve(body);
        });
    });
});