"use client"

import * as React from "react"
import { Box, BoxProps } from '@mui/material'

interface AspectRatioProps extends BoxProps {
  ratio?: number
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 1, children, ...props }, ref) => (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        width: '100%',
        paddingBottom: `${(1 / ratio) * 100}%`,
        '& > *': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        },
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Box>
  )
)
AspectRatio.displayName = "AspectRatio"

export { AspectRatio }
