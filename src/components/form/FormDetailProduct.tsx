import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material';
import { productId } from '../../types/Products';
import { WebService } from '../../services'; // Importa el WebService
import { leerCookie } from '../../utils/cookies';
import { Constantes } from '../../config';
import { imprimir } from '../../utils/imprimir';
import { toast } from 'react-toastify';
import '../../styles/globals.css';

interface DetailsModalProps {
  open: boolean;
  onClose: () => void;
  productId?: string;
}


export const DetailsModal: React.FC<DetailsModalProps> = ({ open, onClose, productId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        const token = leerCookie('token');
        try {
          const response = await WebService.get({
            url: `${Constantes.baseUrl}/api/products/${productId}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          imprimir(response)
          setName(response.name);
          setDescription(response.description);
          setPrice(response.price);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
      fetchProduct();
    } else {
      setName('');
      setDescription('');
      setPrice('');
    }
  }, [productId]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ bgcolor:'#f0eeee'}} textAlign="center" color={'#6a0000'}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Detalle del Producto&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</DialogTitle>
      <DialogContent sx={{ bgcolor:'#f0eeee'}}>
        <Box>
          <Typography variant="h6">Nombre:</Typography>
          <Typography>{name}</Typography>
          <Typography variant="h6">Descripción:</Typography>
          <Typography>{description}</Typography>
          <Typography variant="h6">Precio:</Typography>
          <Typography>{price}</Typography>
          <br />
        </Box>
      </DialogContent>
      <DialogActions sx={{ bgcolor:'#f0eeee', textAlign:'center'}}>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
