import { token } from 'token.json';
import { credentials } from 'credentials.json';

class ConfigService {
  getGoogleSheetsCredentials() {
    return JSON.parse(token);
  }

  getGoogleOAuthCredentials() {
    return credentials.installed;
  }
}
module.exports = ConfigService;
