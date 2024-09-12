import React from 'react'
import type { Activity, Class, Subject } from '@/types'
import Button from '@mui/material/Button'
import axios from 'axios'
import { Link, useForm } from '@inertiajs/react'
import Menu from '@/Components/system/Menu'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import {
    DataGrid,
    GridColDef,
    GridRowParams,
    gridPageCountSelector,
    GridPagination,
    useGridApiContext,
    useGridSelector,
 } from '@mui/x-data-grid';
 import MuiPagination  from '@mui/material/Pagination';
 import { TablePaginationProps } from '@mui/material/TablePagination';



export default function ActivityTable({ _class, activities }: { _class: Class, activities: Activity[] }) {

    const columns: GridColDef[] = [
        { field: 'class', headerName: 'Scan', width: 100, disableColumnMenu: true, sortable: false, resizable: false, renderCell: (row) => {
            return (
                <Link href={`/class/${_class.id}/open/activity/${row.id}/scan`}>
                    <QrCodeScannerIcon />
                </Link>
            )}
        },
        { field: 'name', headerName: 'Activity Name', width: 300 },
        { field: 'max_score', headerName: 'Max Score', width: 150 },
        { field: 'type', headerName: 'Type', width: 400 },
        { field: 'action', headerName: 'Action', width: 70, disableColumnMenu: true, sortable: false, resizable: false, renderCell: (row) => {
            return (
                <Menu
                    buttonlabel={
                        <IconButton aria-label="Example">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    menuitems={[
                        {label: "Edit", link: `/class/${_class.id}/open/activity/${row.id}`},
                    ]}
                />
            )}
        },
    ];

    const rows: any = activities.map((activity) => {
        return {
            id: activity.id,
            name: activity.name,
            max_score: activity.max_score,
            type: activity.type
        }
    });
    
    function Pagination({
        page,
        onPageChange,
        className,
    }: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) {
        const apiRef = useGridApiContext();
        const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    
        return (
            <MuiPagination
                color="primary"
                className={className}
                count={pageCount}
                page={page + 1}
                onChange={(event, newPage) => {
                    onPageChange(event as any, newPage - 1);
                }}
            />
        );
    }

    const paginationModel = { page: 0, pageSize: 5 };
    function CustomPagination(props: any) {
        return <GridPagination ActionsComponent={Pagination} {...props} />;
    }

    return (
        <>
            <DataGrid
                rows={rows}
                columns={columns}
                pagination
                slots={{
                    pagination: CustomPagination,
                }}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10, 50, 100]}
                slotProps={{
                    loadingOverlay: {
                      variant: 'skeleton',
                      noRowsVariant: 'skeleton',
                    },
                  }}
                sx={{ border: 0 }}
            />
        </>
    )
}
