import { CheckSquare } from 'lucide-react';
import { AddTodoForm } from '../components/todo/AddTodoForm';
import { TodoList } from '../components/todo/TodoList';
import { TodoStats } from '../components/todo/TodoStats';
import { ThemeToggle } from '../components/theme-toggle';

export const TodoPage = () => {
    return (
        <div className='min-h-screen bg-background'>
            <div className='container mx-auto px-4 py-8 max-w-4xl'>
                {/* Header */}
                <div className='flex items-center justify-between mb-8'>
                    <div className='flex items-center gap-3'>
                        <CheckSquare className='h-8 w-8 text-primary' />
                        <div>
                            <h1 className='text-3xl font-bold text-foreground'>Todo App</h1>
                            <p className='text-sm text-muted-foreground'>Organize your tasks and stay productive</p>
                        </div>
                    </div>
                    <ThemeToggle />
                </div>

                {/* Stats */}
                <TodoStats />

                {/* Add Todo Form */}
                <div className='mb-8'>
                    <h2 className='text-lg font-semibold mb-4'>Add New Task</h2>
                    <AddTodoForm />
                </div>

                {/* Todo List */}
                <div>
                    <h2 className='text-lg font-semibold mb-4'>Your Tasks</h2>
                    <TodoList />
                </div>
            </div>
        </div>
    );
};
