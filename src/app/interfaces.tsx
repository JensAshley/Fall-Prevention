interface AdminState {
    userId: string;
    name: string;
    email: string;
    password: string;
    users: string[];
    viewUser: string;
}

interface User {
    userId: string;
    email: string;
    first_name: string;
    last_name: string;
    birthdate: string;
    goals: string[];
}

interface Goal {
    goal: string;
    obstacle: string;
    plan: string;
    progress: Progress;
    reminder_settings: Reminder_Settings;
    solution: string;
    strategy: string;
}

interface Progress {
    completed: "";
    missed: "";
}

interface Reminder_Settings {
    frequency: "";
    time: "";
}

export type { AdminState, User };