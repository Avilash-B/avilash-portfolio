"use client"

import * as React from "react"
import { Avatar as MuiAvatar, AvatarProps as MuiAvatarProps } from '@mui/material'

interface AvatarProps extends MuiAvatarProps {
  children?: React.ReactNode
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ children, sx, ...props }, ref) => (
    <MuiAvatar
      ref={ref}
      sx={{
        width: 40,
        height: 40,
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiAvatar>
  )
)
Avatar.displayName = "Avatar"

interface AvatarImageProps {
  src?: string
  alt?: string
}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ src, alt, ...props }, ref) => (
    <img
      ref={ref}
      src={src}
      alt={alt}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
      {...props}
    />
  )
)
AvatarImage.displayName = "AvatarImage"

interface AvatarFallbackProps {
  children: React.ReactNode
}

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ children, ...props }, ref) => (
    <div
      ref={ref}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
      {...props}
    >
      {children}
    </div>
  )
)
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }
