export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTodoInput {
    title: string;
}

export interface UpdateTodoInput {
    title?: string;
    completed?: boolean;
}

export interface TodoFormData {
    title: string;
}

export interface TodoStats {
    total: number;
    completed: number;
    pending: number;
}
