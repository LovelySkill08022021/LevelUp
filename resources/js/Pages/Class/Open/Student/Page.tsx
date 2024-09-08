import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

import React from 'react'
import Layout from '../Layout'
import { Class, PageProps, User } from '@/types';
import Alert from '@mui/material/Alert';
import Course from '@/Components/system/Course';
import FormDialog from '@/Components/system/FormDialog';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PendingStudent from './Components/PendingStudent';
import IconButton from '@mui/material/IconButton';

interface ExtUser extends User {
  cm_id: number;
  date: string;
  time: string;
}

interface Props extends PageProps {
    _class: Class;
    pending_students: ExtUser[];
    students: User[];
}

export default function StudentsPage({ _class, pending_students, students, auth }: Props) {
  return (
    <AuthenticatedLayout
      user={auth.user}
    >
      <Layout _class={_class} active_tab='students'>
        <>
          <div className='mb-5'>
            <input type="search" placeholder='Type student number to search' className='w-1/2' />
            <FormDialog
              title="Notification"
              description={
                <>
                  {pending_students.length} {pending_students.length > 1 ? "students" : "student"} wants to your class join.
                </>
              }
              dialog_button={
                <div className='inline-block'>
                  <IconButton aria-label="Example">
                    <Badge badgeContent={pending_students.length} color="error" max={999}>
                      {/* <MailIcon color="action" /> */}
                          <NotificationsIcon fontSize='medium' color='primary' />
                      {/* <Button>
                      </Button> */}
                    </Badge>
                  </IconButton>
                </div>
              }
            >
              <>
                {pending_students.map((student) => (
                  <PendingStudent student={student} />
                ))}
              </>
            </FormDialog>
          </div>
          {students.map((student) => (
            <div className="flex justify-evenly">
              <div className='w-full'>
                {student.student_number}
              </div>
              <div className='w-full'>
                {student.first_name}
              </div>
              <div className='w-full'>
                {student.middle_name}
              </div>
              <div className='w-full'>
                {student.last_name}
              </div>
              <div className='w-full'>
                <Course course={student.course} />
              </div>
            </div>
          ))}
          
          {students.length <= 0 && 
            <Alert severity='info'>
              No student has been added. Instruct your students to register and join to your class. You can also manually add student from excel file or search for student and add them to your class.              
            </Alert>
          }
        </>
      </Layout>
    </AuthenticatedLayout>
  )
}
