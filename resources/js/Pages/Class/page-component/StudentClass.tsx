
import type { Class, User } from '@/types'
import Button from '@mui/material/Button'
import { Suspense, useEffect, useState } from 'react'
import { getUser } from '@/lib/data'
import axios from 'axios'

import StudentClassJoinButton from './StudentClassJoinButton'


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

export default function StudentClass({ classes }: { classes: Class[] }) {
    

    const columns: GridColDef[] = [
        // { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 230 },
        { field: 'subject', headerName: 'Subject', width: 370 },
        { field: 'semester', headerName: 'Semester', width: 200 },
        // { field: 'school_year', headerName: 'School Year', width: 150 },
        { field: 'faculty', headerName: 'Faculty', width: 200 },
        // { field: 'year_level', headerName: 'Year Level', width: 100 },
        // { field: 'section', headerName: 'Section', width: 70 },
        { field: 'action', headerName: 'Action', width: 140, disableColumnMenu: true, sortable: false, resizable: false, renderCell: (row) => {

            return (
                <StudentClassJoinButton _class={row}  />
            )
        } },
    ];

    const rows: any = classes.map((_class) => {
        return {
            id: _class.id,
            name: _class.name,
            semester: (_class.semester == 1 ? "1st Semester" : (_class.semester == 2 ? "2nd Semester" : "Mid year")) + " " + _class.school_year,
            // school_year: ,
            // course: _class.course,
            year_level: _class.year_level,
            faculty: `${_class.faculty.first_name} ${_class.faculty.last_name}`,
            subject: `${_class.subject.code} - ${_class.subject.title}`
        }
    });

    const paginationModel = { page: 0, pageSize: 5 };
    function CustomPagination(props: any) {
        return <GridPagination ActionsComponent={Pagination} {...props} />;
    }

    return (
        <div>
            

            <DataGrid
                rows={rows}
                columns={columns}
                pagination
                slots={{
                    pagination: CustomPagination,
                }}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10, 50, 100]}
                // loading
                // checkboxSelection
                // disableRowSelectionOnClick 
                slotProps={{
                    loadingOverlay: {
                      variant: 'skeleton',
                      noRowsVariant: 'skeleton',
                    },
                  }}
                // checkboxSelection
                sx={{ border: 0 }}
            />
            {/* <div className='flex mb-2 items-center gap-5'>
                <div>
                    {_class.name}
                </div>
                <div>
                    {_class.subject.title}
                    {data.student_id}
                </div>
                <div>
                    {_class.subject.title}
                    
                </div>
                <div>
                    {!join_response_status && 
                        <Suspense fallback={
                            <Button disabled>Loading...</Button>
                        }>
                            <StudentClassJoinButton disabled={processing} _class={_class} onClick={joinClass}  />
                        </Suspense>
                    }
                </div>
            </div> */}
            
        </div>
    )
}
