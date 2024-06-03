'use client'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { eliminarCookie, leerCookie } from '../../../utils/cookies'
import { WebService } from '../../../services'
import { Constantes } from '../../../config'
import { imprimir } from '../../../utils/imprimir'
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from '@mui/material'
import { productType, productSave, productId } from '../../../types/Products'
import { TableComponent } from '../../../components/table/tableSimple'
import { ProductFormModal } from '../../../components/form/FormCreateProduct'
import { ConfirmDeleteModal } from '../../../components/form/FormDeleteProduct'
import { toast } from 'react-toastify';
import '../../../styles/globals.css'
import AddIcon from '@mui/icons-material/Add';
import { DetailsModal } from '../../../components/form/FormDetailProduct'

const AdminHomePage = () => {
  const [resumenData, setResumenData] = useState<productType[]>([])
  const [reloadData, setReloadData] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [currentProductId, setCurrentProductId] = useState<string | undefined>(undefined)

  const handleOpenModal = (productId: string | undefined = undefined) => {
    setCurrentProductId(productId)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setCurrentProductId(undefined)
  }

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [productIdToDelete, setProductIdToDelete] = useState<string | undefined>(undefined)
  const [productIdToView, setProductIdToView] = useState<string | undefined>(undefined)

  const handleViewModal = (productId: string) => {
    setProductIdToView(productId)
    setIsDetailOpen(true)
  }

  const handleCloseDetailModal = () => {
    setIsDetailOpen(false)
    setProductIdToView(undefined)
  }

  const handleOpenDeleteModal = (productId: string) => {
    setProductIdToDelete(productId)
    setIsDeleteModalOpen(true)
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setProductIdToDelete(undefined)
  }
  const handleDeleteSubmit = (productId: string) => {
    setResumenData((prevData) => prevData.filter((product) => product.id !== productId))
    setReloadData(true);
  }

  const handleFormSubmit = (formData: productSave) => {
    setResumenData((prevData) => {
      if (currentProductId) {
        setReloadData(true);
        return prevData.map((product) =>
          product.id === currentProductId ? { ...product, ...formData } : product
        )
      } else {
        const newProduct: productType = {
          ...formData,
          id: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId: 1
        }
        setReloadData(true);
        return [...prevData, newProduct]
      }
    })
    handleCloseModal()
  }

  const fetchProducts = async () => {
    const token = leerCookie('token')
    console.log("Token:: ", token)
    try {
      const response = await WebService.get({
        url: `${Constantes.baseUrl}/api/products` ?? '',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      imprimir(response)
      setResumenData(response)
    } catch (error) {
      eliminarCookie('token')
      console.error('Error fetching user:', error)
      redirect('/login')
    }
  }


  useEffect(() => {
    fetchProducts()
  }, [reloadData])


  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Card>
        <CardContent sx={{ bgcolor:'#f0eeee'}}>
          <Typography textAlign="center" variant="h4" component="h1" gutterBottom>
            Administración
          </Typography>
          <Typography variant="h6" component="p">
            Bienvenido, aquí puedes gestionar los productos.
          </Typography>
          <Box mt={2} textAlign="end">
            <Button onClick={() => handleOpenModal(undefined)} variant="contained" color="primary">
              <AddIcon></AddIcon> Registrar Nuevo
            </Button>
          </Box>
          <Typography variant="h6" component="p">
            Productos
          </Typography>
          <TableComponent products={resumenData} onView={handleViewModal} onEdit={handleOpenModal} onDelete={handleOpenDeleteModal} />
        </CardContent>
      </Card>

      {isModalOpen && (
        <ProductFormModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleFormSubmit}
          productId={currentProductId}
          setReloadData={setReloadData}
        />
      )}

      {isDetailOpen && (
        <DetailsModal
          open={isDetailOpen}
          onClose={handleCloseDetailModal}
          productId={productIdToView}
        />
      )}
      
      {isDeleteModalOpen && (
        <ConfirmDeleteModal
          open={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onSubmit={handleDeleteSubmit}
          productId={productIdToDelete}
          setReloadData={setReloadData}
        />
      )}

    </Container>
  )
}

export default AdminHomePage
