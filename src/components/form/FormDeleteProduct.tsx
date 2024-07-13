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

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (productId: string) => void;
  productId?: string;
  setReloadData: (value: boolean) => void;
}


export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ open, onClose, onSubmit, productId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [reloadData, setReloadData] = useState(false);

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
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
      fetchProduct();
    } else {
      setName('');
      setDescription('');
    }
  }, [productId]);


  const handleDelete = async () => {
    try {
      const token = leerCookie('token');
      const response = await WebService.delete({
        url: `${Constantes.baseUrl}/api/products/${productId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      imprimir(response)
      onSubmit(productId || '');
      toast.success('Producto eliminado con éxito!');
      onClose();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Hubo un error al eliminar el producto.');
    }
  };


  return (
    <Dialog open={open} onClose={onClose} data-testid="confirmDeleteModal">
      <DialogTitle sx={{ bgcolor:'#f0eeee'}} textAlign="center" color={'#6a0000'}>Eliminar Producto</DialogTitle>
      <DialogContent sx={{ bgcolor:'#f0eeee'}}>
        <Box>
          <Typography variant="h6">Nombre:</Typography>
          <Typography data-testid="productName">{name}</Typography>
          <Typography variant="h6">Descripción:</Typography>
          <Typography data-testid="productDescription">{description}</Typography>
          <br />
          <Typography variant="h5" color={'#e74c3c'}>¿Está seguro que desea eliminar el registro?</Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ bgcolor:'#f0eeee', textAlign:'center'}}>
        <Button onClick={onClose} color="primary" data-testid="cancelDeleteButton">
          Cancelar
        </Button>
        <Button onClick={handleDelete} color="primary" data-testid="confirmDeleteButton">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
