import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom'
import {
  validateEmail,
  validatePhone,
  validateUrl,
  validateState,
  validateCountry,
  validateCity,
  validateStreet,
  validateHouseNumber,
  validateZip,
  validateCardTitle,
  validateCardSubtitle,
  validateCardDescription
} from '../../models/validation';
import useAPI, { METHOD } from '../../hooks/useAPI';
import { Typography } from '@mui/material';

const MyCardsNew = () => {
  const { control, handleSubmit, formState: { errors }, setError, clearErrors, reset } = useForm();
  const [data, error, isLoading, apiCall] = useAPI();
  const [successfulRegCreate, setsuccessfulRegCreate] = useState(false);
  const [formError, setFormError] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      setsuccessfulRegCreate(true);
      setTimeout(() => {
        navigate("/myCards")
      }, 2000);
    }
  }, [data, navigate]);

  useEffect(() => {
    if (error) {
      error.includes("Mongoose Error: E11000 duplicate key") ?
        setFormError('This email alrady have been used') : setFormError('Error: Create is failed. Please try again.');
    }
  }, [error]);

  const onSubmit = (data) => {
    if (!data.title
      || !data.subtitle
      || !data.description
      || !data.phone
      || !data.email
      || !data.country
      || !data.city
      || !data.street
      || !data.houseNumber) {
      setFormError('Fill the form');
      return;
    }

    const payload = {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      phone: data.phone,
      email: data.email,
      web: data.web,
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
    apiCall(METHOD.CARDS_CREATE, payload);
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
      case 'title':
        error = validateCardTitle(value);
        break;
      case 'subtitle':
        error = validateCardSubtitle(value);
        break;
      case 'description':
        error = validateCardDescription(value);
        break;
      case 'phone':
        error = validatePhone(value);
        break;
      case 'email':
        error = validateEmail(value);
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
  if (successfulRegCreate) return <div className='successfulMess'>You have successfuly created a new card</div>

  return (
    <div className="my_cards_container">
      <h2>Form to Create New Card</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title *"
                  variant="outlined"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title ? errors.title.message : ''}
                  onBlur={(e) => handleValidation('title', e.target.value)}
                  className="my_input"
                  FormHelperTextProps={{ style: { textAlign: 'center' } }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="subtitle"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Subtitle *"
                  variant="outlined"
                  fullWidth
                  error={!!errors.subtitle}
                  helperText={errors.subtitle ? errors.subtitle.message : ''}
                  onBlur={(e) => handleValidation('subtitle', e.target.value)}
                  className="my_input"
                  FormHelperTextProps={{ style: { textAlign: 'center' } }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description *"
                  variant="outlined"
                  fullWidth
                  error={!!errors.description}
                  helperText={errors.description ? errors.description.message : ''}
                  onBlur={(e) => handleValidation('description', e.target.value)}
                  className="my_input"
                  FormHelperTextProps={{ style: { textAlign: 'center' } }}
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
                  label="Phone*"
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
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email*"
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
                  label="Web"
                  variant="outlined"
                  fullWidth
                  placeholder="https://www.yourwebsite.com"
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
                  placeholder="https://www.yourpicture.jpg"
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
                  label="Country *"
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
          <div className='my_button_container'>
            <button type="submit" disabled={Object.keys(errors).length > 0} className='my_button primary'>Create</button>
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

export default MyCardsNew;
