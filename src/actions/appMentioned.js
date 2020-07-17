require('dotenv').config();
const {
    getAuthToken,
    getSpreadSheetValues,
    batchUpdateSpreadSheet,
} = require('../googleapis/googleSheetsService')


async function appMentioned({context, client, body}) {
    try {
        console.log("app has been mentioned");
    } catch(error) {
        console.error(error);
        throw error;
    }
}

module.exports = appMentioned;