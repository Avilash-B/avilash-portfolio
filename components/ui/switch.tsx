"use client"

import * as React from "react"
import { Switch as MuiSwitch, SwitchProps as MuiSwitchProps } from '@mui/material'

export interface SwitchProps extends MuiSwitchProps {}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (props, ref) => (
    <MuiSwitch
      ref={ref}
      {...props}
    />
  )
)
Switch.displayName = "Switch"

export { Switch }
