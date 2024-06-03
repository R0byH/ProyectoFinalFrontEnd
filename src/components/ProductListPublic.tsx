import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardActionArea,
} from '@mui/material'
import { productType } from '../types/Products'

interface ProductsListProps {
  products: productType[]
}

const ProductListPublic: React.FC<ProductsListProps> = ({ products }) => {
  return (
    <Grid container spacing={2}>
      {products.map((item) => (
        <Grid item xs={12} sm={6} md={6} key={item.id}>
          <Card sx={{ bgcolor:'#f0eeee'}}>
            <CardActionArea>
              <CardContent>
                <Typography align='center' variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body1">
                  Descripción: {item.description}
                </Typography>
                <Typography variant="body1">Precio: {item.price}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default ProductListPublic
