import { CardContent, CardHeader, Card, Box, Grid, IconButton, Typography } from "@mui/material"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


function ProductCatalog(props) {


    return (
        <Box>
            <Grid container spacing={2} sx={{ marginTop: 1, marginLeft: 1 }}>
                {props.products.map((product, index) => {
                    return <Box key={product.productId + "_" + index}><ProductCard product={product}></ProductCard></Box>;
                })}
            </Grid>
        </Box>
    )

}

function ProductCard(
    props
) {
    return (
        <Card sx={{ margin: "2em", width: 230 }}>
            <CardHeader subheader={props.product.name}></CardHeader>
            {/**
            <CardMedia
                sx={{ height: 100, width: 230 }}
                component="img"
                image="./kuvat/herkkuKuva.jpg"
                alt={"herkullinen kuva"}
            ></CardMedia>
            */}
            <CardContent>
                <Typography>{props.product.manufacturer}</Typography>
                < IconButton >
                    <AddShoppingCartIcon />
                </IconButton >
            </CardContent>
        </Card>
    );
}


export default ProductCatalog