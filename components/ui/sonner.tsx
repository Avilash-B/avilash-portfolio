"use client"

import { Alert, Snackbar, SnackbarProps } from '@mui/material'
import * as React from 'react'

type ToasterProps = SnackbarProps & {
  message?: string
  severity?: 'error' | 'warning' | 'info' | 'success'
}

const Toaster = ({ message, severity = 'info', ...props }: ToasterProps) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      autoHideDuration={6000}
      {...props}
    >
      <Alert severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  )
}

export { Toaster }
