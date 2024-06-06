import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAPI, { METHOD } from '../hooks/useAPI';
import callIcon from '../images/call.png';
import likeIcon from '../images/like.png';
/* import likeRedIcon from '../images/like_red.png'; */
import deleteIcon from '../images/delete_bin.png';
import editIcon from '../images/edit.png';
import './MyCards.css';

const MyCards = () => {
  const [cards, setCards] = useState([]);
  const [data, error, isLoading, apiCall] = useAPI();
  const userState = useSelector(store => store.user);

  useEffect(() => {
    apiCall(METHOD.CARDS_GET_ALL);
  }, [apiCall]);

  useEffect(() => {
    if (data) {
      const userCards = data.filter(card => card.user_id === userState.id);
      setCards(userCards);
    }
  }, [data, userState.id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container className="my_cards_container">
      <Typography variant="h4" gutterBottom>My Cards</Typography>
      <Button variant="contained" color="primary" component={Link} to="/mycardsnew">Create New Card</Button>
      <Grid container spacing={4}>
        {cards.map(card => (
          <Grid item key={card._id} xs={12} sm={6} md={4}>
            <div className="card-item">
              <div className="card-header">
                <Typography variant="h5">{card.title}</Typography>
                <div className="card-actions">
                  <IconButton component={Link} to={`/mycardsedit/${card._id}`}>
                    <img src={editIcon} alt="Edit" />
                  </IconButton>
                  <IconButton component={Link} to={`/mycardsdelete/${card._id}`}>
                    <img src={deleteIcon} alt="Delete" />
                  </IconButton>
                </div>
              </div>
              <div className="card-body">
                <Typography>{card.subtitle}</Typography>
                <Typography>{card.phone}</Typography>
              </div>
              <div className="card-footer">
                <IconButton>
                  <img src={callIcon} alt="Call" />
                </IconButton>
                <IconButton>
                  <img src={likeIcon} alt="Like" />
                </IconButton>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyCards;
