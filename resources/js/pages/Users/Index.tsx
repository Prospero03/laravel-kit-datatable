import DataTable from '@/components/DataTables/DataTable';
import Datatable from '@/components/DataTables/DataTable';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import users from '@/routes/users';
import { User, type BreadcrumbItem } from '@/types';
import { Head, usePage, router  } from '@inertiajs/react';
import { UserCheck } from 'lucide-react';
import {route} from 'ziggy-js';

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
                // console.log("Фильтры", filters)
                // console.log("Index", index)
                return(filters.page-1) *filters.perPage + index +1;
            },
        },
        {
            key: 'name',
            label: 'Имя',
            sortable: true,
        },
        {
            key: 'email',
            label: 'Электронная почта',
            sortable: true,
        },
        {
            key: 'created_at',
            label: 'Дата создания',
            type: "date",
            sortable: true,
        }
    ]

    const handleDelete = (id:any) => {
        router.delete(route('users.destroy', id),{
            preserveScroll: true,
            onSuccess: () =>{
                console.log("Пользователь успешно удалён")
            }
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="py-6">
                <div className="mx-auto">
                    <DataTable 
                        data={users} 
                        columns={columns} 
                        resourceName='Пользователи'
                        resourceNameNotFound='Пользователей'
                        routeName='users.index' 
                        filters={filters} 
                        canCreateResource={true} 
                        canEditResource={true} 
                        canDeleteResource={true}
                        canShowResource={true} 
                        canViewResource={true}
                        icon={UserCheck}
                        createRoute='users.create'
                        editRoute='users.edit'
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
