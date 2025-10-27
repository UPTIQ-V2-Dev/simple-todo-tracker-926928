import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateTodoInput, UpdateTodoInput } from '../types/todo';
import { getTodos, addTodo, updateTodo, deleteTodo, toggleTodo, getTodoStats } from '../services/todos';

const TODOS_QUERY_KEY = ['todos'];
const STATS_QUERY_KEY = ['todo-stats'];

export const useTodos = () => {
    return useQuery({
        queryKey: TODOS_QUERY_KEY,
        queryFn: getTodos
    });
};

export const useAddTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: CreateTodoInput) => addTodo(input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
            queryClient.invalidateQueries({ queryKey: STATS_QUERY_KEY });
        }
    });
};

export const useUpdateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, input }: { id: string; input: UpdateTodoInput }) => updateTodo(id, input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
            queryClient.invalidateQueries({ queryKey: STATS_QUERY_KEY });
        }
    });
};

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteTodo(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
            queryClient.invalidateQueries({ queryKey: STATS_QUERY_KEY });
        }
    });
};

export const useToggleTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => toggleTodo(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
            queryClient.invalidateQueries({ queryKey: STATS_QUERY_KEY });
        }
    });
};

export const useTodoStats = () => {
    return useQuery({
        queryKey: STATS_QUERY_KEY,
        queryFn: getTodoStats
    });
};
