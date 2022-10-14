interface FData {
    [k: string]: JSONValue
}
type Rule={
    key:keyof FData
    message:string
} &(
    { type: 'required' } |
    { type: 'pattern', regex: RegExp } |
    { type: 'notEqual', value: JSONValue }
    )
type Rules=Rule[]
export type {Rules,Rule,FData}
export const validate=function (formData:FData,rules:Rules){
    type Errors = {
        [k in keyof FData]?: string[]
    }
    const errors: Errors = {}
    rules.forEach(rule=>{
        const { key, type, message } = rule
        const value = formData[key]
        switch (type) {
            case 'required':
                if (isEmpty(value)) {
                    errors[key] = errors[key] ?? []
                    errors[key]?.push(message)
                }
                break;
            case 'pattern':
                if (!isEmpty(value) && !rule.regex.test(value.toString())) {
                    errors[key] = errors[key] ?? []
                    errors[key]?.push(message)
                }
                break;
            case 'notEqual':
                if (!isEmpty(value) && value === rule.value) {
                    errors[key] = errors[key] ?? []
                    errors[key]?.push(message)
                }
                break;
            default:
                return
        }
    })
    return errors
}

function isEmpty(value: null | undefined | string | number | FData) {
    return value === null || value === undefined || value === ''
}
