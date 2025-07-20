import * as React from "react"
import { Chip, ChipProps } from '@mui/material'

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline'

export interface BadgeProps extends Omit<ChipProps, 'variant'> {
  variant?: BadgeVariant
}

function Badge({ variant = 'default', ...props }: BadgeProps) {
  const getVariantProps = (variant: BadgeVariant) => {
    switch (variant) {
      case 'secondary':
        return { color: 'secondary' as const, variant: 'filled' as const }
      case 'destructive':
        return { color: 'error' as const, variant: 'filled' as const }
      case 'outline':
        return { color: 'default' as const, variant: 'outlined' as const }
      default:
        return { color: 'primary' as const, variant: 'filled' as const }
    }
  }

  return (
    <Chip
      size="small"
      {...getVariantProps(variant)}
      {...props}
    />
  )
}

export { Badge }
