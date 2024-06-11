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
import { login } from './UserSlice';
import { useDispatch } from 'react-redux';
import { Typography } from '@mui/material';

const Login = () => {
  const { control, handleSubmit, formState: { errors }, setError, clearErrors, reset } = useForm();
  const [data, error, isLoading, apiCall] = useAPI();
  const [successfulReg, setSuccessfulReg] = useState(false);
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch()


  useEffect(() => {
    if (data) {
      setSuccessfulReg(true);
      dispatch(login(data))
      setTimeout(() => {
        navigate("/")
      }, 2000);
    }
  }, [data, navigate, dispatch]);

  useEffect(() => {
    if (error) {
      setFormError('Error: Incorrect email or password. Please try again.');
    }
  }, [error]);

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
    if (!data.email || !data.password) {
      setFormError('Fill the form');
      return;
    }
    setFormError('');
    const payload = {
      email: data.email,
      password: data.password,
    };
    apiCall(METHOD.USER_LOGIN, payload);
  };

  const closeModal = () => {
    setFormError('');
    reset();
  };
  const handleClear = () => {
    reset();
    clearErrors();
    setFormError('');
  };

  if (isLoading) return <div>Loading...</div>;
  if (successfulReg) {
    return <div className='successfulReg'>You sre successfuly login</div>
  }


  return (
    <div className="login-container">
      <h2>Login</h2>
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
                  FormHelperTextProps={{ style: { textAlign: 'center' } }}
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
                  FormHelperTextProps={{ style: { textAlign: 'center' } }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" disabled={Object.keys(errors).length > 0} className='my_button'>Login</Button>
            <Button type="button" variant="outlined" color="secondary" onClick={handleClear} className='my_button'>Clear</Button>
          </Grid>
        </Grid>
      </form>
      {formError && (
        <div className="error-popup">
          <div className="error-popup-content">
            <Typography variant="h6">{formError}</Typography>
            <Button variant="contained" color="primary" onClick={closeModal}>
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
