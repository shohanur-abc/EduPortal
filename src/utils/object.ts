

/*** Pick specific keys from object*/
export const pick = <T extends object, K extends keyof T>(
    obj: T,
    keys: K[]
): Pick<T, K> => {
    const result = {} as Pick<T, K>
    for (const k of keys) if (k in obj) result[k] = obj[k]
    return result
}

/*** Omit specific keys from object*/
export const omit = <T extends object, K extends keyof T>(
    obj: T,
    keys: K[]
): Omit<T, K> => {
    const result = { ...obj }
    for (const k of keys) delete (result)[k]
    console.log("ami omit")
    return result
}
