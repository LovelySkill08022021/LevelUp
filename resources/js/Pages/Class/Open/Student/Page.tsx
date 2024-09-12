import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { Class, PageProps, User } from '@/types';
import Alert from '@mui/material/Alert';
import Course from '@/Components/system/Course';
import FormDialog from '@/Components/system/FormDialog';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PendingStudent from './Components/PendingStudent';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import QRCode from "react-qr-code";

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

  const [pending_students_state, setPendingStudentState] = useState<ExtUser[]>();

  function getJoinPendingStudents() {
    const data = {
      class_id: _class.id
    };

    axios.post(route('class.student.join.pending'), data)
      .then((response) => {
        setPendingStudentState(response.data);
      });
  }

  useEffect(() => {
    setPendingStudentState(pending_students);
  }, [pending_students]);

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
              size={'full'}
              description={
                <div className='mb-4'>
                  {pending_students_state?.length} {pending_students_state && (pending_students_state.length > 1 ? "students" : "student")} wants to join your class.
                </div>
              }
              dialog_button={
                <div className='inline-block'>
                  <IconButton aria-label="Example">
                    <Badge badgeContent={pending_students_state?.length} color="error" max={999}>
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
                {pending_students_state?.map((student, index) => (
                  <PendingStudent student={student} key={index} index={index} callback={getJoinPendingStudents} />
                ))}
              </>
            </FormDialog>
          </div>
          {students.map((student) => (
            <div className="flex justify-evenly mb-5">
              <div className='w-full'>
                <QRCode
                  bgColor='white'
                  fgColor='#000000'
                  value={student.student_number}
                  size={80}
                  level='H'
                />
                <span className='text-xs'>{student.last_name}, {student.first_name}</span>
              </div>
              <div className='w-full'>
                {student.student_number}
              </div>
              <div className='w-full'>
                {student.last_name}
              </div>
              <div className='w-full'>
                {student.first_name}
              </div>
              <div className='w-full'>
                {student.middle_name}
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
