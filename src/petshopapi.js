export const fetchProducts = () => {
    return fetch(import.meta.env.VITE_API_PRODUCTS)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetch: " + response.statusText);

            return response.json();
        })
}

export const fetchProductsWithInfo = async () => {
    const response = await fetch(import.meta.env.VITE_API_PRODUCTSINFO);
    if (!response.ok)
        throw new Error("Error in fetch: " + response.statusText);
    return await response.json();
}

export const fetchManufacturers = () => {
    return fetch(import.meta.env.VITE_API_MANUFACTURERS)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetch: " + response.statusText);

            return response.json();
        })
}