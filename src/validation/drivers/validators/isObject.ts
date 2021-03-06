import { ValidationError } from "../../../errors/http/ValidationError"

import { ObjectValidator, ValidatedObject } from "../.."

export const isObject = <V extends ObjectValidator>(validator: V) => async (
    i: unknown
): Promise<ValidatedObject<V>> => {
    if (typeof i !== "object" || i === null) {
        throw new ValidationError(
            "IS_OBJECT",
            "Object validation failed",
            "This value should be an object."
        )
    }

    let response: Partial<ValidatedObject<V>> = {}

    for (let p in validator) {
        if (validator.hasOwnProperty(p)) {
            // Sadly ts-ignore this as TS doesn't understand that we have strongly ensured
            // that this property is present.
            // @ts-ignore
            let rawValue = i[p]

            try {
                let validatedOutput = await validator[p](rawValue)

                if (validatedOutput !== undefined) {
                    response[p] = validatedOutput
                }
            } catch (e) {
                if (e instanceof ValidationError) {
                    // Append the path to the error message
                    if (e.fieldPath) {
                        e.fieldPath = `${p}.${e.fieldPath}`
                    } else {
                        e.fieldPath = p
                    }
                }

                throw e
            }
        }
    }

    return response as ValidatedObject<V>
}
