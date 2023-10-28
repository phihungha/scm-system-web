'use client';

import { VisibilityOff, Visibility } from '@mui/icons-material';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@mui/material';
import { useState } from 'react';

export interface PasswordFieldProps {
  password: string;
  label?: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  onPasswordChanged: (p: string) => void;
}

function getLabel(label?: string, required?: boolean) {
  const labelText = label ?? 'Password';
  return labelText + (required ? ' *' : '');
}

export default function PasswordField(props: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const onShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormControl className="w-full" variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">
        {getLabel(props.label, props.required)}
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        value={props.password}
        required={props.required}
        error={props.error}
        onChange={(i) => props.onPasswordChanged(i.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={onShowPassword}
              onMouseDown={(e) => e.preventDefault()}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={getLabel(props.label, props.required)}
      />
      {props.error && props.helperText && (
        <FormHelperText error id="password-field-error">
          {props.helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}
