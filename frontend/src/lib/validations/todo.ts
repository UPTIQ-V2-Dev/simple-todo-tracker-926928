import { z } from 'zod';

export const todoFormSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or less').trim()
});

export const updateTodoSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or less').trim().optional(),
    completed: z.boolean().optional()
});

export type TodoFormData = z.infer<typeof todoFormSchema>;
export type UpdateTodoData = z.infer<typeof updateTodoSchema>;
