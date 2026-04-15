import { useQuery } from "@tanstack/react-query"
import { getProductById, getProducts } from "./api"
import { IItem } from "@/type/item"

export const useGetProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: () =>
            getProducts().then(res => {
                return res as IItem[]
            })
        ,
        enabled: true
    })
}

export const useGetProductById = (id: string) => {
    return useQuery({
        queryKey: ['products', id],
        queryFn: () =>
            getProductById(id).then(res => {
                return res as IItem
            })
        ,
        enabled: true
    })
}