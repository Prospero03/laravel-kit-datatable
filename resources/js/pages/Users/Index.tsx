import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import users from '@/routes/users';
import { User, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Пользователи',
        href: users.index().url,
    },
];

export default function Index({users}:{users:User[]}) {
    const {filters, can} =usePage().props;

    const columns =[
        {
            key: 'index',
            label: '#',
            type: 'IndexColumn',
            width: '80px',
            sortable: false,
            render:(item: any, index:number)=>{
                return(filters.page-1) *filters.perPage + index +1;
            },
        },
        {
            key: 'name',
            label: 'Name',
            sortable: true,
        },
        {
            key: 'email',
            label: 'Email',
            sortable: true,
        }
    ]
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Пользователи" />
            <div className='p-12'>
                <h2>Пользователи</h2>
            </div>
        </AppLayout>
    );
}
