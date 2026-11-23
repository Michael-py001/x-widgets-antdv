export type FormFieldName = string | [string, string]

type FormDataRecord = Record<string, any>

export function setFormdata(formData: object, name: FormFieldName, value: unknown) {
    const data = formData as FormDataRecord
    if (Array.isArray(name)) {
        if (name.length === 2) {
            const [name1, name2] = name
            data[name1][name2] = value
            return
        }
    } else {
        data[name] = value
    }
}

export function getValue(formData: object, name: FormFieldName) {
    const data = formData as FormDataRecord
    if (Array.isArray(name)) {
        const [name1, name2] = name
        return data[name1][name2]
    }
    return data[name]
}
