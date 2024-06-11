import './MyCardsNew.css';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useNavigate, useParams } from 'react-router-dom';
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
} from '../models/validation';
import useAPI, { METHOD } from '../hooks/useAPI';
import { Typography } from '@mui/material';

const MyCardsEdit = () => {
  const { cardId } = useParams();
  const { control, handleSubmit, formState: { errors }, setError, clearErrors, reset, setValue } = useForm();
  const [data, error, isLoading, apiCall] = useAPI();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    apiCall(METHOD.CARDS_GET_ONE, { id: cardId });
  }, [apiCall, cardId]);

  useEffect(() => {
    if (data) {
      setValue('title', data.title);
      setValue('subtitle', data.subtitle);
      setValue('description', data.description);
      setValue('phone', data.phone);
      setValue('email', data.email);
      setValue('web', data.web);
      setValue('imageUrl', data.image.url);
      setValue('state', data.address.state);
      setValue('country', data.address.country);
      setValue('city', data.address.city);
      setValue('street', data.address.street);
      setValue('houseNumber', data.address.houseNumber);
      setValue('zip', data.address.zip);
    }
  }, [data, setValue]);

  useEffect(() => {
    if (error) {
      const errorMessage = error.response?.data?.message || 'Error: Update failed. Please try again.';
      setFormError(errorMessage);
    }
  }, [error]);

  const onSubmit = (data) => {
    if (!data.title || !data.subtitle || !data.description || !data.phone ||
      !data.email || !data.country || !data.city || !data.street || !data.houseNumber) {
      setFormError('Fill the form');
      return;
    }

    const payload = {
      id: cardId,
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
      }
    };
    const token = localStorage.getItem('token');
    const header = {
      headers: {
        'x-auth-token': token,
      }
    };

    apiCall(METHOD.CARDS_UPDATE, { id: cardId, ...payload }, header).then(() => {
      setUpdateSuccess(true);
      setTimeout(() => {
        navigate("/myCards");
      }, 2000);
    });
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
  if (updateSuccess) return <div className='successfulRegCreate'>Your card has been successfully updated</div>;

  return (
    <div className="myCardsNew-container">
      <h2>Form to Edit Card</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='my_registration_container'>
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
              name="web"
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

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" disabled={Object.keys(errors).length > 0} className='my_button'>UpDate</Button>
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

export default MyCardsEdit
