export class SysError extends Error {
  protected alert: string;

  constructor(message: string, error?:String) {
    super(message);
    this.alert = message;
  }

  getAlert(): string {
    return this.alert;
  }
}
