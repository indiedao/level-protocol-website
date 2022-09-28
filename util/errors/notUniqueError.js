export class NotUniqueError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NotUniqueError'
  }
}
