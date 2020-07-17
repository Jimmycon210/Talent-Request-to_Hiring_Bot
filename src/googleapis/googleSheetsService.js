const { google } = require('googleapis');
const sheets = google.sheets('v4');
require('dotenv').config();

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const spreadsheetId = '1EU0A6xoTq1paHSPEHCXEf1cdjhsdcnuBJC8RJ27i9YU';
const sheetName = 'Sheet1';

async function getAuthToken() {
    const auth = new google.auth.GoogleAuth({
      scopes: SCOPES
    });
    const authToken = await auth.getClient();
    return authToken;
}

async function getSpreadSheetValues({spreadsheetId, auth, sheetName}) {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      auth,
      range: sheetName
    });
    return res;
}

async function batchUpdateSpreadSheet({ spreadsheetId, auth }, updateData) {
    const request = {
        spreadsheetId: spreadsheetId,
        resource: {
            valueInputOption: 'USER_ENTERED',
            data: updateData
        }, 
        auth
    }
    const res = (await sheets.spreadsheets.values.batchUpdate(request)).data;
    return res;
}

module.exports = {
    getAuthToken,
    getSpreadSheetValues,
    batchUpdateSpreadSheet,
};