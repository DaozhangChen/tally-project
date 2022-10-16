import {http} from "./Http";

export const useTags= async (kind:string,page:number)=>{
    const response=await http.get('/tags',{
    kind:kind,
    page:page
})
     return response.data
}