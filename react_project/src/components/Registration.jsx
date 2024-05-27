import './Registration.css';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  validateName,
  validateEmail,
  validatePhone,
  validatePassword,
  validateUrl,
  validateAddressField,
  validateHouseNumber,
  validateZip,
  validateBoolean
} from '../models/validation';

const RegisterForm = () => {
  const { control, handleSubmit, formState: { errors }, setError, clearErrors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
      case 'country':
      case 'city':
      case 'street':
        error = validateAddressField(value);
        break;
      case 'houseNumber':
        error = validateHouseNumber(value);
        break;
      case 'zip':
        error = validateZip(value);
        break;
      case 'isBusiness':
        error = validateBoolean(value);
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

  return (
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
                label="First Name"
                variant="outlined"
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName ? errors.firstName.message : ''}
                onBlur={(e) => handleValidation('firstName', e.target.value)}
                className="my_input"
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
                label="Last Name"
                variant="outlined"
                fullWidth
                error={!!errors.lastName}
                helperText={errors.lastName ? errors.lastName.message : ''}
                onBlur={(e) => handleValidation('lastName', e.target.value)}
                className="my_input"
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
                label="Email"
                variant="outlined"
                fullWidth
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
                onBlur={(e) => handleValidation('email', e.target.value)}
                className="my_input"
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
                label="Phone"
                variant="outlined"
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone ? errors.phone.message : ''}
                onBlur={(e) => handleValidation('phone', e.target.value)}
                className="my_input"
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
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
                onBlur={(e) => handleValidation('password', e.target.value)}
                className="my_input"
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
                label="Country"
                variant="outlined"
                fullWidth
                error={!!errors.country}
                helperText={errors.country ? errors.country.message : ''}
                onBlur={(e) => handleValidation('country', e.target.value)}
                className="my_input"
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
                label="City"
                variant="outlined"
                fullWidth
                error={!!errors.city}
                helperText={errors.city ? errors.city.message : ''}
                onBlur={(e) => handleValidation('city', e.target.value)}
                className="my_input"
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
                label="Street"
                variant="outlined"
                fullWidth
                error={!!errors.street}
                helperText={errors.street ? errors.street.message : ''}
                onBlur={(e) => handleValidation('street', e.target.value)}
                className="my_input"
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
                label="House Number"
                variant="outlined"
                fullWidth
                error={!!errors.houseNumber}
                helperText={errors.houseNumber ? errors.houseNumber.message : ''}
                onBlur={(e) => handleValidation('houseNumber', e.target.value)}
                className="my_input"
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
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" className='my_button'>Create</Button>
          <Button type="button" variant="outlined" color="secondary" className='my_button'>Cancel</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default RegisterForm;
