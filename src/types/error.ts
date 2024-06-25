export interface Error {
  field: string;
  message: string;
}

export interface ErrorResponse {
    message: string
    error: string
    statusCode: number
}
