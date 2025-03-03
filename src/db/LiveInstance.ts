import type { LiveDB } from './LiveDB'
import type { LiveTable } from './LiveTable'
import type { STATE } from 'src/front/state'

export type $BaseInstanceFields = 'id' | 'createdAt' | 'updatedAt'
export type BaseInstanceFields = {
    id: string
    createdAt: number
    updatedAt: number
}

export interface LiveInstance<T extends BaseInstanceFields, L> {
    st: STATE
    db: LiveDB
    table: LiveTable<T, any>
    data: T
    get id(): T['id']
    get createdAt(): T['createdAt']
    get updatedAt(): T['updatedAt']
    onHydrate?: (data: T) => void
    onCreate?: (data: T) => void
    onUpdate?: (prev: Maybe<T>, next: T) => void
    update: (t: Partial<T>) => void
    delete: () => void
    toJSON: () => T
    init(table: LiveTable<T, any>, data: T): void
    clone(t?: Partial<T>): L
    log(...args: any[]): void
}
