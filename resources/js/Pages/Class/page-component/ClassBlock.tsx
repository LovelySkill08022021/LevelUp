import React, { Suspense, useEffect, useState } from 'react'
import type { Class, User } from '@/types'
import Button from '@mui/material/Button'
import axios from 'axios'
import { Link, router, useForm } from '@inertiajs/react'
import Menu from '@/Components/system/Menu'
import Course from '@/Components/system/Course'
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import ImportantDevicesRoundedIcon from '@mui/icons-material/ImportantDevicesRounded';
import FolderSpecialRoundedIcon from '@mui/icons-material/FolderSpecialRounded';

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




export default function ClassBlock({ classes }: { classes: Class[] }) {

    function openClass(params: GridRowParams){
        console.log(params.row.id);
        // location.href = `/class/${params.row.id}/open`;
        router.visit(`/class/${params.row.id}/open/activities`, {
            method: 'get'
          })
    }

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', minWidth: 230 },
        { field: 'semester', headerName: 'Semester', flex: 0, minWidth: 140 },
        { field: 'school_year', headerName: 'School Year', flex: 0, minWidth: 150 },
        { field: 'course', headerName: 'Course', flex: 0, minWidth: 120 },
        { field: 'subject', headerName: 'Subject', flex: 1, minWidth: 400 },
        { field: 'action', headerName: '', flex: 100, minWidth: 70, headerAlign: 'right', align: 'right', disableColumnMenu: true, sortable: false, resizable: false, renderCell: (row) => {
            return (
                <Menu
                    buttonlabel={
                        <IconButton aria-label="Example">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    menuitems={[
                        {label: "Edit", link: `/class/${row.id}`, icon: <EditIcon fontSize='small' />},
                        {label: "Grading System", link: `/class/${row.id}/gradingsystem`, icon: <StarRoundedIcon fontSize='small' />},
                        {label: "Grade Sheet", link: `/class/${row.id}/open/gradesheet`, icon: <FolderSpecialRoundedIcon fontSize='small' />},
                    ]}
                />
            )
        } },
    ];

    const rows: any = classes.map((_class) => {
        return {
            id: _class.id,
            name: _class.name,
            semester: _class.semester == 1 ? "1st Semester" : (_class.semester == 2 ? "2nd Semester" : "Mid year"),
            school_year: _class.school_year,
            course: _class.course,
            subject: `${_class.subject.code} - ${_class.subject.title}`
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
                onRowDoubleClick={openClass}
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
