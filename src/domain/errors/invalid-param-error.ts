export class InvalidParamError extends Error {
  constructor(message: string) {
    super();
    this.name = 'InvalidParamError';
    this.message = message;
  }
}
