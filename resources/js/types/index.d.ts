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

export interface Class {
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

export interface Subject {
    id: number;
    code: string;
    title: string;
}

export interface Activity {
    id: number;
    class: Class;
    name: string;
    max_score: number;
    type: string;
}

export interface Score {
    id: number;
    activity: Activity;
    student: User;
    score: number;
}

export interface GradingSystem {
    id: number;
    subject: Subject;
    component: string;
    weight: number;
}

export interface ClassGradingSystem {
    id: number;
    class: Class;
    component: string;
    weight: number;
}