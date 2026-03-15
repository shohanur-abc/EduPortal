export type ActionResult<T = unknown> =
    | { success: true; data?: T; message: string }
    | { success: false; error: string }
