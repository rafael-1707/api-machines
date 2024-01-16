export class NotFoundError extends Error {
  constructor(paramName: string) {
    super();
    this.name = 'NotFoundError';
    this.message = `Not found: ${paramName}`;
  }
}
