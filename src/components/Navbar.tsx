import React from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import './Navbar'
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  IconButton,
} from '@mui/material'

function Navbar() {
  const router = useRouter()
  return (
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
              router.replace('/login')
            }}
          >
            Ingresar
          </Button>
        </Toolbar>
      </AppBar>
  )
}

export default Navbar
