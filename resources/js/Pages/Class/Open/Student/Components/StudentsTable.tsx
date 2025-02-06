import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Class, User } from "@/types";
import Course from "@/Components/system/Course";
import { router } from '@inertiajs/react'

export default function StudentsTable({ students, _class }: { students: User[], _class: Class }) {
    'use cache';

    function openStudentClass(student_id: number) {
        console.log(student_id);

        router.visit(`/class/${_class.id}/students/profile/${student_id}`);
    }

    return (
        <TableContainer component={Paper}>
            <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="simple table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <b>#</b>
                        </TableCell>
                        <TableCell>
                            <b>Student No.</b>
                        </TableCell>
                        <TableCell align="left">
                            <b>Last Name</b>
                        </TableCell>
                        <TableCell align="left">
                            <b>First Name</b>
                        </TableCell>
                        <TableCell align="left">
                            <b>Middle Name</b>
                        </TableCell>
                        <TableCell align="left">
                            <b>Course</b>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((student, index: number) => (
                        <TableRow
                            className="hover:cursor-pointer hover:bg-gray-200 duration-100 active:bg-gray-400"
                            key={student.id}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                            onClick={() => openStudentClass(student.id)}
                        >
                            <TableCell align="left">{index + 1}</TableCell>
                            <TableCell component="th" scope="row">
                                <span className="text-gray-600">
                                    {student.student_number}
                                </span>
                            </TableCell>
                            <TableCell align="left">
                                <span className="text-gray-600">
                                    {student.last_name}
                                </span>
                            </TableCell>
                            <TableCell align="left">
                                <span className="text-gray-600">
                                    {student.first_name}
                                </span>
                            </TableCell>
                            <TableCell align="left">
                                <span className="text-gray-600">
                                    {student.middle_name}
                                </span>
                            </TableCell>
                            <TableCell align="left">
                                <span className="text-gray-600">
                                    <Course course={student.course} />
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
