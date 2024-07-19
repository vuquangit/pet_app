export type ErrorResponse = {
  status?: string
  title?: string
  data?: {[key in string]: Array<string>}
}

export type ErrorsResponse = {errors?: Array<ErrorResponse>} & ErrorResponse

export interface IBaseResponse<T = any> {
  status?: number
  success?: boolean
  result?: {
    data?: T
  }
  error?: any
}
