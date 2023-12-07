export class TokenResponse {
  type: string;
  accessToken: string;
  refreshToken: string;
  username: string;

  constructor() {
    this.type = "";
    this.accessToken = "";
    this.refreshToken = "";
    this.username = "";
  }
}
