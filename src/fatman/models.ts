import { connectDB } from "@/lib/db";
import { UserModel, AttendanceModel, ClassModel, ConversationModel, FeeModel, MessageModel, NoticeModel, ResultModel, StaffAttendanceModel, StudentModel, TeacherModel, ExpenseModel } from "@/models";

export const db = {
    connect: connectDB,
    user: UserModel,
    attendance: AttendanceModel,
    staffAttendance: StaffAttendanceModel,
    class: ClassModel,
    conversation: ConversationModel,
    fee: FeeModel,
    message: MessageModel,
    notice: NoticeModel,
    result: ResultModel,
    student: StudentModel,
    teacher: TeacherModel,
    expense: ExpenseModel,
};


