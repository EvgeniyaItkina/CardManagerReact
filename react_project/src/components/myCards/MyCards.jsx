import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, CardActionArea, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import useAPI, { METHOD } from '../../hooks/useAPI';
import callIcon from '../../images/call.png';
import likeIcon from '../../images/like.png';
import likeRedIcon from '../../images/like_red.png';
import deleteIcon from '../../images/delete_bin.png';
import editIcon from '../../images/edit.png';
import './MyCards.css';
import { useSelector } from 'react-redux';

const API_CASES = {
  BASE_STATE: 'BASE_STATE',
  CARDS_GET_ALL_MY_CARDS: 'CARDS_GET_ALL_MY_CARDS',
  CARDS_LIKE_UNLIKE: 'CARDS_LIKE_UNLIKE'
}

let apiCase = API_CASES.CARDS_GET_ALL_MY_CARDS

const MyCards = ({ searchText }) => {
  const [listOfCards, setListOfCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [data, error, isLoading, apiCall] = useAPI();
  const [showPhone, setShowPhone] = useState({ visible: false, phone: '' });
  const userState = useSelector(store => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    apiCase = API_CASES.CARDS_GET_ALL_MY_CARDS;
    apiCall(METHOD.CARDS_GET_MY_CARDS);
  }, [apiCall]);

  useEffect(() => {
    switch (apiCase) {
      case API_CASES.BASE_STATE:
        break;
      case API_CASES.CARDS_GET_ALL_MY_CARDS:
        if (data) {
          data.forEach((card) => {
            if (userState && card.likes.includes(userState._id)) {
              card.liked = true
            } else {
              card.liked = false;
            }
          })
          setListOfCards(data);
          apiCase = API_CASES.BASE_STATE
        }
        break;
      case API_CASES.CARDS_LIKE_UNLIKE:
        apiCase = API_CASES.CARDS_GET_ALL_MY_CARDS;
        apiCall(METHOD.CARDS_GET_MY_CARDS);
        break;
      default:
        break;
    }
  }, [data, userState, apiCall]);

  useEffect(() => {
    if (searchText) {
      const filtered = listOfCards.filter(card =>
        card.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredCards(filtered);
    } else {
      setFilteredCards(listOfCards);
    }
  }, [searchText, listOfCards]);

  const handleLike = (cardId) => {
    const payload = {
      id: cardId
    }
    apiCase = API_CASES.CARDS_LIKE_UNLIKE;
    apiCall(METHOD.CARDS_LIKE_UNLIKE, payload)
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
    <div className="my_cards_container">
      <h2>My Cards</h2>
      {/* <Button variant="contained" color="primary" component={Link} to="/mycardsnew" className='my_button'>Create New Card</Button> */}
      <button type="button" className="my_button primary" onClick={() => navigate('/mycardsnew')}>
        Create New Card
      </button>
      <Grid container spacing={4} className='my_home_container'>
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
                  <button onClick={() => handleLike(card._id, card)} className="icon-button">
                    <img src={card.liked ? likeRedIcon : likeIcon} alt="Like" />
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
    </div>
  );
};

export default MyCards;
