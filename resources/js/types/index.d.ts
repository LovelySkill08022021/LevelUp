export interface User {
    id: number;
    student_number: string;
    last_name: string;
    first_name: string;
    middle_name: string;
    course: string;
    verified: number;
    user_type: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

export type Class = {
    id: number;
    name: string;
    semester: number;
    school_year: string;
    course: string;
    year_level: number;
    section: string;
    subject: Subject;
    faculty: User;
}

export type Subject = {
    id: number;
    code: string;
    title: string;
    units_lec: number;
    units_lab: number;
}

export type Activity = {
    id: number;
    class: Class;
    name: string;
    max_score: number;
    type: string;
    date: string;
    time: string;
}

export type Score = {
    id: number;
    activity: Activity;
    student: User;
    score: number;
}

export type GradingSystem = {
    id: number;
    subject: Subject;
    component: string;
    weight: number;
}

export type ClassGradingSystem = {
    id: number;
    class: Class;
    component: string;
    weight: number;
}

export type CreditScore = {
    id: number;
    student_id: number;
    points: number;
    history: CreditScoreHistory[];
}
export type CreditScoreHistory = {
    id: number;
    credit_score_id: number;
    points: number;
    mode: string;
    date: string;
    date_removed: string;
}
