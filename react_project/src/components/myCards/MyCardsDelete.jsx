import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardMedia } from '@mui/material';
import useAPI, { METHOD } from '../../hooks/useAPI';

const MyCardsDelete = () => {
  const { cardId } = useParams();
  const [card, setCard] = useState(null);
  const [data, error, isLoading, apiCall] = useAPI();
  const [successfulDelete, setSuccessDelete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    apiCall(METHOD.CARDS_GET_ONE, { id: cardId });
  }, [apiCall, cardId]);

  useEffect(() => {
    if (data) {
      setCard(data);
    }
  }, [data]);

  const handleDelete = async () => {

    await apiCall(METHOD.CARDS_DELETE, { id: cardId })
    setSuccessDelete(true);
    setTimeout(() => {
      navigate('/myCards');
    }, 2000);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!card) return <div>No card details found</div>;
  if (successfulDelete) {
    return <div className='successfulMess'>Your Card successfully deleted</div>
  }

  return (
    <Container className="my_cards_container">
      <Card className="card-detail">
        <CardMedia
          component="img"
          alt={card.image.alt}
          height="300"
          image={card.image.url}
          title={card.title}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {card.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {card.subtitle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {card.description}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Phone: {card.phone}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Email: {card.email}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Website: <a href={card.web} target="_blank" rel="noopener noreferrer">{card.web}</a>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Address: {card.address.city} {card.address.street} {card.address.houseNumber}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Card Number: {card.bizNumber}
          </Typography>
        </CardContent>
      </Card>
      <div className="delete-confirmation">
        <Typography variant="h6">Are you sure you want to delete this card?</Typography>
        <div className='my_button_container'>
          <button type="submit" onClick={handleDelete} className='my_button primary'>Delete</button>
          <button type="button" onClick={() => navigate('/myCards')} className='my_button secondary'>Cancel</button>
        </div>

      </div>

      {successfulDelete && (
        <div className="successfulMess">
          <Typography variant="h6">{successfulDelete}</Typography>
        </div>
      )}
    </Container>
  );
};

export default MyCardsDelete;
