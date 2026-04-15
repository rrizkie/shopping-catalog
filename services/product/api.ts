import { BASE_URL } from "@/utils/constants";
import satellite from "../satellite";
import { AxiosError } from 'axios'

const PRODUCT_API_URL = BASE_URL + "/products"

export const getProducts = async () => {
    return await satellite.get(PRODUCT_API_URL)
        .then(res => res.data)
        .catch(error => (error instanceof AxiosError ? error.response?.data : error))
}

export const getProductById = async (id: string) => {
    return await satellite.get(PRODUCT_API_URL + `/${id}`)
        .then(res => res.data)
        .catch(error => (error instanceof AxiosError ? error.response?.data : error))
}