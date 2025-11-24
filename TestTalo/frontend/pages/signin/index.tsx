import React, { Component, useState } from "react";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";

export default function Signin() {
  let [state, setState] = useState({
    email: "",
    password: ""
  });

  let [showPassword, setShowPassword] = useState(false);

  const handleChange = e => {
    setState({...state, [e.currentTarget.id]: e.currentTarget.value} );
  };

  const handleSubmit = e => {
    state.password
    state.email
  }

    return (
      <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <form className="form" action="/catalogo" onSubmit={handleSubmit}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                <InputLabel htmlFor="">Email</InputLabel>
                <Input
                    id="filled-adornment-password"
                    type={'text'}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                <Input
                    id="filled-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={handleChange}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={e => setShowPassword(!showPassword)}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                <Button type="submit" variant="contained">
                    Ingresar
                </Button>
            </FormControl>
        </form>
        </Box>
      </>
    );
}