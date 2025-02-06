import ContentLayout from "@/Components/system/ContentLayout";
import Course from "@/Components/system/Course";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, User } from "@/types";
import { Head } from "@inertiajs/react";
import Card from "@mui/material/Card";
import React from "react";

interface Props extends PageProps {
    students: User[];
}

export default function Students({ auth, students }: Props) {
    const cell_style = "text-left border-b border-gray-200 px-2 py-1";
    const header_cell_style = "text-left border-b-4 border-gray-500 px-2 py-1";

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Subject" />

            <ContentLayout>
                <Card>
                    <div className="m-5">
                        <table className={"w-full"}>
                            <thead>
                                <tr>
                                    <th className={header_cell_style}>#</th>
                                    <th className={header_cell_style}>
                                        Student Number
                                    </th>
                                    <th className={header_cell_style}>
                                        Last Name
                                    </th>
                                    <th className={header_cell_style}>
                                        First Name
                                    </th>
                                    <th className={header_cell_style}>
                                        Middle Name
                                    </th>
                                    <th className={header_cell_style}>Email</th>
                                    <th className={header_cell_style}>
                                        Course
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student, index: number) => (
                                    <tr>
                                        <td className={cell_style}>
                                            {index + 1}
                                        </td>
                                        <td className={cell_style}>
                                            {student.student_number}
                                        </td>
                                        <td className={cell_style}>
                                            {student.last_name}
                                        </td>
                                        <td className={cell_style}>
                                            {student.first_name}
                                        </td>
                                        <td className={cell_style}>
                                            {student.middle_name}
                                        </td>
                                        <td className={cell_style}>
                                            {student.email}
                                        </td>
                                        <td className={cell_style}>
                                            <Course course={student.course} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
