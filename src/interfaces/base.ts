export type ErrorResponse = {
  status?: string
  title?: string
  data?: { [key in string]: Array<string> }
}

export type ErrorsResponse = { errors?: Array<ErrorResponse> } & ErrorResponse

export interface IMeta {
  currentPage: number
  from: number
  to: number
  perPage: number
  lastPage: number
  total: number
}

export interface IBaseResponse<T = any> {
  status?: number
  success?: boolean
  result?: {
    data?: T
    meta: IMeta
  }
  error?: any
}
