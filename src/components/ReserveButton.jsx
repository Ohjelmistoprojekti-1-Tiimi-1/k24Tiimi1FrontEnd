import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {IconButton} from "@mui/material"

function ReserveButton (product) {

    const reserve = async () => {
        const reservations = JSON.parse(sessionStorage.getItem("reservations"));
        if  (reservations === "" || reservations == null) {
            sessionStorage.setItem("reservations", JSON.stringify([product]))
        }else {
            reservations.push(product)
            sessionStorage.setItem("reservations", JSON.stringify(reservations))
        }
    }

    return (< IconButton onClick={reserve}>
                    <AddShoppingCartIcon />
        </IconButton >)
} export default ReserveButton ;