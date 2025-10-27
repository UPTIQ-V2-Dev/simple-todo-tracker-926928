import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { useAddTodo } from '../../hooks/useTodos';
import { todoFormSchema, TodoFormData } from '../../lib/validations/todo';

export const AddTodoForm = () => {
    const addTodoMutation = useAddTodo();

    const form = useForm<TodoFormData>({
        resolver: zodResolver(todoFormSchema),
        defaultValues: {
            title: ''
        }
    });

    const onSubmit = async (data: TodoFormData) => {
        try {
            await addTodoMutation.mutateAsync({ title: data.title });
            form.reset();
        } catch (error) {
            console.error('Failed to add todo:', error);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex gap-2'
            >
                <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                        <FormItem className='flex-1'>
                            <FormControl>
                                <Input
                                    placeholder='Add a new todo...'
                                    {...field}
                                    disabled={addTodoMutation.isPending}
                                    className='h-12'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type='submit'
                    disabled={addTodoMutation.isPending}
                    size='lg'
                    className='h-12 px-6'
                >
                    <Plus className='h-4 w-4 mr-2' />
                    Add
                </Button>
            </form>
        </Form>
    );
};
