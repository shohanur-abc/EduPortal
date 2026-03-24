import * as React from "react"
import { AttendanceCorrectionData } from "@/schemas/dashboard/attendance"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { deleteAttendance, markBulkAttendance } from "@/services/attendence"
import { getForClass } from "@/services/students"


const reducer = (state: UseAttendanceMarkState, action: UseAttendanceMarkAction): UseAttendanceMarkState => {
    switch (action.type) {
        case "OPEN_CORRECTION": return {
            ...state,
            editingId: action.payload._id,
            defaults: {
                status: action.payload.status as StatusType,
                remarks: action.payload.remarks || "",
                name: action.payload.name,
                rollNumber: action.payload.rollNumber,
            },
            correctionOpen: true,
        }
        case "CLOSE_CORRECTION": return {
            ...state,
            correctionOpen: false,
            editingId: null,
        }
        case "SET_DELETE_ID": return {
            ...state,
            deleteId: action.payload,
        }
        case "SET_RECORDS": return {
            ...state,
            records: action.payload,
        }
        case "DELETE_SUCCESS": return {
            ...state,
            deleteId: null,
        }
        case "UPDATE_RECORD_STATUS": return {
            ...state,
            records: state.records.map((record) =>
                record._id === action.payload.recordId
                    ? { ...record, status: action.payload.status }
                    : record
            ),
        }
        case "SET_SUBMITTING": return {
            ...state,
            isSubmitting: action.payload,
        }
        default: return state
    }
}

export function useAttendanceMark(selectedClassId: string | null, selectedDate: string, selectedClassSection: string) {
    const router = useRouter()
    const [state, dispatch] = React.useReducer(reducer, initialState)
    const [isPending, startTransition] = React.useTransition()

    const fetchRecords = (section: string) => {
        startTransition(async () => {
            if (!section) {
                dispatch({ type: "SET_RECORDS", payload: [] })
                return
            }
            try {
                const data = await getForClass(section)
                const mappedRecords = data.map((record) => ({
                    _id: record._id,
                    name: record.name,
                    rollNumber: record.rollNumber,
                    section: record.section,
                    status: "present" as const,
                    remarks: "",
                }))
                dispatch({ type: "SET_RECORDS", payload: mappedRecords })
            } catch (error) {
                console.error("Failed to fetch records:", error)
                toast.error("Failed to load records")
            }
        })
    }


    // Handle delete
    React.useEffect(() => {
        if (!state.deleteId) return

        const performDelete = async () => {
            try {
                const result = await deleteAttendance(state.deleteId!)
                if (result.success) {
                    toast.success(result.message)
                    dispatch({ type: "DELETE_SUCCESS" })
                    router.refresh()
                } else {
                    toast.error(result.error)
                }
            } catch (error) {
                console.error("Delete failed:", error)
                toast.error("Failed to delete attendance record")
            }
        }

        performDelete()
    }, [state.deleteId, router])

    const handleCorrect = React.useCallback((record: AttendanceRecord) => {
        dispatch({ type: "OPEN_CORRECTION", payload: record })
    }, [])

    const handleCloseCorrectionForm = React.useCallback(() => {
        dispatch({ type: "CLOSE_CORRECTION" })
    }, [])

    const handleSetDeleteId = React.useCallback((id: string | null) => {
        dispatch({ type: "SET_DELETE_ID", payload: id })
    }, [])

    const handleStatusChange = React.useCallback((recordId: string, status: StatusType) => {
        dispatch({ type: "UPDATE_RECORD_STATUS", payload: { recordId, status } })
    }, [])

    const handleSubmitAttendance = React.useCallback(async () => {
        if (!selectedClassId) {
            toast.error("Please select a class")
            return
        }

        dispatch({ type: "SET_SUBMITTING", payload: true })
        try {
            const entries = state.records.map((record) => ({
                student: record._id,
                status: record.status,
                remarks: record.remarks || "",
            }))

            const result = await markBulkAttendance({
                classId: selectedClassId,
                date: selectedDate,
                entries,
            })

            if (result.success) {
                toast.success(result.message)
                router.refresh()
            } else {
                toast.error(result.error)
            }
        } catch (error) {
            console.error("Submit failed:", error)
            toast.error("Failed to submit attendance")
        } finally {
            dispatch({ type: "SET_SUBMITTING", payload: false })
        }
    }, [selectedClassId, selectedDate, state.records, router])

    return {
        ...state,
        isPending,
        fetchRecords,
        handleCorrect,
        handleCloseCorrectionForm,
        handleSetDeleteId,
        handleStatusChange,
        handleSubmitAttendance,
    }
}

// ============ INITIAL STATE =============
const initialState: UseAttendanceMarkState = {
    editingId: null,
    defaults: { status: "present", remarks: "", name: "", rollNumber: "" },
    deleteId: null,
    records: [],
    correctionOpen: false,
    isSubmitting: false,
}



// ============= TYPES =============
interface AttendanceRecord {
    _id: string
    name: string
    rollNumber: string
    section: string
    status: "present" | "absent" | "late" | "excused"
    remarks?: string
}

interface UseAttendanceMarkState {
    editingId: string | null
    defaults: AttendanceCorrectionData
    deleteId: string | null
    records: AttendanceRecord[]
    correctionOpen: boolean
    isSubmitting: boolean
}

type UseAttendanceMarkAction =
    | { type: "OPEN_CORRECTION"; payload: AttendanceRecord }
    | { type: "CLOSE_CORRECTION" }
    | { type: "SET_DELETE_ID"; payload: string | null }
    | { type: "SET_RECORDS"; payload: AttendanceRecord[] }
    | { type: "DELETE_SUCCESS" }
    | { type: "UPDATE_RECORD_STATUS"; payload: { recordId: string; status: StatusType } }
    | { type: "SET_SUBMITTING"; payload: boolean }

type StatusType = "present" | "absent" | "late" | "excused"