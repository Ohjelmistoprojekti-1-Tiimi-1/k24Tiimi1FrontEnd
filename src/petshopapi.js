export const fetchProducts = async () => {
    const response = await fetch(import.meta.env.VITE_API_PRODUCTS);
    if (!response.ok)
        throw new Error("Error in fetch: " + response.statusText);
    return await response.json();
}


export const fetchManufacturers = async () => {
    const response = await fetch(import.meta.env.VITE_API_MANUFACTURERS);
    if (!response.ok)
    throw new Error("Error when fetching manufacturers: " + response.statusText);
return await response.json();
}


export const fetchProductsWithInfo = async () => {
    const response = await fetch(import.meta.env.VITE_API_PRODUCTSINFO);
    if (!response.ok)
        throw new Error("Error in fetch: " + response.statusText);
    return await response.json();
}


export const fetchManufacturerProducts = async (manufacturerName) => {
    const parsedManufacturerName = manufacturerName.replace("/\s/g", "+")
    const response = await fetch(import.meta.env.VITE_API_MANUFACTURERPRODUCTSWITHTYPE + parsedManufacturerName)
    if (!response.ok)
        throw new Error("Error when fetching manufacturer's products")
    return await response.json();
}