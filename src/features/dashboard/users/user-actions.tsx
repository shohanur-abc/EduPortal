"use client"

import * as React from "react"
import { z } from "zod"
import { Button, FormInput } from "@/components/molecules"
import { MutationFormSheet } from "@/components/molecules/mutation-form-sheet"
import { Edit } from "@/lib/icon"
import { updateBasicUser } from "@/services/users"
import type { ActionResult } from "@/types/response"
import type { AnyUser } from "./types"

const userEditSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Enter a valid email"),
    phone: z.string().min(1, "Phone is required"),
    address: z.string().min(1, "Address is required"),
})

type UserEditFormData = z.infer<typeof userEditSchema>

interface UserActionsProps {
    user: AnyUser
    onSave?: (userId: string, payload: UserEditFormData) => Promise<ActionResult>
}

export function UserActions({ user, onSave }: UserActionsProps) {
    const [open, setOpen] = React.useState(false)

    return (
        <>
            <Button
                type="button"
                variant="ghost"
                size="sm"
                iconOnly
                leftIcon={<Edit className="size-4" />}
                onClick={() => setOpen(true)}
                tooltip="Edit user"
            />

            <MutationFormSheet<UserEditFormData>
                open={open}
                onOpenChange={setOpen}
                title={`Edit ${user.name}`}
                description="Update basic user information"
                schema={userEditSchema}
                defaultValues={{
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                }}
                submitLabel="Save"
                onSubmit={async (data) => {
                    if (onSave) return onSave(user.id, data)
                    return updateBasicUser(user.id, data)
                }}
            >
                {() => (
                    <>
                        <FormInput name="name" label="Name" placeholder="Enter full name" />
                        <FormInput name="email" label="Email" type="email" placeholder="Enter email" />
                        <FormInput name="phone" label="Phone" placeholder="Enter phone" />
                        <FormInput name="address" label="Address" placeholder="Enter address" />
                    </>
                )}
            </MutationFormSheet>
        </>
    )
}
