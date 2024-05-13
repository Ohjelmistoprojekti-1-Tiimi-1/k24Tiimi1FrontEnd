import { useContext } from "react";
import { CardContent, CardHeader, Card, Box, Grid, Typography, IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ReserveButton from './notUsedComponents/ReserveButton';
import ReservationContext from "./ReservationContext";


function ProductCatalog(props) {

    return (
        <Box>
            <Grid container spacing={2} sx={{ marginTop: 1, marginLeft: 1 }}>
                {props.products.map((product, index) => {
                    return <Box key={product.productId + "_" + index}><ProductCard product={product}></ProductCard></Box>;
                })}
            </Grid>
        </Box>
    );

}

function ProductCard(props) {
    const { addToReservation } = useContext(ReservationContext);


    return (
        <>
            <Card sx={{ margin: "2em", width: 230 }}>
                <CardHeader subheader={props.product.name}></CardHeader>
                <CardContent>
                    <Typography>{props.product.manufacturer.name}</Typography>
                    < IconButton onClick={() => addToReservation(props.product)} >
                        <AddShoppingCartIcon />
                    </IconButton >
                </CardContent>
            </Card>
        </>
    );
}


export default ProductCatalog;