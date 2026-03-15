/**
 * Seed script for Messages module
 * Run: bun scripts/seed-messages.ts
 *
 * Creates realistic conversations, messages, and analytics data
 * for showcase/demo purposes.
 */

import mongoose from "mongoose"
import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(__dirname, "../.env.local") })

const MONGODB_URI = process.env.MONGODB_URI!
if (!MONGODB_URI) throw new Error("MONGODB_URI missing")

// ─── User IDs from database ────────────────────────────────────────────────────
const USERS = {
    admin: new mongoose.Types.ObjectId("699ed9e7e1e9a4e197c8bfb8"),
    principal: new mongoose.Types.ObjectId("699ed9e7e1e9a4e197c8bfb9"),
    teacher: new mongoose.Types.ObjectId("699ed9e7e1e9a4e197c8bfba"),
    student: new mongoose.Types.ObjectId("699ed9e7e1e9a4e197c8bfbb"),
    parent: new mongoose.Types.ObjectId("699ed9e7e1e9a4e197c8bfbc"),
    aladiyat: new mongoose.Types.ObjectId("699fcee1386b04ca0d1489c0"),
    shakib: new mongoose.Types.ObjectId("699f5d83239962e8c1249a99"),
    aisha: new mongoose.Types.ObjectId("69a69ab474ee1b5a209192f0"),
    tariq: new mongoose.Types.ObjectId("69a69ab474ee1b5a209192f1"),
    nusrat: new mongoose.Types.ObjectId("69a69ab474ee1b5a209192f2"),
    imran: new mongoose.Types.ObjectId("69a69ab474ee1b5a209192f3"),
} as const

// ─── Helpers ────────────────────────────────────────────────────────────────────
function daysAgo(days: number, hour?: number): Date {
    const d = new Date()
    d.setDate(d.getDate() - days)
    if (hour !== undefined) d.setHours(hour, Math.floor(Math.random() * 60), 0, 0)
    return d
}

function hoursAgo(hours: number): Date {
    return new Date(Date.now() - hours * 60 * 60 * 1000)
}

function minutesAgo(minutes: number): Date {
    return new Date(Date.now() - minutes * 60 * 1000)
}

