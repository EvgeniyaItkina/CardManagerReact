import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, CardActionArea, Button } from '@mui/material';
import useAPI, { METHOD } from '../hooks/useAPI';
import './Home.css';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import callIcon from '../images/call.png';
import likeIcon from '../images/like.png';
import likeRedIcon from '../images/like_red.png';


const Home = ({ searchText }) => {
  const [listOfCards, setListOfCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [likedCards, setLikedCards] = useState([]);
  const [data, error, isLoading, apiCall] = useAPI();
  const [showPhone, setShowPhone] = useState({ visible: false, phone: '' });
  const userState = useSelector(store => store.user);

  useEffect(() => {
    apiCall(METHOD.CARDS_GET_ALL);
  }, [apiCall]);

  useEffect(() => {
    if (data) {
      console.log(data);
      setListOfCards(data);
    }
  }, [data]);

  useEffect(() => {
    if (searchText && typeof searchText === 'string') {
      const filtered = listOfCards.filter(card =>
        card.title.toLowerCase().includes(searchText.toLowerCase()) /* ||
        card.subtitle.toLowerCase().includes(searchText.toLowerCase()) ||
        card.description.toLowerCase().includes(searchText.toLowerCase()) */
      );
      setFilteredCards(filtered);
    } else {
      setFilteredCards(listOfCards);
    }
  }, [searchText, listOfCards]);

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
  if (listOfCards.length < 1) return <div>No results found</div>;

  return (
    <Container className='my_container'>
      <Typography variant="h4" gutterBottom >
        Home Page
      </Typography>
      <Grid container spacing={4}>
        {filteredCards.map((card) => (
          <Grid item key={card._id} xs={12} sm={6} md={4}>
            <Card className="card-item">
              <CardActionArea component={Link} to={`/cardview/${card._id}`}>
                <CardMedia
                  component="img"
                  alt={card.image.alt}
                  height="200"
                  image={card.image.url}
                  title={card.title}
                />

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {card.subtitle}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Phone: {card.phone}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Address: {card.address.city} {card.address.houseNumber}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Card Number: {card.bizNumber}
                  </Typography>
                </CardContent>
              </CardActionArea>

              <div className="card-actions">
                <button onClick={() => handleShowPhone(card.phone)} className="icon-button">
                  <img src={callIcon} alt="Call" />
                </button>
                {userState && (
                  <button onClick={() => handleLike(card._id)} className="icon-button">
                    <img src={likedCards.includes(card._id) ? likeRedIcon : likeIcon} alt="Like" />
                  </button>
                )}

              </div>

            </Card>
          </Grid>
        ))}
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

export default Home;
