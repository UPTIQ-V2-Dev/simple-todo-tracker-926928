import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2, Edit3, Check, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { useUpdateTodo, useDeleteTodo, useToggleTodo } from '../../hooks/useTodos';
import { Todo } from '../../types/todo';
import { todoFormSchema, TodoFormData } from '../../lib/validations/todo';
import { cn } from '../../lib/utils';

interface TodoItemProps {
    todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const updateTodoMutation = useUpdateTodo();
    const deleteTodoMutation = useDeleteTodo();
    const toggleTodoMutation = useToggleTodo();

    const form = useForm<TodoFormData>({
        resolver: zodResolver(todoFormSchema),
        defaultValues: {
            title: todo.title
        }
    });

    const handleToggle = async () => {
        try {
            await toggleTodoMutation.mutateAsync(todo.id);
        } catch (error) {
            console.error('Failed to toggle todo:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteTodoMutation.mutateAsync(todo.id);
        } catch (error) {
            console.error('Failed to delete todo:', error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
        form.reset({ title: todo.title });
    };

    const handleSave = async (data: TodoFormData) => {
        try {
            await updateTodoMutation.mutateAsync({
                id: todo.id,
                input: { title: data.title }
            });
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update todo:', error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        form.reset({ title: todo.title });
    };

    return (
        <div className='flex items-center gap-3 p-4 bg-card rounded-lg border group'>
            <Checkbox
                checked={todo.completed}
                onCheckedChange={handleToggle}
                disabled={toggleTodoMutation.isPending}
                className='mt-1'
            />

            {isEditing ? (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSave)}
                        className='flex-1 flex gap-2'
                    >
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem className='flex-1'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={updateTodoMutation.isPending}
                                            autoFocus
                                            className='h-9'
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button
                            type='submit'
                            size='sm'
                            disabled={updateTodoMutation.isPending}
                            className='h-9 px-3'
                        >
                            <Check className='h-4 w-4' />
                        </Button>
                        <Button
                            type='button'
                            variant='outline'
                            size='sm'
                            onClick={handleCancel}
                            disabled={updateTodoMutation.isPending}
                            className='h-9 px-3'
                        >
                            <X className='h-4 w-4' />
                        </Button>
                    </form>
                </Form>
            ) : (
                <>
                    <div className='flex-1'>
                        <p
                            className={cn(
                                'text-sm font-medium',
                                todo.completed && 'line-through text-muted-foreground'
                            )}
                        >
                            {todo.title}
                        </p>
                        <p className='text-xs text-muted-foreground mt-1'>
                            {new Date(todo.createdAt).toLocaleDateString()} at{' '}
                            {new Date(todo.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>

                    <div className='flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                        <Button
                            variant='ghost'
                            size='sm'
                            onClick={handleEdit}
                            disabled={updateTodoMutation.isPending}
                            className='h-8 w-8 p-0'
                        >
                            <Edit3 className='h-4 w-4' />
                        </Button>
                        <Button
                            variant='ghost'
                            size='sm'
                            onClick={handleDelete}
                            disabled={deleteTodoMutation.isPending}
                            className='h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground'
                        >
                            <Trash2 className='h-4 w-4' />
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};
