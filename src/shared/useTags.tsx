import { http } from "./Http";


export type Resources={
    created_at:string,
    deleted_at:null|string,
    id:number,
    kind:'expenses'|'income',
    name:string,
    sign:string,
    updated_at:string,
    user_id:number
}
interface billList{
    resources:Resources[],
    pager:{
        count:number,
        page:string,
        per_page:number
    }
}

export const useTags = async (kind: string, page: number) => {
    const response = await http.get('/tags', {
        kind: kind,
        page: page
    },{_autoLoading:true})
    return response.data
}