export class Config {
  domain = '';
  constructor() {
    let host = window.location.host;
    if (host === 'localhost:9000') {
      this.domain = '//localhost:3000/api/';
    } else if (host === 'teachaurelia.com') {
      this.domain = '/api/';
    }
  }
}
