import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import useAPI, { METHOD } from '../hooks/useAPI';
import './MyCardsDelete.css';

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
    return <div className='successfulDelete'>Your Card successfully deleted</div>
  }

  return (
    <Container className="card-detail-container">
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
        <Button variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
        <Button variant="contained" color="primary" onClick={() => navigate('/myCards')}>Cancel</Button>
      </div>

      {successfulDelete && (
        <div className="successfulDelete">
          <Typography variant="h6">{successfulDelete}</Typography>
        </div>
      )}
    </Container>
  );
};

export default MyCardsDelete;
