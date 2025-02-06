import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import Layout from "../Layout";
import { Class, PageProps } from "@/types";
import Button from "@mui/material/Button";
import axios from "axios";
import Alert from "@mui/material/Alert";

interface Props extends PageProps {
    _class: Class;
}

export default function AddStudentPage({ _class, auth }: Props) {
    const [student_numbers, setStudentNumbers] = useState<string>("");
    const [newly_added, set_newly_added] = useState<string[]>([]);
    const [students_accepted, set_students_accepted] = useState<string[]>([]);
    const [failed_to_save, set_failed_to_save] = useState<string[]>([]);
    const [not_found_students, set_not_found_students] = useState<string[]>([]);
    const [already_added, set_already_added] = useState<string[]>([]);

    function addStudents() {
        const to_add_tmp = student_numbers.split("\n");
        const student_numbers_for_save: string[] = [];

        for (let student_number of to_add_tmp) {
            if (student_number) {
                student_numbers_for_save.push(student_number);
            }
        }

        const data = {
            student_numbers_for_save,
            'class_id': _class.id
        }

        axios.post(route('class.students.add'), data)
            .then((response) => {
                console.log(response);
                set_newly_added(response.data.newly_added);
                set_students_accepted(response.data.students_accepted);
                set_failed_to_save(response.data.failed_to_save);
                set_not_found_students(response.data.not_found_students);
                set_already_added(response.data.already_added);
            });
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Layout _class={_class} active_tab="students">
                <>
                    <div className="md:flex md:gap-5">
                        <div className="w-full">
                            <label htmlFor="student_numbers" className="block mb-2">Type Student Numbers</label>
                            <textarea id="student_numbers" value={student_numbers} className="w-full" rows={10} onChange={(e) => setStudentNumbers(e.target.value)}></textarea>
                            <Button variant="contained" disableElevation onClick={addStudents}>Add</Button>
                        </div>
                        <div className="w-full mt-8 md:mt-0">
                            <div className="mb-2">
                                Remarks
                            </div>
                            <div>
                                {newly_added.length > 0 &&
                                    <Alert className="mb-2" severity="success">
                                        <b>Newly added students:</b>
                                        <ol className="list-decimal list-inside">
                                            {newly_added.map((student, index: number) => (
                                                <li key={index}>
                                                    {student}
                                                </li>
                                            ))}
                                        </ol>
                                    </Alert>
                                }

                                {students_accepted.length > 0 &&
                                    <Alert className="mb-2" severity="success">
                                        <b>Accepted students:</b>
                                        <ol className="list-decimal list-inside">
                                            {students_accepted.map((student, index: number) => (
                                                <li key={index}>
                                                    {student}
                                                </li>
                                            ))}
                                        </ol>
                                    </Alert>
                                }

                                {already_added.length > 0 &&
                                    <Alert className="mb-2" severity="info">
                                        <b>These students are already added in your class:</b>
                                        <ol className="list-decimal list-inside">
                                            {already_added.map((student, index: number) => (
                                                <li key={index}>
                                                    {student}
                                                </li>
                                            ))}
                                        </ol>
                                    </Alert>
                                }

                                {failed_to_save.length > 0 &&
                                    <Alert className="mb-2" severity="error">
                                        <b>Failed to add student(s):</b>
                                        <ol className="list-decimal list-inside">
                                            {failed_to_save.map((student, index: number) => (
                                                <li key={index}>
                                                    {student}
                                                </li>
                                            ))}
                                        </ol>
                                    </Alert>
                                }

                                {not_found_students.length > 0 &&
                                    <Alert className="mb-2" severity="warning">
                                        <b>Unknown students</b>, possibly unregistered.
                                        <ol className="list-decimal list-inside">
                                            {not_found_students.map((student, index: number) => (
                                                <li key={index}>
                                                    {student}
                                                </li>
                                            ))}
                                        </ol>
                                    </Alert>
                                }
                            </div>
                        </div>
                    </div>
                </>
            </Layout>
        </AuthenticatedLayout>
    );
}
