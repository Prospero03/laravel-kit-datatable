import { usePage, router } from "@inertiajs/react"
import { ArrowDown, ArrowUp, Search } from "lucide-react";
import React, { useState } from "react"
import {route} from 'ziggy-js';

interface TableColumn {
    key: string;
    label : string;
    type?: 'text' | 'number' | 'date' | 'custom';
    sortable?: boolean;
    render?: (row:any) => React.ReactNode;
}

export default function DataTable({
    data,
    columns=[],
    resourceName = '',
    singularName = '',
    routeName = '',
    filters = {},
    viewRoute = '',
    canViewResource = false,
    canCreateResource = false,
    canEditResource = false,
    canDeleteResource = false,
    icon : Icon,
    createRoute = '',
    editRoute = '',
    onDelete ,
}) {
    const {errors}=usePage().props
    const [search, setSearch] = useState(filters?.search || '');
    const [perPage, setPerPage] = useState(filters?.perPage ||10);
    const [sort, setSort] = useState(filters?.sort || 'id');
    const [direction, setDirection]=useState(filters?.direction || 'desc');

    const [itemToDelete,setItemToDelete] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog]=useState(false);

    const updateRoute = (newParams = {}) => {
        const params = {
            search,
            perPage,
            sort,
            direction,
            page: 1,
            ...newParams,
        };
        router.get(route(routeName), params, {
            preserveState: true,
            preserveScroll: true,
        })
    }

    const handleSearch = (e : any) => {
        e.preventDefault();
        updateRoute();
    }

    const handlePerPageChange = () => {
    }

    const handleSort = (column : any) =>{
        const newDirection = sort === column && direction === 'asc' ? 'desc' : 'asc';
        setSort(column);
        setDirection(newDirection);
        updateRoute({sort:column, direction: newDirection});
    }

    const renderActions = (item : any) =>{
        return <div className="flex space-x-2">
            {canViewResource && (
                <button onClick={() => router.visit(route(viewRoute, item.id))}>
                    View
                </button>
            )}
            {canEditResource && (
                <button onClick={() => router.visit(route(editRoute, item.id))}>
                    Edit
                </button>
            )}
            {canDeleteResource && (
                <button onClick={() => {
                    setItemToDelete(item);
                    setShowDeleteDialog(true)
                }}>
                    Delete
                </button>
            )}
        </div>
    }

    const tableColumns: TableColumn[] = []; 
    // const tableColumns  = [...columns];

    if(canEditResource || canDeleteResource || canViewResource){
        tableColumns.push({
            key: ' actions',
            label : 'Actions',
            type: "custom",
            sortable: false,
            render: renderActions,
        })
    }
    return(
        <div className="w-full bg-white">
            <div className="px-6 py-4">
                <div className="mb-6 flex flex-col space-y-4 
                                sm:items-center sm:justify-between sm:space-y-0">
                    <div className="flex items-center">
                        {Icon && <Icon className="mr-3 h-6 w-6 text-blue-600"/>}
                        <h2 className="text-2xl font-bold text-gray-800">{resourceName}</h2>
                    </div>
                    {canCreateResource &&(
                        <a  href={route(createRoute)}
                            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm 
                            hover:bg-blue-700 
                            focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
                            Add {singularName}
                        </a>
                    )}
                </div>

                <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <form onSubmit={handleSearch} className="relative flex w-full max-w-md gap-x-2">
                        <input
                            type="text"
                            placeholder={`Search ...`}
                            className="w-full rounded-lg border  border-gray-300 py-2  pr-4 pl-10 text-gray-700 
                                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200  focus:outline-none"
                            value={search}
                            onChange={(e)=> setSearch(e.target.value)}>
                        </input>
                        <Search/>
                        <button type="submit" className="ml-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors 
                                                       hover:bg-blue-700
                                                        focus:ring-offset-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200  focus:outline-none">
                            Search
                        </button>
                    </form>
                    
                    <div className="flex items-center">
                        <label htmlFor="perPage" className="mr-2 text-sm font-medium text-gray-600">
                            Show
                        </label>

                        <select
                            id="perPage"
                            className="rouded-lg border  border-gray-300 bg-white py-2 pr-8 pl-3 text-gray-700 
                                     focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                            value={perPage}
                            onChange={handlePerPageChange}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                
                </div>





            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 shadow">
                <table className="min-w-full divide-y divide-gray-200 bg-white">
                    <thead>
                        <tr className="bg-gray-50">
                            {tableColumns.map((column)=>(
                                <th key={column.key}
                                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                    style={column.width ? {width:column.width} : {}}
                                >
                                    {column.sortable !== false ? (
                                        <button onClick={() => handleSort(column.key)}
                                                className="group inline-flex items-center">
                                            column.label
                                            <span className="ml-2">
                                                {sort === column.key ? (
                                                    direction === 'asc' ? (
                                                        <ArrowUp className="h-4 w-4 text-blue-500"/>
                                                    ): (
                                                        <ArrowDown className="h-4 w-4 text-blue-500"/>
                                                    )
                                                ):(
                                                    <span className="opacity-0 group-hover:opacity-50">
                                                        <ArrowUp className="h-4 w-4"/>
                                                    </span>
                                                )}
                                            </span>
                                        </button>
                                    ):(
                                        column.label
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">   
                        {data.data.length > 0 ?(
                            data.data.map((item:any,  index: number)=>(
                                <tr key={item.id} className="transition-colors hover:bg-gray-50">
                                    {tableColumns.map((column)=>(
                                        <td key={`${item.id}`}>
                                            {/* 7:46 Part-3 */}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ): (
                            <></>
                        )}
                    </tbody> 
                    
                </table>
            </div>
        </div>
    )
}

