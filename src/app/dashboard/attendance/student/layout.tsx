"use client"
import React from "react"


export default function MarkLayout({ "table": StudentAttendance, }: { "table": React.ReactNode }) {
    return (
        //<MarkProvider>
        <div className="space-y-6">
            {StudentAttendance}
        </div>
        //</MarkProvider>
    )
}


// const MarkContext = React.createContext<MarkContextType | undefined>(undefined)

// export function useMarkContext() {
//     const context = React.useContext(MarkContext)
//     if (!context) {
//         throw new Error("useMarkContext must be used within MarkProvider")
//     }
//     return context
// }

// function MarkProvider({ children }: { children: React.ReactNode }) {
//     const [selectedClassId, setSelectedClassId] = React.useState("")
//     const [selectedClassSection, setSelectedClassSection] = React.useState("")
//     const [selectedDate, setSelectedDate] = React.useState(new Date().toISOString().split("T")[0])

//     return (
//         <MarkContext.Provider value={{
//             selectedClassId, setSelectedClassId,
//             selectedClassSection, setSelectedClassSection,
//             selectedDate, setSelectedDate
//         }}>
//             {children}
//         </MarkContext.Provider>
//     )
// }



interface MarkContextType {
    selectedClassId: string
    setSelectedClassId: (id: string) => void
    selectedClassSection: string
    setSelectedClassSection: (section: string) => void
    selectedDate: string
    setSelectedDate: (date: string) => void
}
