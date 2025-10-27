import { CheckCircle, Circle, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useTodoStats } from '../../hooks/useTodos';
import { Skeleton } from '../ui/skeleton';

export const TodoStats = () => {
    const { data: stats, isLoading } = useTodoStats();

    if (isLoading) {
        return (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
                {Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i}>
                        <CardHeader className='pb-2'>
                            <Skeleton className='h-4 w-16' />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className='h-8 w-12' />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (!stats) {
        return null;
    }

    const completionPercentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Total Tasks</CardTitle>
                    <Target className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>{stats.total}</div>
                    <p className='text-xs text-muted-foreground'>{stats.total === 1 ? 'task' : 'tasks'} in total</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Completed</CardTitle>
                    <CheckCircle className='h-4 w-4 text-green-600' />
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold text-green-600'>{stats.completed}</div>
                    <p className='text-xs text-muted-foreground'>{completionPercentage}% completion rate</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Pending</CardTitle>
                    <Circle className='h-4 w-4 text-orange-600' />
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold text-orange-600'>{stats.pending}</div>
                    <p className='text-xs text-muted-foreground'>{stats.pending === 1 ? 'task' : 'tasks'} remaining</p>
                </CardContent>
            </Card>
        </div>
    );
};
