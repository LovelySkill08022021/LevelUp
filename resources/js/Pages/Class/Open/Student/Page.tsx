import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { Class, PageProps, User } from '@/types';
import Alert from '@mui/material/Alert';
import Course from '@/Components/system/Course';
import FormDialog from '@/Components/system/FormDialog';
import ColorProvider from '@/Components/system/ColorProvider';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import PendingStudent from './Components/PendingStudent';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsIcon from '@mui/icons-material/Directions';

import axios from 'axios';
import QRCode from "react-qr-code";
import StudentsTable from './Components/StudentsTable';
import SearchInput from '@/Components/system/SearchInput';
import { Link } from '@inertiajs/react';

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

	const [student_list, setStudentList] = useState<User[]>(students);

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

	function searchStudent(e: any) {
		setStudentList(students.filter((student: User) => {
			return student.student_number.toLowerCase().includes(e.target.value.toLowerCase())
				|| student.last_name.toLowerCase().includes(e.target.value.toLowerCase())
				|| student.first_name.toLowerCase().includes(e.target.value.toLowerCase())
				|| student.middle_name.toLowerCase().includes(e.target.value.toLowerCase())
				;
		}))
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
					<div className='mb-5 flex gap-2 lg:gap-0 items-center'>
						<div className='w-auto lg:w-1/2'>
							<Link href={`/class/${_class.id}/open/students/add`}>
								<IconButton aria-label="Example">
									<ColorProvider color='#6b7280'>
										<GroupAddRoundedIcon fontSize='medium' color='primary' />
									</ColorProvider>
								</IconButton>
							</Link>
						</div>
						<div className='w-full lg:w-full'>
							{/* <input type="text" placeholder='Type student number to search' className='w-full border-2 hover:border-red-100 hover:ring-0 outline-0' /> */}
							<SearchInput onChange={searchStudent} placeholder="Search student" />
						</div>
						<div className='w-auto lg:w-1/2 text-right'>
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
												<ColorProvider color='#6b7280'>
													<NotificationsIcon fontSize='medium' color='primary' />
												</ColorProvider>
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
					</div>
					<div>
						<StudentsTable _class={_class} students={student_list} />
					</div>

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
