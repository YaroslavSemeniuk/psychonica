import { credentials } from './credentials.json';
import { token } from './token.json';

class ConfigService {
  getGoogleSheetsCredentials() {
    return JSON.parse(token);
  }

  getGoogleOAuthCredentials() {
    return credentials.installed;
  }
}
module.exports = ConfigService;
