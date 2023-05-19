export interface ICustomError extends Error {
  data: {
    message: string
  }
}
