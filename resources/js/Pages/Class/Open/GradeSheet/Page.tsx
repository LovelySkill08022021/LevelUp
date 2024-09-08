
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { PageProps, Class, Activity } from '@/types';
import Layout from '../Layout';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useEffect, useRef, useState } from 'react';
// import { usePDF } from 'react-to-pdf';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Course from '@/Components/system/Course';
import Semester from '@/Components/system/Semester';

interface Props extends PageProps {
    _class: Class;
    student_collection: any;
}


export default function ActivityPage({ _class, student_collection, auth }: Props) {
    // const { toPDF, targetRef } = usePDF({filename: `${_class.name}-gradesheet.pdf`});
    
    const tableRef = useRef(null);
    const [gradesheet, setGradingsheet] = useState<any>();
    let gradesheet_data: any = {
        thead: [],
        tbody: [],
    };

    function RenderData() {
        let rows: React.ReactNode[] = [];
        let header_row: any = [];
        // console.log(student_collection[0]);
        
        for(let key in student_collection[0]){
            if(key != 'id'){
                if(!key.includes("max")){
                    let header_conditions =
                        key.includes("Remarks") || 
                        key.includes("Grade") || 
                        key.includes("Total") || 
                        key.includes("%") || 
                        key.includes("AVE") || 
                        key.includes("student_number") || 
                        key.includes("last_name") || 
                        key.includes("first_name") || 
                        key.includes("middle_name");

                    if(header_conditions){
                        header_row.push(key);
                    } else {
                        header_row.push(`${key}/${student_collection[0]['max'+key]}`);
                    }
                }
            }

        }

        gradesheet_data.thead = header_row;
        // rows.push(header_row); 

        for(let row of student_collection){
            let empty_row: any = [];
            for(let col in row){
                if(col != 'id'){
                    let cell_data = null;
                    if(typeof (row[col]) == 'string'){
                        cell_data = row[col];
                    } else {
                        cell_data = Number(row[col]).toFixed(2);
                    }
                    
                    if(!col.includes("max")){
                        empty_row.push(cell_data);
                    }
                }
            }

            rows.push(empty_row); 
            
        };
        gradesheet_data.tbody = rows;
        setGradingsheet(gradesheet_data);
        
        
    }

    function backPage(){
        history.back();
    }

    function printSheet(){
        
    }

    useEffect(() => {
        RenderData();
    },[student_collection])

    return (
        // <AuthenticatedLayout
        //     user={auth.user}
        // >
            // <Layout _class={_class} active_tab='gradesheet'>
                <div className='p-2'>
                    <Head title={`${_class.name} Gradesheet`} />
                    {/* <div className='flex items-center mb-4'>
                        <div className='me-4'>
                            <IconButton onClick={backPage}>
                                <ArrowBackIosNewIcon />
                            </IconButton>
                        </div>
                        <div className='font-bold text-2xl'>{_class.name} Gradesheet</div>
                    </div>
                    <div className='mb-3'>
                        <DownloadTableExcel
                            filename={`Gradesheet - ${_class.name}`}
                            sheet="record"
                            currentTableRef={tableRef.current}
                        >
                            <Button variant='contained' color='success'> Export excel </Button>
                        </DownloadTableExcel>
                        <div className='inline-block ms-2'>
                            <Button variant='contained' onClick={printSheet}>Print</Button>
                        </div>
                    </div> */}
                    <div ref={tableRef} id="print_area" className=''>
                        <div className="flex justify-center">
                            <table className='w-3/4 font-bold text-xl mb-4'>
                                <tbody>
                                    <tr>
                                        <td colSpan={3}>
                                            <img className='mb-4' width={'90%'} src="/images/gradesheet_banner.png" alt="banner" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Course Code: <span className='text-blue-800'>{_class.subject.code}</span>
                                        </td>
                                        <td>
                                            Unit: <span className='text-blue-800'><i>Unit</i></span>
                                        </td>
                                        <td>
                                            Section: <span className='text-blue-800'><Course course={_class.course} /> {_class.year_level}{_class.section}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        Title: <span className='text-blue-800'>{_class.subject.title}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Semester: <span className='text-blue-800'><Semester semester={_class.semester} /> {_class.school_year}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Instructor: <span className='text-blue-800'>{_class.faculty.first_name} {_class.faculty.middle_name} {_class.faculty.last_name}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <table className='table w-full text-xs font-semibold'>
                            <thead>
                                <tr className='bg-slate-300'>
                                    <th className='border border-black px-1 py-0 whitespace-nowrap'>#</th>
                                    {gradesheet?.thead.map((head: any, index: number) => {
                                        if(head == 'student_number'){
                                            return <th className='border border-black px-1 py-0 whitespace-nowrap' key={index}>Student Number</th>
                                        }
                                        
                                        if(head == 'last_name'){
                                            return <th className='border border-black px-1 py-0 whitespace-nowrap' key={index}>Last Name</th>
                                        }
                                        
                                        if(head == 'first_name'){
                                            return <th className='border border-black px-1 py-0 whitespace-nowrap' key={index}>First Name</th>
                                        }
                                        
                                        if(head == 'middle_name'){
                                            return <th className='border border-black px-1 py-0 whitespace-nowrap' key={index}>Middle Name</th>
                                        }

                                        let bg = "";
                                        if(head.includes('AVE')){
                                            bg = "bg-blue-300";
                                        }
                                        
                                        if(head.includes('%')){
                                            bg = "bg-blue-500";
                                        }

                                        return <th className={`border border-black px-1 py-0 whitespace-nowrap ${bg}`} key={index}>{head}</th>
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {gradesheet?.tbody.map((row: any, row_index: number) => (
                                    <tr className='hover:bg-slate-200' key={row_index}>
                                        <td className='border border-black px-1 py-0 whitespace-nowrap'>{row_index+1}</td>
                                        {row.map((col: any, col_index: number) => {
                                            let color = !isNaN(col) ? (col == 0 ? "text-red-600" : "text-gray-700") : "";
                                            
                                            // styling of grades
                                            if(row.length - 2 == (col_index)){
                                                if(col.includes('INC')){
                                                    color = "bg-amber-300";
                                                } else {
                                                    color = col > 3 ? "bg-red-400" : "bg-green-400";
                                                }

                                            }

                                            //styling of remarks
                                            if(row.length - 1 == (col_index)){
                                                if(col == "PASSED"){
                                                    color = "bg-green-400";
                                                } else if(col == "FAILED"){
                                                    color = "bg-red-400";
                                                } else if(col == "INCOMPLETE"){
                                                    color = "bg-amber-300";
                                                }
                                            }

                                            return <td className={color + ' border border-black px-1 py-0 whitespace-nowrap'} key={col_index}>{col}</td>
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
        //     </Layout>
        // </AuthenticatedLayout>
    )
}
