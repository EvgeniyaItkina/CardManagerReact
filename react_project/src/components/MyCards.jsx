import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, IconButton, Button, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import useAPI, { METHOD } from '../hooks/useAPI';
import callIcon from '../images/call.png';
import likeIcon from '../images/like.png';
import likeRedIcon from '../images/like_red.png';
import deleteIcon from '../images/delete_bin.png';
import editIcon from '../images/edit.png';
import './MyCards.css';
import { useSelector } from 'react-redux';

const MyCards = () => {
  const [cards, setCards] = useState([]);
  const [data, error, isLoading, apiCall] = useAPI();
  const [showPhone, setShowPhone] = useState({ visible: false, phone: '' });
  const [likedCards, setLikedCards] = useState([]);
  const userState = useSelector(store => store.user);

  console.log("MyCards useAPI", data);

  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      const header = {
        headers: {
          'x-auth-token': token,
        }
      };
      apiCall(METHOD.CARDS_GET_MY_CARDS, {}, header);
    }
  }, [token, apiCall]);

  useEffect(() => {
    if (data) {
      setCards(data);
    }
  }, [data]);

  const handleLike = (cardId) => {
    setLikedCards(prevLikedCards => {
      if (prevLikedCards.includes(cardId)) {
        return prevLikedCards.filter(id => id !== cardId);
      } else {
        return [...prevLikedCards, cardId];
      }
    });
  };

  const handleShowPhone = (phone) => {
    setShowPhone({ visible: true, phone });
  };

  const handleClosePhone = () => {
    setShowPhone({ visible: false, phone: '' });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container className="my_cards_container">
      <h2>My Cards</h2>
      <Button variant="contained" color="primary" component={Link} to="/mycardsnew">Create New Card</Button>
      <Grid container spacing={4} className="my_cards_grid" >
        {cards && cards.length > 0 ? (
          cards.map(card => (
            <Grid item key={card._id} xs={12} sm={6} md={4}>
              <div className="card-item">
                <CardMedia
                  component="img"
                  alt={card.image.alt}
                  height="200"
                  image={card.image.url}
                  title={card.title}
                />
                <div className="card-header">
                  <Typography variant="h5">{card.title}</Typography>
                </div>
                <div className="card-body">
                  <Typography>{card.subtitle}</Typography>
                  <Typography>{card.phone}</Typography>
                </div>
                <div className="card-footer">
                  <div className="card-actions">
                    <button onClick={() => handleShowPhone(card.phone)} className="icon-button">
                      <img src={callIcon} alt="Call" />
                    </button>
                    {userState && (
                      <button onClick={() => handleLike(card._id)} className="icon-button">
                        <img src={likedCards.includes(card._id) ? likeRedIcon : likeIcon} alt="Like" />
                      </button>
                    )}
                    <Link to={`/mycardsedit/${card._id}`}>
                      <button className="icon-button">
                        <img src={editIcon} alt="Edit" />
                      </button>
                    </Link>
                    <Link to={`/mycardsdelete/${card._id}`}>
                      <button className="icon-button">
                        <img src={deleteIcon} alt="Delete" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </Grid>
          ))
        ) : (
          <Typography>No cards found</Typography>
        )}
      </Grid>
      {showPhone.visible && (
        <div className="phone-popup">
          <div className="phone-popup-content">
            <Typography variant="h6">Phone: {showPhone.phone}</Typography>
            <Button variant="contained" color="secondary" onClick={handleClosePhone}>
              Close
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default MyCards;
