import { useEffect, useState } from 'react';
import ReservationContext from './ReservationContext';

const getFromStorage = () => {
    const reservationStorage = sessionStorage.getItem("reservation");
    return reservationStorage ? JSON.parse(reservationStorage) : [];
};

const ReservationProvider = ({ children }) => {
    const [reservationProducts, setReservationProducts] = useState(getFromStorage);

    const addToReservation = (product) => {
        setReservationProducts(prevReservation => [...prevReservation, product]);
    };

    const removeFromReservation = (productId) => {
        setReservationProducts(prevReservProducts => prevReservProducts.filter(r => r.productId !== productId));
    };

    const emptyReservation = () => {
        setReservationProducts([]);
    }


    useEffect(() => {
        sessionStorage.setItem("reservation", JSON.stringify(reservationProducts));
        // console.log(JSON.parse(sessionStorage.getItem("reservation"))); 
    }, [reservationProducts]);


    return (
        <ReservationContext.Provider value={{ reservationProducts, addToReservation, removeFromReservation, emptyReservation }}>
            {children}
        </ReservationContext.Provider>
    );
};

export default ReservationProvider;