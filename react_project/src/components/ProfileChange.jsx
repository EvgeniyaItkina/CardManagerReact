import '../components/registration/Registration.css';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom'
import {
  validateName,
  validateEmail,
  validatePhone,
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
import { useSelector } from 'react-redux';


const ProfileChange = () => {
  const { control, handleSubmit, formState: { errors }, setError, clearErrors, reset, setValue } = useForm();
  const [data, error, isLoading, apiCall] = useAPI();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const navigate = useNavigate()
  const userState = useSelector(store => store.user)

  useEffect(() => {
    apiCall(METHOD.USERS_GET_ONE, { id: userState._id });
  }, [apiCall, userState._id]);

  useEffect(() => {
    if (data) {
      setValue('firstName', data.name.first);
      setValue('lastName', data.name.last);
      setValue('middleName', data.name.middle);
      setValue('phone', data.phone);
      setValue('imageUrl', data.image.url);
      setValue('state', data.address.state);
      setValue('country', data.address.country);
      setValue('city', data.address.city);
      setValue('street', data.address.street);
      setValue('houseNumber', data.address.houseNumber);
      setValue('zip', data.address.zip);
      setValue('isBusiness', data.isBusiness)
    }
  }, [data, setValue]);

  let isBusiness = false
  if (data && data.isBusiness) {
    isBusiness = true
  }

  useEffect(() => {
    if (error) {
      const errorMessage = error.response?.data?.message || 'Error: Registration failed. Please try again.';
      setFormError(errorMessage);
    }
  }, [error]);

  const onSubmit = async (data) => {
    if (!data.firstName
      || !data.lastName
      || !data.phone
      || !data.country
      || !data.city
      || !data.street
      || !data.houseNumber) {
      setFormError('Fill the form');
      return;
    }

    const payload = {
      id: userState._id,
      name: {
        first: data.firstName,
        middle: data.middleName,
        last: data.lastName
      },
      phone: data.phone,
      email: data.email,
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
    }
    await apiCall(METHOD.USERS_UPDATE, payload);
    setUpdateSuccess(true);
    setTimeout(() => {
      navigate("/myCards");
    }, 2000);

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
  if (updateSuccess) return <div className='successfulMess'>You are successfuly update your profile</div>

  return (
    <div className="registration-container">
      <h2>Change your Profile</h2>
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
          <div>
            {isBusiness ? 'Business' : 'not Business'}
          </div>

          <div className='my_button_container'>
            <button type="submit" disabled={Object.keys(errors).length > 0} className='my_button primary'>UpDate Profile</button>
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

export default ProfileChange;
