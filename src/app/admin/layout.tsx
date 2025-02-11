'use client'

import React, { PropsWithChildren } from 'react'
import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import { eliminarCookie } from '../../utils/cookies'
import { useRouter } from 'next/navigation'
import { ToastContainer } from 'react-toastify';
import '../../styles/globals.css'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            style={{ flexGrow: 1 }}
            color={'#6a0000'}
          >
            Productos (Trabajo Final)
          </Typography>
          <Button
            color="primary"
            onClick={() => {
              eliminarCookie('token')
              router.replace('/login')
            }}
          >
            Salir
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ p: 2 }}>{children}</Container>
      <ToastContainer />
    </>
  )
}

export default Layout
