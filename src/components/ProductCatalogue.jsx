import { CardContent, CardHeader, Card, Box, Grid, Typography } from "@mui/material"
import ReserveButton from './ReserveButton'


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
                <Typography>{props.product.manufacturer.name}</Typography>
                <ReserveButton product={props.product} ></ReserveButton>
            </CardContent>
        </Card>
    );
}


export default ProductCatalog