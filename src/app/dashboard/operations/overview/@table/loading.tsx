import { ClassesTable } from "@/features/dashboard/operations/overview/@table";

export default function TableLoading() {
    return <ClassesTable classes={classes} loading />;
}

const classes = new Array(6).fill(0).map((_, i) => ({
    _id: `class-${i + 1}`,
    name: 'Class 6',
    section: 'A',
    grade: 6,
    academicYear: '2024-2025',
    classTeacherName: 'Dr. Ayesha Rahman',
    studentCount: 8,
    maxStudents: 40,
    room: 'Room 101',
    subjects: ['Mathematics', 'English', 'Bengali'],
    status: 'active',
    additional: '+3',
}));