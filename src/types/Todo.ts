interface ITodo {
    id?: string;
    item?: string;
    userId?: string;
    isDone?: boolean;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface ITodoUpdatePayload {
    action: 'DONE' | 'UNDONE';
}

export type { ITodo, ITodoUpdatePayload };