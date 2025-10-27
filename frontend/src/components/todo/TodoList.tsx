import { CheckSquare } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { TodoItem } from './TodoItem';
import { useTodos } from '../../hooks/useTodos';
import { Skeleton } from '../ui/skeleton';

export const TodoList = () => {
    const { data: todos, isLoading, error } = useTodos();

    if (isLoading) {
        return (
            <div className='space-y-3'>
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className='flex items-center gap-3 p-4 bg-card rounded-lg border'
                    >
                        <Skeleton className='h-4 w-4' />
                        <div className='flex-1 space-y-2'>
                            <Skeleton className='h-4 w-full' />
                            <Skeleton className='h-3 w-32' />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className='flex flex-col items-center justify-center py-12 text-center'>
                <div className='text-destructive text-sm mb-2'>Failed to load todos. Please try again.</div>
                <div className='text-xs text-muted-foreground'>
                    Error: {error instanceof Error ? error.message : 'Unknown error'}
                </div>
            </div>
        );
    }

    if (!todos || todos.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center py-12 text-center'>
                <CheckSquare className='h-12 w-12 text-muted-foreground mb-4' />
                <h3 className='text-lg font-semibold text-muted-foreground mb-2'>No todos yet</h3>
                <p className='text-sm text-muted-foreground max-w-sm'>
                    Add your first todo above to get started with organizing your tasks.
                </p>
            </div>
        );
    }

    return (
        <ScrollArea className='h-[500px]'>
            <div className='space-y-3'>
                {todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                    />
                ))}
            </div>
        </ScrollArea>
    );
};
