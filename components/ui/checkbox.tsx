"use client"

import * as React from "react"
import { Checkbox as MuiCheckbox, CheckboxProps as MuiCheckboxProps } from '@mui/material'

export interface CheckboxProps extends MuiCheckboxProps {}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (props, ref) => (
    <MuiCheckbox
      ref={ref}
      size="small"
      {...props}
    />
  )
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
