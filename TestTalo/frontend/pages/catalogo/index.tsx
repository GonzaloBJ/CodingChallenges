import Grid from "@mui/material/Grid";
import ProductCardComponent from "../../components/productCard";


export default function Catalogo() {
    const items = [ 
        {
            imageUrl: '#',
            name: 'sample1',
            price: '$9990',
            brand: 'generico',
            detailsRoute: '/',
            fullDetails: {} 
        },
        {
            imageUrl: '#',
            name: 'sample1',
            price: '$9990',
            brand: 'generico',
            detailsRoute: '/',
            fullDetails: {}
        },
        {
            imageUrl: '#',
            name: 'sample1',
            price: '$9990',
            brand: 'generico',
            detailsRoute: '/',
            fullDetails: {}
        }
    ]

    return (
        <>
        <h1>Catalogo</h1>
        <Grid container spacing={2}>
        {
            items.map(item => 
                (
                    <Grid item xs={3}>
                        <ProductCardComponent {...item}/>
                    </Grid>
                )
            )
        }
        </Grid>
        
        </>
    )
}