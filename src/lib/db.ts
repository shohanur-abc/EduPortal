import "server-only"

import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables")
}

const cached = global as typeof globalThis & {
    mongoose: {
        conn: typeof mongoose | null
        promise: Promise<typeof mongoose> | null
    }
}

if (!cached.mongoose) {
    cached.mongoose = { conn: null, promise: null }
}

export async function connectDB() {
    if (cached.mongoose.conn) {
        return cached.mongoose.conn
    }

    if (!cached.mongoose.promise) {
        cached.mongoose.promise = mongoose.connect(MONGODB_URI)
    }

    cached.mongoose.conn = await cached.mongoose.promise
    return cached.mongoose.conn
}


// Helper to safely read a populated field
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pop = (field: unknown, key: string): string => (field as any)?.[key] ?? ""


// Helper to serialize mongoose docs
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sid = (doc: any): string => String(doc._id ?? doc.id ?? "")
