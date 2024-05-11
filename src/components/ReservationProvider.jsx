import { useState } from 'react';
import ReservationContext from './ReservationContext';

const ReservationProvider = ({ children }) => {
    const [reservationProducts, setReservationProducts] = useState([]);

    const addToReservation = (product) => {
        setReservationProducts(prevReservation => [...prevReservation, product]);
    };

    return (
        <ReservationContext.Provider value={{ reservationProducts, addToReservation }}>
            {children}
        </ReservationContext.Provider>
    );
};

export default ReservationProvider;