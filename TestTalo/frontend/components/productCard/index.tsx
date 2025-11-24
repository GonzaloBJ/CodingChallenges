import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ProductCardComponent({imageUrl, name, price, brand, detailsRoute, fullDetails}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" color="text.secondary">
        {brand??'marca'}
        </Typography>
        <Typography variant="h6">
        {name??'nombre'}
        </Typography>
        <CardMedia
            component="img"
            alt="productImage"
            height="100"
            width="100"
            image={imageUrl??'#'}
        />
        <Typography variant="h5" color="text.secondary">
          {price??'$0'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" >Ver detalle del producto</Button>
        {/* todo: redireccion  a detalle  */}
      </CardActions>
    </Card>
  );
}