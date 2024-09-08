import { User } from "@/types"
import axios from "axios";

export async function getUser() : Promise<User> {
    // let user: User;
    let response = await axios.post('/get_user');
    return response.data;
}

export const grading_system_component = [
    {
        value: "ASSN",
        label: "Assignment"
    },
    {
        value: "QUIZ",
        label: "Quiz"
    },
    {
        value: "ACT",
        label: "Activity"
    },
    {
        value: "LAB",
        label: "Laboratory"
    },
    {
        value: "LE",
        label: "Long Exam"
    },
    {
        value: "ME",
        label: "Midterm Exam"
    },
    {
        value: "FE",
        label: "Final Exam"
    },
    {
        value: "PRJT",
        label: "Project"
    },
];

export const courses = [
    {
        value: 'cpe',
        label: 'BS CpE'
    },
    {
        value: 'me',
        label: 'BS ME'
    },
    {
        value: 'ee',
        label: 'BS EE'
    },
    {
        value: 'ce',
        label: 'BS CE'
    },
    {
        value: 'cere',
        label: 'BS CerE'
    },
    {
        value: 'che',
        label: 'BS ChE'
    },
    {
        value: 'ece',
        label: 'BS ECE'
    },
    {
        value: 'abe',
        label: 'BS ABE'
    },
];