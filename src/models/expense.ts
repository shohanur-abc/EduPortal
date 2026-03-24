import mongoose, { Schema } from 'mongoose'

// ============= SCHEMA DEFINITION =============
const expenseSchema = new Schema(
    {
        expenseId: { type: String, required: true, unique: true },
        title: { type: String, required: true },
        category: { type: String, enum: ['laboratory', 'maintenance', 'boarding-equipment', 'library', 'sports', 'it-infrastructure', 'transportation', 'cafeteria', 'arts-crafts', 'salary', 'supplies', 'utilities', 'events', 'other'], required: true },
        quantity: { type: String },
        amount: { type: Number, required: true },
        date: { type: Date, required: true },
        status: { type: String, enum: ['pending', 'approved', 'paid', 'rejected'], default: 'pending' },
        paymentMethod: { type: String, enum: ['cash', 'card', 'bank-transfer', 'online', 'cheque'] },
        receiptNumber: { type: String },
        issuedBy: { type: Schema.Types.ObjectId, ref: 'User' },
        remarks: { type: String },
    },
    {
        timestamps: true,
        statics: {
            getAll(limit: number = 200) {
                return this.find().populate('issuedBy', 'name').sort({ date: -1 }).limit(limit)
            }
        }
    }
)
export const ExpenseModel = mongoose.models.Expense || mongoose.model('Expense', expenseSchema)
