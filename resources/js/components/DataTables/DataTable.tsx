import { usePage, router } from "@inertiajs/react"
import { Search } from "lucide-react";
import { useState } from "react"
// import route from 'ziggy-js';

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
    const renderActions = (item : any) =>{
        return <div className="flex space-x-2">
            {canViewResource && (
                <button onClick={() => router.visit(route(viewRoute, item.id))}>

                </button>
            )}
        </div>
    }
    const tableColumns  = [...columns];

    if(canEditResource || canDeleteResource){
        tableColumns.push({
            key: ' actions',
            label : 'Actions',
            type: "custom",
            sortable: false,
            render: renderActions,
        })
    }
    return(
        <div className="">
            <div className="">
                <div className="">
                    <div className="">
                        {Icon && <Icon/>}
                        <h2>{resourceName}</h2>
                    </div>
                    {canCreateResource &&(
                        <a  href={route(createRoute)}
                            className="">
                            Add {singularName}
                        </a>
                    )}
                </div>

                <div className="">
                    <form onSubmit={handleSearch} className="">
                        <input
                            type="text"
                            placeholder={`Search ...`}
                            className=""
                            value={search}
                            onChange={(e)=> setSearch(e.target.value)}>
                        </input>
                        <Search/>
                        <button type="submit">
                            Search
                        </button>
                    </form>
                </div>


                <div className="">
                    <label htmlFor="perPage">
                        Show
                    </label>
                    <select
                        id="perPage"
                        className=""
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

            <div className="overflow-hidden rounded-lg border border-gray-200 shadow">
                <table className="min-w-full divide-y divide-gray-200 bg-white">
                    <thead>
                        <tr className="bg-gray-50">{tableColumns}</tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}