import React from 'react'
import type { Subject } from '@/types'
import Button from '@mui/material/Button'
import axios from 'axios'
import { Link, useForm } from '@inertiajs/react'
import Menu from '@/Components/system/Menu'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

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



export default function SubjectBlock({ subjects }: { subjects: Subject[] }) {


    const {data, setData, post, processing } = useForm({
        subject_id: 0
    });
    
    function deleteSubject(subject: any){
        data.subject_id = subject.row.id;

        let confirmation = confirm(`Are you sure you want to delete ${subject.row.code} - ${subject.row.title}?`);
        
        if(confirmation){
            post(route('subject.delete'));
        }
    }

    const columns: GridColDef[] = [
        { field: 'code', headerName: 'Code', minWidth: 130 },
        { field: 'title', headerName: 'Title', flex: 0, minWidth: 400 },
        { field: 'units_lec', headerName: 'Units (Lec)', flex: 0, minWidth: 150 },
        { field: 'units_lab', headerName: 'Units (Lab)', flex: 0, minWidth: 150 },
        { field: 'action', headerName: '', flex: 100, minWidth: 70, align: 'right', headerAlign: 'right', disableColumnMenu: true, sortable: false, resizable: false, renderCell: (row) => {
            return (
                <Menu
                    buttonlabel={
                        <IconButton aria-label="Example">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    menuitems={[
                        {label: "Edit", link: `/subject/${row.id}`, icon: <EditIcon fontSize='small' />},
                        {label: "Grading System", link: `/subject/${row.id}/gradingsystem`, icon: <StarRoundedIcon fontSize='small' />},
                        // {label: "Delete", action: () => deleteSubject(row)},
                    ]}
                />
            )
        } },
    ];

    const rows: any = subjects.map((subject) => {
        return {
            id: subject.id,
            code: subject.code,
            title: subject.title,
            units_lec: subject.units_lec,
            units_lab: subject.units_lab
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
