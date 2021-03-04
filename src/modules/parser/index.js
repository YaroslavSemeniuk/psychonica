import fs from 'fs';
import readline from 'readline';
import { google } from 'googleapis';
import configService from './configService';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';

fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  authorize(JSON.parse(content), listMajors);
});

function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0],
  );

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);

      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function listMajors(auth) {
  const sheets = google.sheets({ version: 'v4', auth });
  sheets.spreadsheets.values.get({
    spreadsheetId: '1TDNltZ5p0EecTPXJt8KcixmqWJtytlF_-ibcAaoAid8',
    range: 'A2:L10',
  }, (err, res) => {
    if (err) return console.log(`The API returned an error: ${err}`);
    const rows = res.data.values;
    if (rows.length) {
      console.log('id, titleText:');

      rows.map((row) => {
        console.log(`${row[0]}, ${row[8]}`);
      });
    } else {
      console.log('No data found.');
    }
  });

  const getSheet = async (spreadsheetId, range, fromCatch = false) => {
    const { clientID, clientSecret } = configService.getGoogleOAuthCredentials();
    const oAuth2Client = new google.auth.OAuth2(clientID, clientSecret);
    oAuth2Client.setCredentials(configService.getGoogleSheetsCredentials());

    const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });
    try {
      const result = await sheets.spreadsheets.values.get({ spreadsheetId, range });
      return result.data.values;
    } catch (e) {
      if (e.code === 404) {
        console.log('uploadError:sheetNotFound', e.stack);
      }
      if (e.code === 'EAI_AGAIN' && !fromCatch) {
        return getSheet(spreadsheetId, range, true);
      }
      console.log('uploadError:sheetUnavailable', e.stack);
    }
  };
}
