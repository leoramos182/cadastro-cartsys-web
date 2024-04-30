export interface BaseResult<T> {
    data: T
    success: boolean
    errors: any
}
