export const fetchProducts = async () => {
  const response = await fetch(import.meta.env.VITE_API_PRODUCTS);
  if (!response.ok)
    throw new Error("Error fetching products: " + response.statusText);
  return await response.json();
};

export const fetchManufacturers = async () => {
  const response = await fetch(import.meta.env.VITE_API_MANUFACTURERS);
  if (!response.ok)
    throw new Error("Error fetching manufacturers: " + response.statusText);
  return await response.json();
};

export const fetchProductsWithInfo = async () => {
  const response = await fetch(import.meta.env.VITE_API_PRODUCTSINFO);
  if (!response.ok)
    throw new Error("Error fetching products: " + response.statusText);
  return await response.json();
};

export const fetchManufacturerProducts = async (manufacturerName) => {
  const parsedManufacturerName = manufacturerName.replace("/s/g", "+");
  const response = await fetch(
    import.meta.env.VITE_API_MANUFACTURERPRODUCTSWITHTYPE +
      parsedManufacturerName
  );
  if (!response.ok)
    throw new Error(
      "Error fetching manufacturer's products: " + response.statusText
    );
  return await response.json();
};

export const newReservation = async (reservation) => {
  const response = await fetch(import.meta.env.VITE_API_NEWRESERVATION, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("jwt"),
    },
    body: JSON.stringify(reservation),
  });
  if (!response.ok)
    throw new Error("Error inserting new reservation: " + response.statusText);
  return await response.json();
};

// fetch all reservations for the currently logged in customer
export const fetchReservations = async (reservation) => {
  const response = await fetch(import.meta.env.VITE_API_RESERVATIONS, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("jwt"),
    },
  });
  if (!response.ok)
    throw new Error("Error fetching reservations: " + response.statusText);
  return await response.json();
};

// fetch products with reservation id
export const fetchReservationProducts = async (reservation) => {
  const response = await fetch(import.meta.env.VITE_API_RESERVATIONPRODUCTS, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("jwt"),
    },
  });
  if (!response.ok)
    throw new Error("Error fetching reservations: " + response.statusText);
  return await response.json();
};
