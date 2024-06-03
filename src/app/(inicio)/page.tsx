'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'  // Asegúrate de usar el import correcto para Next.js 13
import { Container, Typography } from '@mui/material'
import ProductListPublic from '../../components/ProductListPublic'
import axios from 'axios'
import Navbar from '../../components/Navbar'
import { imprimir } from '../../utils/imprimir'
import { productType } from '../../types/Products'

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<productType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get<Array<productType>>(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`
        )
        imprimir(`Ruta:: ${process.env.NEXT_PUBLIC_BASE_URL}/api/products`)
        setProducts(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching products:', error)
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Container maxWidth="sm">
      <Navbar />
      <br />
      <ProductListPublic products={products} />
    </Container>
  )
}

export default HomePage
