import './Login.css';
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import {
  validateEmail,
  validatePassword
} from '../models/validation';
import useAPI, { METHOD } from '../hooks/useAPI';

const Login = () => {
  const { control, handleSubmit, formState: { errors }, setError, clearErrors, reset } = useForm();
  const [data, error, isLoading, apiCall] = useAPI();
  const [successfulReg, setSuccessfulReg] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      console.log("login data:", data);
      // Handle successful login
      setSuccessfulReg(true);
      navigate("/");
    }
  }, [data, navigate]);

  const handleValidation = (name, value) => {
    let error = '';
    switch (name) {
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      default:
        break;
    }
    if (error) {
      setError(name, { type: 'manual', message: error });
    } else {
      clearErrors(name);
    }
  };

  const onSubmit = (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    };
    apiCall(METHOD.USER_LOGIN, payload);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (successfulReg) return <div className='successfulReg'>You sre successfuly login</div>

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='my_login_container'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message || ''}
                onBlur={(e) => handleValidation('email', e.target.value)}
                className="my_input"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message || ''}
                onBlur={(e) => handleValidation('password', e.target.value)}
                className="my_input"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" disabled={Object.keys(errors).length > 0} className='my_button'>Login</Button>
          <Button type="button" variant="outlined" color="secondary" onClick={reset} className='my_button'>Clear</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Login;
