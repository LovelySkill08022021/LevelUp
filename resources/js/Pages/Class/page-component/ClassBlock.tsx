import React, { Suspense, useEffect, useState } from 'react'
import type { Class, User } from '@/types'
import Button from '@mui/material/Button'
import axios from 'axios'
import { Link, useForm } from '@inertiajs/react'
import Menu from '@/Components/system/Menu'
import Course from '@/Components/system/Course'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton'

export default function ClassBlock({ _class }: { _class: Class }) {

    return (
        <div className='flex justify-start w-full mb-1 rounded overflow-hidden hover:bg-gray-200 hover:cursor-pointer'>
            <Link href={`/class/${_class.id}/open`} className='flex justify-start w-full py-2 px-3'>
                <div className='w-full'>
                    {_class.name}
                </div>
                <div className='w-full'>
                    {_class.semester == 1 ? "1st Semester" : "2nd Semester"}
                </div>
                <div className='w-full'>
                    {_class.school_year}
                </div>
                {/* <div className='w-full'>
                    {_class.faculty.first_name}
                </div> */}
                <div className='px-5'>
                    <Course course={_class.course} />
                </div>
                <div className='w-full'>
                    {_class.subject.code} - {_class.subject.title}
                </div>
            </Link>
            <div className='self-center'>
                <Menu
                    buttonlabel={
                        <IconButton aria-label="Example">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    menuitems={[
                        {label: "Edit", link: `/class/${_class.id}`},
                        {label: "Grading System", link: `/class/${_class.id}/gradingsystem`},
                    ]}
                />
                {/* <Button disabled={processing} size='small' variant='contained' color='error' disableElevation onClick={deleteSubject}>
                    
                    {processing ? "Deleting..." : "Delete"}
                </Button> */}
            </div>
        </div>
    )
}
