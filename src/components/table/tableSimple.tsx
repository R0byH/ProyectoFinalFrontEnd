import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { productType } from '../../types/Products'

interface TableComponentProps {
  products: productType[]
  onView: (productId: string) => void
  onEdit: (productId: string) => void
  onDelete: (productId: string) => void
}

export const TableComponent: React.FC<TableComponentProps> = ({ products, onView, onEdit, onDelete }) => {
  return (
    <Table data-testid="productsTable">
      <TableHead>
        <TableRow>
          <TableCell data-testid="headerName" sx={{ fontSize: '1.25rem', color: '#006a65'}}>Nombre</TableCell>
          <TableCell data-testid="headerDescription" sx={{ fontSize: '1.25rem', color: '#006a65'}}>Descripción</TableCell>
          <TableCell data-testid="headerPrice" sx={{ fontSize: '1.25rem', color: '#006a65'}}>Precio</TableCell>
          <TableCell data-testid="headerActions" sx={{ fontSize: '1.25rem', color: '#006a65'}} align="center">Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id} data-testid={`productRow-${product.id}`}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell align="center">
              <Button sx={{color: '#09006a'}} onClick={() => onView(product.id.toString())}><VisibilityIcon />Ver Detalle</Button> 
              <Button onClick={() => onEdit(product.id.toString())} data-testid={`editButton-${product.id}`}><EditIcon />Editar</Button> 
              <Button sx={{color: '#6a0000'}} onClick={() => onDelete(product.id)} data-testid={`deleteButton-${product.id}`}><DeleteIcon />Eliminar</Button> 
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
