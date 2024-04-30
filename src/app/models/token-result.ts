export interface TokenResult {
    result: Token
    id: number
    exception: any
    status: number
    isCanceled: boolean
    isCompleted: boolean
    isCompletedSuccessfully: boolean
    creationOptions: number
    asyncState: any
    isFaulted: boolean
}

export interface Token {
    token: string
}