// ─── Main ───────────────────────────────────────────────────────────────────────
async function seed() {
    await mongoose.connect(MONGODB_URI)
    console.log("✓ Connected to MongoDB")

    const db = mongoose.connection.db!

    // Clear existing data
    await db.collection("conversations").deleteMany({})
    await db.collection("messages").deleteMany({})
    console.log("✓ Cleared existing conversations & messages")

    // ══════════════════════════════════════════════════════════════════════════
    // CONVERSATIONS
    // ══════════════════════════════════════════════════════════════════════════

    const conversations = [
        // ── Direct Conversations ──
        {
            _id: new mongoose.Types.ObjectId(),
            name: "",
            type: "direct",
            participants: [
                { user: USERS.admin, role: "admin", joinedAt: daysAgo(60), lastReadAt: minutesAgo(5) },
                { user: USERS.teacher, role: "member", joinedAt: daysAgo(60), lastReadAt: minutesAgo(30) },
            ],
            description: "",
            avatar: null,
            lastMessage: null,
            createdBy: USERS.admin,
            isArchived: false,
            pinnedMessages: [],
            createdAt: daysAgo(60),
            updatedAt: minutesAgo(5),
        },
        {
            _id: new mongoose.Types.ObjectId(),
            name: "",
            type: "direct",
            participants: [
                { user: USERS.admin, role: "admin", joinedAt: daysAgo(45), lastReadAt: minutesAgo(10) },
                { user: USERS.principal, role: "member", joinedAt: daysAgo(45), lastReadAt: hoursAgo(1) },
            ],
            description: "",
            avatar: null,
            lastMessage: null,
            createdBy: USERS.admin,
            isArchived: false,
            pinnedMessages: [],
            createdAt: daysAgo(45),
            updatedAt: minutesAgo(10),
        },
        {
            _id: new mongoose.Types.ObjectId(),
            name: "",
            type: "direct",
            participants: [
                { user: USERS.teacher, role: "admin", joinedAt: daysAgo(30), lastReadAt: hoursAgo(2) },
                { user: USERS.student, role: "member", joinedAt: daysAgo(30), lastReadAt: hoursAgo(3) },
            ],
            description: "",
            avatar: null,
            lastMessage: null,
            createdBy: USERS.teacher,
            isArchived: false,
            pinnedMessages: [],
            createdAt: daysAgo(30),
            updatedAt: hoursAgo(2),
        },
        {
            _id: new mongoose.Types.ObjectId(),
            name: "",
            type: "direct",
            participants: [
                { user: USERS.teacher, role: "admin", joinedAt: daysAgo(25), lastReadAt: hoursAgo(4) },
                { user: USERS.parent, role: "member", joinedAt: daysAgo(25), lastReadAt: hoursAgo(6) },
            ],
            description: "",
            avatar: null,
            lastMessage: null,
            createdBy: USERS.teacher,
            isArchived: false,
            pinnedMessages: [],
            createdAt: daysAgo(25),
            updatedAt: hoursAgo(4),
        },
        {
            _id: new mongoose.Types.ObjectId(),
            name: "",
            type: "direct",
            participants: [
                { user: USERS.admin, role: "admin", joinedAt: daysAgo(20), lastReadAt: hoursAgo(1) },
                { user: USERS.shakib, role: "member", joinedAt: daysAgo(20), lastReadAt: hoursAgo(5) },
            ],
            description: "",
            avatar: null,
            lastMessage: null,
            createdBy: USERS.admin,
            isArchived: false,
            pinnedMessages: [],
            createdAt: daysAgo(20),
            updatedAt: hoursAgo(1),
        },
        // ── Group Conversations ──
        {
            _id: new mongoose.Types.ObjectId(),
            name: "Staff Meeting Updates",
            type: "group",
            participants: [
                { user: USERS.admin, role: "admin", joinedAt: daysAgo(90), lastReadAt: minutesAgo(15) },
                { user: USERS.principal, role: "admin", joinedAt: daysAgo(90), lastReadAt: hoursAgo(1) },
                { user: USERS.teacher, role: "member", joinedAt: daysAgo(90), lastReadAt: hoursAgo(2) },
                { user: USERS.aladiyat, role: "member", joinedAt: daysAgo(85), lastReadAt: hoursAgo(3) },
            ],
            description: "Weekly staff meeting coordination and follow-ups",
            avatar: null,
            lastMessage: null,
            createdBy: USERS.admin,
            isArchived: false,
            pinnedMessages: [],
            createdAt: daysAgo(90),
            updatedAt: minutesAgo(15),
        },
        {
            _id: new mongoose.Types.ObjectId(),
            name: "Class 10 - Science Group",
            type: "group",
            participants: [
                { user: USERS.teacher, role: "admin", joinedAt: daysAgo(75), lastReadAt: hoursAgo(1) },
                { user: USERS.student, role: "member", joinedAt: daysAgo(75), lastReadAt: hoursAgo(4) },
                { user: USERS.aisha, role: "member", joinedAt: daysAgo(75), lastReadAt: hoursAgo(6) },
                { user: USERS.tariq, role: "member", joinedAt: daysAgo(75), lastReadAt: hoursAgo(8) },
                { user: USERS.nusrat, role: "member", joinedAt: daysAgo(75), lastReadAt: hoursAgo(2) },
                { user: USERS.imran, role: "member", joinedAt: daysAgo(70), lastReadAt: hoursAgo(10) },
            ],
            description: "Science class discussions, assignments, and resources",
            avatar: null,
            lastMessage: null,
            createdBy: USERS.teacher,
            isArchived: false,
            pinnedMessages: [],
            createdAt: daysAgo(75),
            updatedAt: hoursAgo(1),
        },
        {
            _id: new mongoose.Types.ObjectId(),
            name: "Parent-Teacher Committee",
            type: "group",
            participants: [
                { user: USERS.principal, role: "admin", joinedAt: daysAgo(50), lastReadAt: hoursAgo(3) },
                { user: USERS.teacher, role: "member", joinedAt: daysAgo(50), lastReadAt: hoursAgo(5) },
                { user: USERS.parent, role: "member", joinedAt: daysAgo(50), lastReadAt: hoursAgo(8) },
                { user: USERS.admin, role: "member", joinedAt: daysAgo(48), lastReadAt: hoursAgo(10) },
            ],
            description: "Parent-teacher collaboration for student welfare",
            avatar: null,
            lastMessage: null,
            createdBy: USERS.principal,
            isArchived: false,
            pinnedMessages: [],
            createdAt: daysAgo(50),
            updatedAt: hoursAgo(3),
        },
        {
            _id: new mongoose.Types.ObjectId(),
            name: "Annual Day Planning",
            type: "group",
            participants: [
                { user: USERS.admin, role: "admin", joinedAt: daysAgo(15), lastReadAt: hoursAgo(2) },
                { user: USERS.principal, role: "admin", joinedAt: daysAgo(15), lastReadAt: hoursAgo(4) },
                { user: USERS.teacher, role: "member", joinedAt: daysAgo(15), lastReadAt: hoursAgo(6) },
                { user: USERS.aisha, role: "member", joinedAt: daysAgo(14), lastReadAt: hoursAgo(8) },
                { user: USERS.tariq, role: "member", joinedAt: daysAgo(14), lastReadAt: hoursAgo(12) },
            ],
            description: "Planning and coordination for Annual Day 2026",
            avatar: null,
            lastMessage: null,
            createdBy: USERS.admin,
            isArchived: false,
            pinnedMessages: [],
            createdAt: daysAgo(15),
            updatedAt: hoursAgo(2),
        },
        {
            _id: new mongoose.Types.ObjectId(),
            name: "Exam Committee",
            type: "group",
            participants: [
                { user: USERS.principal, role: "admin", joinedAt: daysAgo(40), lastReadAt: hoursAgo(1) },
                { user: USERS.teacher, role: "admin", joinedAt: daysAgo(40), lastReadAt: hoursAgo(3) },
                { user: USERS.admin, role: "member", joinedAt: daysAgo(40), lastReadAt: hoursAgo(5) },
            ],
            description: "Examination scheduling, question paper review, and result processing",
            avatar: null,
            lastMessage: null,
            createdBy: USERS.principal,
            isArchived: false,
            pinnedMessages: [],
            createdAt: daysAgo(40),
            updatedAt: hoursAgo(1),
        },
    ]

    await db.collection("conversations").insertMany(conversations)
    console.log(`✓ Created ${conversations.length} conversations (${conversations.filter(c => c.type === "direct").length} direct, ${conversations.filter(c => c.type === "group").length} group)`)

    // ══════════════════════════════════════════════════════════════════════════
    // MESSAGES — Realistic, spread over months for great analytics
    // ══════════════════════════════════════════════════════════════════════════

    type MsgInput = {
        conversation: mongoose.Types.ObjectId
        sender: mongoose.Types.ObjectId
        content: string
        type?: string
        replyTo?: mongoose.Types.ObjectId | null
        isEdited?: boolean
        readBy?: { user: mongoose.Types.ObjectId; readAt: Date }[]
        createdAt: Date
        updatedAt: Date
    }

    const allMessages: MsgInput[] = []

    // Helper to push a message
    function msg(
        convIdx: number,
        senderKey: keyof typeof USERS,
        content: string,
        createdAt: Date,
        opts?: { type?: string; replyTo?: mongoose.Types.ObjectId; isEdited?: boolean; readByKeys?: (keyof typeof USERS)[] }
    ) {
        const _id = new mongoose.Types.ObjectId()
        const readBy = (opts?.readByKeys ?? [senderKey]).map(k => ({
            user: USERS[k],
            readAt: new Date(createdAt.getTime() + Math.random() * 600000),
        }))

        allMessages.push({
            conversation: conversations[convIdx]._id,
            sender: USERS[senderKey],
            content,
            type: opts?.type ?? "text",
            replyTo: opts?.replyTo ?? null,
            isEdited: opts?.isEdited ?? false,
            readBy,
            createdAt,
            updatedAt: opts?.isEdited ? new Date(createdAt.getTime() + 300000) : createdAt,
        })

        return _id
    }

    // ── Conv 0: Admin ↔ Teacher (direct) ────────────────────────────────────
    msg(0, "admin", "Hi! Can you send me the updated class schedule for this term?", daysAgo(58, 9))
    msg(0, "teacher", "Sure, I'll prepare it by tomorrow. Any specific format you need?", daysAgo(58, 9))
    msg(0, "admin", "The standard Excel template would be fine. Thanks!", daysAgo(58, 10))
    msg(0, "teacher", "Done! I've uploaded the schedule to the shared drive.", daysAgo(57, 14))
    msg(0, "admin", "Perfect, received it. Looks great! 👍", daysAgo(57, 14))
    msg(0, "teacher", "Also, I wanted to discuss the upcoming science fair preparations.", daysAgo(50, 11))
    msg(0, "admin", "Good idea. Let's schedule a meeting for next week.", daysAgo(50, 11))
    msg(0, "teacher", "How about Wednesday 2pm?", daysAgo(50, 12))
    msg(0, "admin", "Works for me. I'll send out the calendar invite.", daysAgo(50, 12))
    msg(0, "teacher", "The lab equipment list for the science fair is ready. Do we have the budget approved?", daysAgo(40, 10))
    msg(0, "admin", "Budget was approved yesterday. Procurement can start this week.", daysAgo(40, 10))
    msg(0, "teacher", "Excellent! I'll coordinate with the vendor today.", daysAgo(40, 11))
    msg(0, "admin", "Quick update — the new projectors have been installed in rooms 201-205.", daysAgo(20, 9))
    msg(0, "teacher", "That's wonderful news! The students will love the upgraded tech.", daysAgo(20, 10))
    msg(0, "admin", "How's the progress on the mid-term exam papers?", daysAgo(5, 8))
    msg(0, "teacher", "Almost done. Should be ready for review by Thursday.", daysAgo(5, 9))
    msg(0, "admin", "Great, send them to me and the principal for final review.", daysAgo(5, 9))
    msg(0, "teacher", "Will do. Also, one student has requested extra time for the exam due to medical reasons.", daysAgo(4, 11))
    msg(0, "admin", "Please have them submit the medical certificate. We'll process it immediately.", daysAgo(4, 11))
    msg(0, "teacher", "Good morning! Just wanted to confirm — are we on track for the parent-teacher meeting next Friday?", daysAgo(1, 8))
    msg(0, "admin", "Yes, all set. Venue is confirmed and invitations have been sent out.", daysAgo(1, 8))
    msg(0, "teacher", "Perfect. I'll prepare the student progress reports by Wednesday.", minutesAgo(120))
    msg(0, "admin", "Sounds good. Let me know if you need anything else.", minutesAgo(90))

    // ── Conv 1: Admin ↔ Principal (direct) ──────────────────────────────────
    msg(1, "admin", "Good morning! The monthly expense report is ready for your review.", daysAgo(44, 9))
    msg(1, "principal", "Thank you. I'll review it this afternoon and get back to you.", daysAgo(44, 9))
    msg(1, "principal", "Report looks good. A few minor adjustments needed on page 3.", daysAgo(44, 15))
    msg(1, "admin", "I'll make the corrections and resend by EOD.", daysAgo(44, 15))
    msg(1, "admin", "Updated report attached. Changes are highlighted in yellow.", daysAgo(44, 17))
    msg(1, "principal", "Approved. Please proceed with submitting to the board.", daysAgo(43, 9))
    msg(1, "principal", "We need to discuss the new admission policy for next semester.", daysAgo(30, 10))
    msg(1, "admin", "I've drafted a proposal based on last year's feedback. Want me to share it?", daysAgo(30, 10))
    msg(1, "principal", "Yes, please. Also loop in the admissions team.", daysAgo(30, 11))
    msg(1, "admin", "Shared with everyone. Let's discuss on Monday's meeting.", daysAgo(30, 11))
    msg(1, "principal", "The school inspection is scheduled for March 25th. Are we prepared?", daysAgo(10, 9))
    msg(1, "admin", "I've started the checklist. Infrastructure review is complete. Working on documentation now.", daysAgo(10, 10))
    msg(1, "principal", "Good. Make sure all safety compliance documents are up to date.", daysAgo(10, 10))
    msg(1, "admin", "Already on it. Fire safety cert was renewed last week.", daysAgo(10, 11))
    msg(1, "principal", "Excellent work. Let's do a walkthrough tomorrow at 10am.", daysAgo(9, 14))
    msg(1, "admin", "I'll be ready. See you then.", daysAgo(9, 14))
    msg(1, "admin", "The new semester timetable draft is ready. Shall I circulate it to HODs?", daysAgo(2, 10))
    msg(1, "principal", "Let me review it first. Send it to me privately.", daysAgo(2, 10))
    msg(1, "admin", "Sent to your email. Please check at your convenience.", daysAgo(2, 11))
    msg(1, "principal", "Reviewed and approved with minor suggestions. Good job on optimizing the lab slots.", minutesAgo(200))

    // ── Conv 2: Teacher ↔ Student (direct) ──────────────────────────────────
    msg(2, "student", "Teacher, I have a question about today's physics assignment.", daysAgo(28, 15))
    msg(2, "teacher", "Of course! What's the issue?", daysAgo(28, 15))
    msg(2, "student", "I'm confused about Newton's third law problem #5. How do I calculate the reaction force?", daysAgo(28, 16))
    msg(2, "teacher", "Great question! Remember, the reaction force is equal in magnitude and opposite in direction. Draw a free body diagram first.", daysAgo(28, 16))
    msg(2, "student", "Oh I see! So if the applied force is 50N, the reaction is also 50N but opposite?", daysAgo(28, 16))
    msg(2, "teacher", "Exactly! You've got it. Now apply this to problems 6-8 as practice.", daysAgo(28, 17))
    msg(2, "student", "Thank you so much! This really helped. 🙏", daysAgo(28, 17))
    msg(2, "teacher", "Reminder: Submit your science project proposal by Friday.", daysAgo(15, 10))
    msg(2, "student", "I want to do a project on renewable energy sources. Is that okay?", daysAgo(15, 14))
    msg(2, "teacher", "Great topic! Focus on solar energy specifically to keep the scope manageable. Include a working model if possible.", daysAgo(15, 14))
    msg(2, "student", "That sounds perfect! I'll start researching today.", daysAgo(15, 15))
    msg(2, "teacher", "How's the project coming along? Need any materials from the lab?", daysAgo(5, 10))
    msg(2, "student", "Going well! I could use a small solar panel and a multimeter.", daysAgo(5, 11))
    msg(2, "teacher", "I'll arrange those for you. Come to the lab tomorrow at 2pm.", daysAgo(5, 11))
    msg(2, "student", "Thank you, teacher! I'll be there.", daysAgo(5, 12))

    // ── Conv 3: Teacher ↔ Parent (direct) ───────────────────────────────────
    msg(3, "parent", "Hello, I wanted to check on my child's progress this semester.", daysAgo(24, 10))
    msg(3, "teacher", "Hello! Your child is doing well overall. Particularly strong in science and mathematics.", daysAgo(24, 11))
    msg(3, "parent", "That's wonderful to hear. Any areas that need improvement?", daysAgo(24, 11))
    msg(3, "teacher", "English writing could use more practice. I'd suggest regular reading and essay writing at home.", daysAgo(24, 12))
    msg(3, "parent", "We'll work on that. Thank you for the feedback!", daysAgo(24, 12))
    msg(3, "teacher", "Also, the annual sports day is next month. Your child has been selected for the relay team!", daysAgo(20, 9))
    msg(3, "parent", "Oh that's exciting! We'll make sure they practice. Do we need to buy any sports gear?", daysAgo(20, 10))
    msg(3, "teacher", "The school provides the team uniform. Just make sure they have proper sports shoes.", daysAgo(20, 10))
    msg(3, "parent", "Noted, thank you! We're very proud.", daysAgo(20, 11))
    msg(3, "parent", "Quick question - is the field trip to the science museum still happening next week?", daysAgo(7, 9))
    msg(3, "teacher", "Yes, confirmed for next Thursday. Permission slips were sent home yesterday.", daysAgo(7, 10))
    msg(3, "parent", "Got it! I'll sign and send it back tomorrow.", daysAgo(7, 10))
    msg(3, "teacher", "The trip fee is 500 BDT, payable at the school office.", daysAgo(7, 11))
    msg(3, "parent", "Will pay it today. Thank you for organizing this!", daysAgo(7, 11))

    // ── Conv 4: Admin ↔ Shakib (direct) ─────────────────────────────────────
    msg(4, "admin", "Welcome to EduPortal ! Let me know if you need any help getting started.", daysAgo(19, 9))
    msg(4, "shakib", "Thanks! The platform looks great. How do I access my attendance records?", daysAgo(19, 10))
    msg(4, "admin", "Go to Dashboard → Attendance → Overview. You can see daily and monthly records there.", daysAgo(19, 10))
    msg(4, "shakib", "Found it, thank you! The interface is very intuitive.", daysAgo(19, 11))
    msg(4, "admin", "Glad to hear that! We've recently updated the results section too. Check it out.", daysAgo(15, 8))
    msg(4, "shakib", "Just checked. Love the analytics charts! Is there an export option?", daysAgo(15, 9))
    msg(4, "admin", "Not yet, but it's on our roadmap. We'll notify you when it's available.", daysAgo(15, 9))
    msg(4, "shakib", "Looking forward to it!", daysAgo(15, 10))
    msg(4, "admin", "Fee payment reminder: Your semester fee is due next week.", daysAgo(3, 9))
    msg(4, "shakib", "I'll process the payment by Friday. Is online payment available?", daysAgo(3, 10))
    msg(4, "admin", "Yes, you can pay through Dashboard → Fees. We accept bKash and card.", daysAgo(3, 10))
    msg(4, "shakib", "Perfect, will do it tonight. Thanks!", daysAgo(3, 11))

    // ── Conv 5: Staff Meeting Updates (group) ───────────────────────────────
    msg(5, "admin", "Good morning everyone! Staff meeting is confirmed for this Friday at 10am in the conference room.", daysAgo(85, 9))
    msg(5, "principal", "I'll be there. Please prepare the agenda by Thursday.", daysAgo(85, 10))
    msg(5, "teacher", "Should we discuss the new curriculum changes?", daysAgo(85, 10))
    msg(5, "admin", "Yes, that's on the agenda along with budget review and upcoming events.", daysAgo(85, 11))
    msg(5, "aladiyat", "I'll prepare the IT infrastructure report for the meeting.", daysAgo(85, 11))
    msg(5, "admin", "Meeting minutes from last Friday are now available on the shared drive.", daysAgo(78, 9))
    msg(5, "principal", "Reviewed. Good progress on all action items. Let's keep the momentum.", daysAgo(78, 10))
    msg(5, "teacher", "The new textbooks have arrived. Distribution starts Monday.", daysAgo(78, 14))
    msg(5, "admin", "Excellent! I'll update the inventory records.", daysAgo(78, 14))
    msg(5, "admin", "Reminder: All departments must submit their quarterly reports by next Friday.", daysAgo(60, 9))
    msg(5, "principal", "Finance department report is ready.", daysAgo(60, 10))
    msg(5, "teacher", "Academic department report will be ready by Wednesday.", daysAgo(60, 11))
    msg(5, "aladiyat", "IT report is submitted. Check your email.", daysAgo(60, 11))
    msg(5, "admin", "Thank you all! Very efficient as always. 👏", daysAgo(60, 12))
    msg(5, "admin", "Important: School will be closed next Monday for a national holiday.", daysAgo(40, 9))
    msg(5, "principal", "Teachers, please assign appropriate homework for students.", daysAgo(40, 10))
    msg(5, "teacher", "Already done! Assignments are posted on the portal.", daysAgo(40, 10))
    msg(5, "admin", "The new attendance tracking system is live! Please check and report any issues.", daysAgo(20, 8))
    msg(5, "teacher", "Tested it this morning. Works smoothly!", daysAgo(20, 9))
    msg(5, "aladiyat", "If anyone faces login issues, reach out to me directly.", daysAgo(20, 9))
    msg(5, "principal", "Great work on the new system. Much more efficient than the old one.", daysAgo(20, 10))
    msg(5, "admin", "This week's meeting is moved to Thursday due to the science fair on Friday.", daysAgo(7, 9))
    msg(5, "teacher", "Noted. The science fair preparations are on track.", daysAgo(7, 10))
    msg(5, "principal", "I'll be visiting the stalls at 11am on Friday. Looking forward to it.", daysAgo(7, 10))
    msg(5, "admin", "Quick poll: Should we extend library hours during exam season? Reply with Yes/No.", daysAgo(2, 9))
    msg(5, "teacher", "Yes, definitely. Students need the extra study space.", daysAgo(2, 10))
    msg(5, "principal", "Yes. Also consider keeping the computer lab open.", daysAgo(2, 10))
    msg(5, "aladiyat", "Yes from IT side. We can manage the extended hours.", daysAgo(2, 11))
    msg(5, "admin", "Unanimous yes! Library hours extended from 8am-8pm starting next week. 📚", minutesAgo(300))

    // ── Conv 6: Class 10 Science Group ──────────────────────────────────────
    msg(6, "teacher", "Welcome to the Class 10 Science Group! Use this for class discussions and doubt clearing.", daysAgo(74, 9))
    msg(6, "student", "Thank you teacher! This will be very helpful.", daysAgo(74, 10))
    msg(6, "aisha", "Excited to have a dedicated group for our class!", daysAgo(74, 10))
    msg(6, "tariq", "Can we share study materials here too?", daysAgo(74, 11))
    msg(6, "teacher", "Yes! Feel free to share notes, diagrams, and useful links. Keep it academic.", daysAgo(74, 11))
    msg(6, "nusrat", "I found a great video on photosynthesis. Should I share the link?", daysAgo(70, 14))
    msg(6, "teacher", "Please do! Supplementary materials are always welcome.", daysAgo(70, 14))
    msg(6, "nusrat", "Here it is: https://example.com/photosynthesis-explained", daysAgo(70, 15))
    msg(6, "imran", "That was a great video! Really cleared up the light-dependent reactions.", daysAgo(70, 16))
    msg(6, "teacher", "Pop quiz tomorrow on Chapter 5 - Chemical Reactions. Please revise!", daysAgo(50, 15))
    msg(6, "student", "Is it going to cover balancing equations?", daysAgo(50, 15))
    msg(6, "teacher", "Yes, balancing equations and types of reactions. Focus on practice problems.", daysAgo(50, 16))
    msg(6, "aisha", "Can someone explain the difference between exothermic and endothermic reactions?", daysAgo(50, 16))
    msg(6, "tariq", "Exothermic releases heat (like burning), endothermic absorbs heat (like ice melting).", daysAgo(50, 17))
    msg(6, "teacher", "Perfect explanation, Tariq! 🌟", daysAgo(50, 17))
    msg(6, "teacher", "Lab session tomorrow. Please come prepared with your lab coats and notebooks.", daysAgo(30, 10))
    msg(6, "student", "What experiment are we doing?", daysAgo(30, 11))
    msg(6, "teacher", "Acid-base titration. Review the procedure from Chapter 7 before coming.", daysAgo(30, 11))
    msg(6, "nusrat", "Is this going to be part of the practical exam?", daysAgo(30, 12))
    msg(6, "teacher", "Yes, titration is one of the practical exam experiments. Pay close attention.", daysAgo(30, 12))
    msg(6, "imran", "Will we get to use the new equipment?", daysAgo(30, 13))
    msg(6, "teacher", "Yes! We have new burettes and the digital pH meters.", daysAgo(30, 13))
    msg(6, "teacher", "Mid-term exam schedule is out. Science exam is on March 20th.", daysAgo(14, 9))
    msg(6, "aisha", "That's right after the holidays! We need to start preparing now.", daysAgo(14, 10))
    msg(6, "tariq", "Can we organize group study sessions?", daysAgo(14, 10))
    msg(6, "teacher", "Great idea! You can use the library after school hours. Let me know if you need any help.", daysAgo(14, 11))
    msg(6, "student", "I'll create a study plan and share it here.", daysAgo(14, 12))
    msg(6, "nusrat", "Count me in for the group study!", daysAgo(14, 12))
    msg(6, "teacher", "Sharing some model question papers for practice. Please attempt them seriously.", daysAgo(7, 9))
    msg(6, "aisha", "Thank you teacher! Starting with paper 1 today.", daysAgo(7, 10))
    msg(6, "tariq", "Paper 2, question 15 seems tricky. Can we discuss it?", daysAgo(5, 14))
    msg(6, "teacher", "It's about electrolysis. Break down the problem step by step. First identify the cathode and anode.", daysAgo(5, 15))
    msg(6, "student", "I got it! The copper deposits on the cathode because Cu²⁺ ions gain electrons.", daysAgo(5, 15))
    msg(6, "teacher", "Correct! Well done. Remember these ion patterns for the exam.", daysAgo(5, 16))
    msg(6, "nusrat", "Good luck everyone on the exam! We're going to ace this! 💪", daysAgo(1, 20))
    msg(6, "imran", "Group study today really helped. Thank you all!", daysAgo(1, 20))
    msg(6, "teacher", "I'm proud of how dedicated you all have been. Best of luck! 🍀", minutesAgo(180))

    // ── Conv 7: Parent-Teacher Committee (group) ────────────────────────────
    msg(7, "principal", "Welcome to the Parent-Teacher Committee group. Let's work together for our students' success!", daysAgo(49, 9))
    msg(7, "teacher", "Thank you for including us. Looking forward to productive discussions.", daysAgo(49, 10))
    msg(7, "parent", "Happy to be part of this. Our children's education is our priority.", daysAgo(49, 10))
    msg(7, "admin", "I'll be handling the administrative coordination for this committee.", daysAgo(49, 11))
    msg(7, "principal", "First topic: Feedback on the new homework policy. Parents, please share your thoughts.", daysAgo(45, 9))
    msg(7, "parent", "The reduced homework load has been great. Children have more time for extracurriculars now.", daysAgo(45, 10))
    msg(7, "teacher", "We're seeing improved classroom engagement since the change. Students come better prepared.", daysAgo(45, 11))
    msg(7, "principal", "Wonderful feedback! We'll continue with this approach.", daysAgo(45, 11))
    msg(7, "principal", "Next meeting agenda: School safety improvements and new playground equipment.", daysAgo(30, 9))
    msg(7, "parent", "Can we also discuss the cafeteria menu? Some parents have concerns about nutrition.", daysAgo(30, 10))
    msg(7, "admin", "Good point. I'll add it to the agenda and invite the cafeteria manager.", daysAgo(30, 10))
    msg(7, "teacher", "I second the nutrition discussion. Healthy meals = better learning.", daysAgo(30, 11))
    msg(7, "principal", "Meeting update: Cafeteria will now offer a healthy meal option daily. Menu shared on the portal.", daysAgo(20, 9))
    msg(7, "parent", "Thank you! The new menu looks much better.", daysAgo(20, 10))
    msg(7, "admin", "Budget for new playground equipment has been approved!", daysAgo(15, 14))
    msg(7, "principal", "Installation starts next month. The kids are going to love the new climbing frames.", daysAgo(15, 15))
    msg(7, "parent", "This is wonderful news! Our children will be thrilled.", daysAgo(15, 15))
    msg(7, "teacher", "Can we also get some outdoor sports equipment? Badminton nets, etc.", daysAgo(15, 16))
    msg(7, "admin", "I'll add that to the procurement list.", daysAgo(15, 16))
    msg(7, "principal", "Reminder: Annual Day is approaching. Parents committee, we need volunteers for organizing.", daysAgo(5, 9))
    msg(7, "parent", "I can help with decorations and refreshments.", daysAgo(5, 10))
    msg(7, "admin", "We need 5 more parent volunteers. Sharing the signup sheet.", daysAgo(5, 10))
    msg(7, "teacher", "Cultural programs are finalized. Rehearsals start next week.", daysAgo(5, 11))
    msg(7, "principal", "Everything is shaping up nicely. This will be our best Annual Day yet! 🎉", minutesAgo(400))

    // ── Conv 8: Annual Day Planning (group) ─────────────────────────────────
    msg(8, "admin", "Annual Day 2026 planning has officially begun! 🎊", daysAgo(14, 9))
    msg(8, "principal", "Theme suggestions? I was thinking 'Innovation & Tradition'.", daysAgo(14, 10))
    msg(8, "teacher", "Love that theme! It perfectly captures our school's spirit.", daysAgo(14, 10))
    msg(8, "aisha", "Can students help with stage decorations?", daysAgo(14, 11))
    msg(8, "admin", "Absolutely! We need student volunteers. I'll put up a signup sheet.", daysAgo(14, 11))
    msg(8, "tariq", "I can help with the audio-visual setup.", daysAgo(14, 12))
    msg(8, "admin", "Great! We have a budget of 50,000 BDT. Let's plan accordingly.", daysAgo(12, 9))
    msg(8, "principal", "Allocate 20K for stage, 15K for food, 10K for decorations, 5K for contingency.", daysAgo(12, 10))
    msg(8, "teacher", "The drama club wants to perform a 20-minute play. Can we fit it in?", daysAgo(12, 11))
    msg(8, "admin", "We'll schedule it after the welcome speech. Program timeline being finalized.", daysAgo(12, 11))
    msg(8, "aisha", "The art club has created amazing posters for the event!", daysAgo(8, 14))
    msg(8, "teacher", "Share photos! Would love to see them.", daysAgo(8, 15))
    msg(8, "admin", "Event schedule is finalized. Sharing the detailed program.", daysAgo(5, 9), { type: "system" })
    msg(8, "tariq", "Sound system testing done. Everything is working perfectly.", daysAgo(3, 16))
    msg(8, "principal", "Rehearsal went very well today. Students are well-prepared!", daysAgo(2, 17))
    msg(8, "admin", "Final checklist: Stage ✅ Sound ✅ Decorations ✅ Catering ✅ Seating ✅", daysAgo(1, 9))
    msg(8, "teacher", "All student performers confirmed attendance. We're all set! 🎭", minutesAgo(600))

    // ── Conv 9: Exam Committee (group) ──────────────────────────────────────
    msg(9, "principal", "The mid-term examination committee is now active. Let's ensure a smooth process.", daysAgo(38, 9))
    msg(9, "teacher", "I've drafted the exam schedule. Review and share feedback.", daysAgo(38, 10))
    msg(9, "admin", "Schedule looks good. No overlapping subjects. Well planned!", daysAgo(38, 11))
    msg(9, "principal", "Approved. Circulate to all departments by Wednesday.", daysAgo(38, 11))
    msg(9, "teacher", "Question papers for Science and Math are ready for review.", daysAgo(30, 9))
    msg(9, "principal", "I'll review them this weekend. Please ensure difficulty level is balanced.", daysAgo(30, 10))
    msg(9, "admin", "Printing arrangements: We need 500 copies per subject. Vendor is confirmed.", daysAgo(30, 11))
    msg(9, "teacher", "Should we include multiple choice this time? Students have been requesting it.", daysAgo(25, 14))
    msg(9, "principal", "Yes, 30% MCQ and 70% written. Good mix of testing formats.", daysAgo(25, 15))
    msg(9, "admin", "Answer sheets have been ordered. Arriving next Monday.", daysAgo(25, 15))
    msg(9, "teacher", "Invigilation duty roster is prepared. Sharing it now.", daysAgo(15, 9))
    msg(9, "admin", "I see a conflict on Day 3 — Teacher Ahmed is assigned to two rooms.", daysAgo(15, 10))
    msg(9, "teacher", "Good catch! I'll reassign. Updated roster coming soon.", daysAgo(15, 10), { isEdited: true })
    msg(9, "principal", "Also ensure we have backup invigilators for emergencies.", daysAgo(15, 11))
    msg(9, "admin", "I've identified 3 backup invigilators. List is on the shared drive.", daysAgo(15, 11))
    msg(9, "principal", "Exam supplies checklist: Extra pens, rulers, calculators (for permitted exams). Are we stocked?", daysAgo(7, 9))
    msg(9, "admin", "All supplies ready. Stored in Room 105.", daysAgo(7, 10))
    msg(9, "teacher", "Can we discuss the grading rubric? I want to ensure consistency across sections.", daysAgo(5, 14))
    msg(9, "principal", "Good point. Let's schedule a 30-min calibration session with all examiners.", daysAgo(5, 15))
    msg(9, "admin", "Session scheduled for tomorrow at 3pm in the meeting room.", daysAgo(5, 15))
    msg(9, "teacher", "Results tabulation template is ready. Using the same format as last term.", daysAgo(2, 10))
    msg(9, "principal", "Add a column for grade distribution analysis this time.", daysAgo(2, 11))
    msg(9, "admin", "Updated template with the new column. Ready for use after exams.", daysAgo(2, 11))
    msg(9, "teacher", "Everything is in order. Exams start next Monday. We're prepared! ✅", minutesAgo(120))
    msg(9, "principal", "Outstanding preparation by the committee. Thank you all for your diligence. 🏅", minutesAgo(60))

    // ── Extra messages spread across different hours for daily activity analytics ──
    // Early morning messages
    msg(5, "admin", "Early heads up: Fire drill scheduled for 11am today.", daysAgo(35, 7))
    msg(6, "teacher", "Morning! Don't forget to bring your lab reports today.", daysAgo(25, 7))
    // Late morning
    msg(5, "principal", "The district education officer visit went very well!", daysAgo(55, 11))
    msg(7, "parent", "Is the school closed this Saturday for the festival?", daysAgo(35, 11))
    // Afternoon
    msg(6, "student", "Can we get extra practice problems for organic chemistry?", daysAgo(45, 13))
    msg(9, "admin", "Afternoon update: All exam rooms are sanitized and ready.", daysAgo(10, 13))
    // Late afternoon
    msg(5, "teacher", "After-school tutoring available in Room 102 today.", daysAgo(65, 16))
    msg(7, "teacher", "Sports day results are in! Our school won 3 gold medals! 🏆", daysAgo(22, 17))
    // Evening
    msg(6, "nusrat", "Just finished reviewing Chapter 9. The genetics section is fascinating!", daysAgo(40, 19))
    msg(6, "tariq", "I found some great online practice tests. Link shared!", daysAgo(38, 19))
    // Night
    msg(6, "imran", "Late night study session paying off. Chapter 10 done!", daysAgo(33, 22))
    msg(6, "aisha", "Same here! Let's compare notes tomorrow.", daysAgo(33, 22))

    // ── Historical messages for trend analytics (past months) ───────────────
    // 5 months ago
    msg(5, "admin", "New academic year planning begins!", daysAgo(150, 9))
    msg(5, "principal", "Let's set ambitious but achievable goals.", daysAgo(150, 10))
    msg(5, "teacher", "I have some great ideas for project-based learning.", daysAgo(150, 11))
    msg(5, "admin", "Faculty orientation schedule is finalized.", daysAgo(148, 9))
    msg(5, "aladiyat", "New computers installed in Lab 3.", daysAgo(145, 10))
    // 4 months ago
    msg(5, "admin", "First month performance review — all departments on track!", daysAgo(120, 9))
    msg(5, "teacher", "Student enrolment is up 15% this year!", daysAgo(118, 10))
    msg(5, "principal", "Excellent news. Let's maintain this momentum.", daysAgo(118, 11))
    msg(5, "admin", "Inter-school quiz competition results: We won second place! 🥈", daysAgo(115, 14))
    msg(5, "aladiyat", "The new SmartBoard software update is deployed.", daysAgo(112, 10))
    msg(5, "teacher", "Students are responding well to the interactive lessons.", daysAgo(110, 14))
    // 3 months ago
    msg(5, "admin", "Quarterly review meeting this Thursday.", daysAgo(95, 9))
    msg(5, "principal", "All HODs please prepare departmental presentations.", daysAgo(93, 10))
    msg(5, "teacher", "Science department report is ready!", daysAgo(92, 11))

    // Prepare final messages array with _id
    const messageDocs = allMessages.map(m => ({
        _id: new mongoose.Types.ObjectId(),
        ...m,
        attachments: [],
        isDeleted: false,
        __v: 0,
    }))

    await db.collection("messages").insertMany(messageDocs)
    console.log(`✓ Created ${messageDocs.length} messages across ${conversations.length} conversations`)

    // ══════════════════════════════════════════════════════════════════════════
    // UPDATE lastMessage on each conversation
    // ══════════════════════════════════════════════════════════════════════════

    for (const conv of conversations) {
        const lastMsg = messageDocs
            .filter(m => m.conversation.equals(conv._id))
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0]

        if (lastMsg) {
            await db.collection("conversations").updateOne(
                { _id: conv._id },
                { $set: { lastMessage: lastMsg._id, updatedAt: lastMsg.createdAt } }
            )
        }
    }
    console.log("✓ Updated lastMessage references on all conversations")

    // ══════════════════════════════════════════════════════════════════════════
    // PIN some messages
    // ══════════════════════════════════════════════════════════════════════════

    // Pin a few important messages in group conversations
    const staffMeetingMsgs = messageDocs.filter(m => m.conversation.equals(conversations[5]._id))
    const scienceMsgs = messageDocs.filter(m => m.conversation.equals(conversations[6]._id))

    if (staffMeetingMsgs.length > 2) {
        await db.collection("conversations").updateOne(
            { _id: conversations[5]._id },
            { $set: { pinnedMessages: [staffMeetingMsgs[0]._id, staffMeetingMsgs[staffMeetingMsgs.length - 1]._id] } }
        )
    }
    if (scienceMsgs.length > 0) {
        await db.collection("conversations").updateOne(
            { _id: conversations[6]._id },
            { $set: { pinnedMessages: [scienceMsgs[0]._id] } }
        )
    }
    console.log("✓ Pinned important messages in group conversations")

    // ══════════════════════════════════════════════════════════════════════════
    // Summary
    // ══════════════════════════════════════════════════════════════════════════

    const directCount = conversations.filter(c => c.type === "direct").length
    const groupCount = conversations.filter(c => c.type === "group").length
    const uniqueSenders = new Set(messageDocs.map(m => m.sender.toString())).size

    console.log("\n═══════════════════════════════════════")
    console.log("  📧 Message Module Seed Complete!")
    console.log("═══════════════════════════════════════")
    console.log(`  Conversations:  ${conversations.length} (${directCount} direct, ${groupCount} group)`)
    console.log(`  Messages:       ${messageDocs.length}`)
    console.log(`  Unique senders: ${uniqueSenders}`)
    console.log(`  Date range:     ~5 months of data`)
    console.log("═══════════════════════════════════════\n")

    await mongoose.disconnect()
    console.log("✓ Disconnected from MongoDB")
}

seed().catch(err => {
    console.error("Seed failed:", err)
    process.exit(1)
})
