import { google } from 'googleapis';
import { MessageCodeError } from '../errors/message-code-error';
import { configService } from '../config/config.service';

export const getSheet = async (spreadsheetId:string, range:string, fromCatch = false):Promise<string[][]> => {
  const { clientID, clientSecret } = configService.getGoogleOAuthCredentials();
  const oAuth2Client = new google.auth.OAuth2(clientID, clientSecret);
  oAuth2Client.setCredentials(configService.getGoogleSheetsCredentials());

  const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });
  try {
    const result = await sheets.spreadsheets.values.get({ spreadsheetId, range });
    return result.data.values;
  } catch (e) {
    if (e.code === 404) {
      throw new MessageCodeError('uploadError:sheetNotFound');
    }
    if (e.code === 'EAI_AGAIN' && !fromCatch) {
      return getSheet(spreadsheetId, range, true);
    }
    throw new MessageCodeError('uploadError:sheetUnavailable', e.stack);
  }
};
