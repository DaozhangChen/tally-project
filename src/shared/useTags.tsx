import { AxiosResponse } from "axios";
import { http } from "./Http";

export const useTags = async (kind: string, page: number) => {
    const response = await http.get('/tags', {
        kind: kind,
        page: page
    },{_autoLoading:true})
    return response.data
}