export class User {
  constructor(
    public email: string,
    id: string,
    // tslint:disable-next-line:variable-name
    private _token: string,
    // tslint:disable-next-line:variable-name
    private _tokenExpirationDate: Date
  ) { }

  get token(): string | null {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }

    return this._token;
  }
}
