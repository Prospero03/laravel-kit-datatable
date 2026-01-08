import { usePage } from "@inertiajs/react"
import { useState } from "react"

export default function Datatable({
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

    return(
        <div className="">
            <div className="">

            </div>
        </div>
    )
}