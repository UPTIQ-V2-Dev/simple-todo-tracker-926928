import { Todo } from '../types/todo';

export const mockTodos: Todo[] = [
    {
        id: '1',
        title: 'Complete React project setup',
        completed: true,
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        updatedAt: new Date(Date.now() - 43200000).toISOString() // 12 hours ago
    },
    {
        id: '2',
        title: 'Design todo app UI components',
        completed: true,
        createdAt: new Date(Date.now() - 72000000).toISOString(), // 20 hours ago
        updatedAt: new Date(Date.now() - 36000000).toISOString() // 10 hours ago
    },
    {
        id: '3',
        title: 'Implement todo CRUD operations',
        completed: false,
        createdAt: new Date(Date.now() - 36000000).toISOString(), // 10 hours ago
        updatedAt: new Date(Date.now() - 36000000).toISOString() // 10 hours ago
    },
    {
        id: '4',
        title: 'Add form validation with Zod',
        completed: false,
        createdAt: new Date(Date.now() - 18000000).toISOString(), // 5 hours ago
        updatedAt: new Date(Date.now() - 18000000).toISOString() // 5 hours ago
    },
    {
        id: '5',
        title: 'Test responsive design on mobile',
        completed: false,
        createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        updatedAt: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
    }
];
