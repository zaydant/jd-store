import axios from "axios";

const baseUrl = "http://localhost:8080/api/products"

export const fetchAllProducts = async () => {
    try {
        const response = await axios.get(`${baseUrl}/allProducts`)
        return response.data.data
    } catch (error) {
        console.error(error)
        throw new Error("Failed to fetch all products. Please try again later.")
    }
}
export const fetchProductById = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/${id}`)
        return response.data.data
    } catch (error) {
        console.error(error)
        throw new Error("Failed to fetch product. Please try again later.")
    }
}
