export type IWidget<T, I, X extends { type: T }, S, O> = {
    $Input: I
    $Serial: X
    $State: S
    $Output: O
}
export type IRequest<T, I, X, S, O> = {
    type: T
    state: S
    readonly result: O
    readonly serial: X
}
export type ReqResult<Req> = Req extends IWidget<any, any, any, any, infer O> ? O : never
export type ReqState<Req> = Req extends IWidget<any, any, any, infer S, any> ? S : never

export type LabelPos = 'start' | 'end'
export type ReqInput<X> = X & {
    label?: string
    labelPos?: LabelPos
    layout?: 'H' | 'V'
    group?: string
    tooltip?: string
    i18n?: { [key: string]: string }
    className?: string
}
