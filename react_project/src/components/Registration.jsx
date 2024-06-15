import './Registration.css';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from 'react-router-dom'
import {
  validateName,
  validateEmail,
  validatePhone,
  validatePassword,
  validateUrl,
  validateState,
  validateCountry,
  validateCity,
  validateStreet,
  validateHouseNumber,
  validateZip
} from '../models/validation';
import useAPI, { METHOD } from '../hooks/useAPI';
import { Typography } from '@mui/material';


const RegisterForm = () => {
  const { control, handleSubmit, formState: { errors }, setError, clearErrors, reset } = useForm();
  const [data, error, isLoading, apiCall] = useAPI();
  const [successfulReg, setSuccessfulReg] = useState(false);
  const [formError, setFormError] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      console.log("registration data:", data);
      setSuccessfulReg(true);
      setTimeout(() => {
        navigate("/")
      }, 2000);
      //navigation to page Home;
    }
  }, [data, navigate]);

  useEffect(() => {
    if (error) {
      const errorMessage = error.response?.data?.message || 'Error: Registration failed. Please try again.';
      setFormError(errorMessage);
    }
  }, [error]);


  const onSubmit = (data) => {
    if (!data.firstName
      || !data.lastName
      || !data.email
      || !data.phone
      || !data.password
      || !data.country
      || !data.city
      || !data.street
      || !data.houseNumber) {
      setFormError('Fill the form');
      return;
    }

    const payload = {
      name: {
        first: data.firstName,
        middle: data.middleName,
        last: data.lastName
      },
      phone: data.phone,
      email: data.email,
      password: data.password,
      image: {
        url: data.imageUrl,
        alt: "card picture"
      },
      address: {
        state: data.state,
        country: data.country,
        city: data.city,
        street: data.street,
        houseNumber: data.houseNumber,
        zip: data.zip
      },
      isBusiness: data.isBusiness,
    }
    apiCall(METHOD.USER_REGISTER, payload);

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

  const handleValidation = (name, value) => {
    let error = '';
    switch (name) {
      case 'firstName':
      case 'lastName':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'phone':
        error = validatePhone(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      case 'imageUrl':
        error = validateUrl(value);
        break;
      case 'state':
        error = validateState(value);
        break;
      case 'country':
        error = validateCountry(value);
        break;
      case 'city':
        error = validateCity(value);
        break;
      case 'street':
        error = validateStreet(value);
        break;
      case 'houseNumber':
        error = validateHouseNumber(value);
        break;
      case 'zip':
        error = validateZip(value);
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

  if (isLoading) return <div>Loading...</div>;
  if (successfulReg) return <div className='successfulMess'>You sre successfuly registratied. You need to Login!</div>

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='my_registration_container'>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name *"
                  variant="outlined"
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName ? errors.firstName.message : ''}
                  onBlur={(e) => handleValidation('firstName', e.target.value)}
                  className="my_input"
                  FormHelperTextProps={{ style: { textAlign: 'center' } }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name *"
                  variant="outlined"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName ? errors.lastName.message : ''}
                  onBlur={(e) => handleValidation('lastName', e.target.value)}
                  className="my_input"
                  FormHelperTextProps={{ style: { textAlign: 'center' } }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email *"
                  variant="outlined"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                  onBlur={(e) => handleValidation('email', e.target.value)}
                  className="my_input"
                  FormHelperTextProps={{ style: { textAlign: 'center' } }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="middleName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Middle Name"
                  variant="outlined"
                  fullWidth
                  className="my_input"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone *"
                  variant="outlined"
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone ? errors.phone.message : ''}
                  onBlur={(e) => handleValidation('phone', e.target.value)}
                  className="my_input"
                  FormHelperTextProps={{ style: { textAlign: 'center' } }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password *"
                  type="password"
                  variant="outlined"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                  onBlur={(e) => handleValidation('password', e.target.value)}
                  className="my_input"
                  FormHelperTextProps={{ style: { textAlign: 'center' } }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="imageUrl"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Image URL"
                  variant="outlined"
                  fullWidth
                  error={!!errors.imageUrl}
                  helperText={errors.imageUrl ? errors.imageUrl.message : ''}
                  onBlur={(e) => handleValidation('imageUrl', e.target.value)}
                  className="my_input"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="state"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="State"
                  variant="outlined"
                  fullWidth
                  error={!!errors.state}
                  helperText={errors.state ? errors.state.message : ''}
                  onBlur={(e) => handleValidation('state', e.target.value)}
                  className="my_input"
                  FormHelperTextProps={{ style: { textAlign: 'center' } }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="country"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Country  *"
                  variant="outlined"
                  fullWidth
                  error={!!errors.country}
                  helperText={errors.country ? errors.country.message : ''}
                  onBlur={(e) => handleValidation('country', e.target.value)}
                  className="my_input"
                  FormHelperTextProps={{ style: { textAlign: 'center' } }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="City *"
                  variant="outlined"
                  fullWidth
                  error={!!errors.city}
                  helperText={errors.city ? errors.city.message : ''}
                  onBlur={(e) => handleValidation('city', e.target.value)}
                  className="my_input"
                  FormHelperTextProps={{ style: { textAlign: 'center' } }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="street"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Street *"
                  variant="outlined"
                  fullWidth
                  error={!!errors.street}
                  helperText={errors.street ? errors.street.message : ''}
                  onBlur={(e) => handleValidation('street', e.target.value)}
                  className="my_input"
                  FormHelperTextProps={{ style: { textAlign: 'center' } }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="houseNumber"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="House Number *"
                  variant="outlined"
                  fullWidth
                  error={!!errors.houseNumber}
                  helperText={errors.houseNumber ? errors.houseNumber.message : ''}
                  onBlur={(e) => handleValidation('houseNumber', e.target.value)}
                  className="my_input"
                  FormHelperTextProps={{ style: { textAlign: 'center' } }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="zip"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="ZIP Code"
                  variant="outlined"
                  fullWidth
                  error={!!errors.zip}
                  helperText={errors.zip ? errors.zip.message : ''}
                  onBlur={(e) => handleValidation('zip', e.target.value)}
                  className="my_input"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="isBusiness"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      color="primary"
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                        handleValidation('isBusiness', e.target.checked);
                      }}
                    />
                  }
                  label="Is Business"
                  className="my_checkbox"
                />
              )}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" disabled={Object.keys(errors).length > 0} className='my_button'>Create</Button>
            <Button type="button" variant="outlined" color="secondary" onClick={handleClear} className='my_button'>Clear</Button>
          </Grid> */}

          <div className='my_button_container'>
            <button type="submit" disabled={Object.keys(errors).length > 0} className='my_button primary'>Registration</button>
            <button type="button" onClick={handleClear} className='my_button secondary'>Clear</button>
          </div>

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

export default RegisterForm;
