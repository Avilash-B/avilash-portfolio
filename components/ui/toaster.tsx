"use client"

import { useToast } from "@/hooks/use-toast"
import { Snackbar, Alert, AlertTitle } from '@mui/material'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Snackbar
            key={id}
            open={true}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            {...props}
          >
            <Alert severity="info" variant="filled">
              {title && <AlertTitle>{title}</AlertTitle>}
              {description}
              {action}
            </Alert>
          </Snackbar>
        )
      })}
    </>
  )
}
