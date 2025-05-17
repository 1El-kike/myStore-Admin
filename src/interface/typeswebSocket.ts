
//Tipos para WebSocket
export type WebSocketMessage<T = any> = {
    entityType:string
    id:string | number
    type: 'INSERT' | 'UPDATE' | 'DELETE'
    payload: T
}

export interface Entity {
    id:string | number
    updatedAt:string
}

export interface DatePoint {
    x:string | Date
    y: number
}