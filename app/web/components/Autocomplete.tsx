import {
  Autocomplete as MuiAutocomplete,
  AutocompleteProps as MuiAutocompleteProps,
} from "@mui/material";
import classNames from "classnames";
import React from "react";
import makeStyles from "utils/makeStyles";

import TextField from "./TextField";

const useStyles = makeStyles({
  root: {
    display: "block",
  },
});

export type AutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> = Omit<
  MuiAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
  "renderInput"
> & {
  id: string;
  error?: string;
  endAdornment?: React.ReactNode;
  label?: string;
  placeholder?: string;
  helperText?: string;
  variant?: "filled" | "standard" | "outlined" | undefined;
};

export default function Autocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>({
  className,
  error,
  helperText,
  id,
  label,
  placeholder,
  variant = "standard",
  endAdornment,
  ...otherProps
}: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) {
  const classes = useStyles();

  return (
    <MuiAutocomplete
      {...otherProps}
      options={otherProps.options}
      className={classNames(classes.root, className)}
      id={id}
      renderInput={(params) => (
        <TextField
          {...params}
          variant={variant}
          error={!!error}
          label={label}
          placeholder={placeholder}
          helperText={error || helperText}
          slotProps={{
            input: endAdornment
              ? {
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {params.InputProps.endAdornment}
                      {endAdornment}
                    </>
                  ),
                }
              : params.InputProps,
          }}
        />
      )}
    ></MuiAutocomplete>
  );
}
