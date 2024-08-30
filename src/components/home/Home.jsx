import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, CardActionArea, Button } from '@mui/material';
import useAPI, { METHOD } from '../../hooks/useAPI';
import './Home.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import callIcon from '../../images/call.png';
import likeIcon from '../../images/like.png';
import likeRedIcon from '../../images/like_red.png';
import deleteIcon from '../../images/delete_bin.png';

const API_CASES = {
  BASE_STATE: 'BASE_STATE',
  CARDS_GET_ALL: 'CARDS_GET_ALL',
  CARDS_LIKE_UNLIKE: 'CARDS_LIKE_UNLIKE'
}

let apiCase = API_CASES.CARDS_GET_ALL

const Home = ({ searchText }) => {
  const [listOfCards, setListOfCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [data, error, isLoading, apiCall] = useAPI();
  const [showPhone, setShowPhone] = useState({ visible: false, phone: '' });
  const userState = useSelector(store => store.user);

  useEffect(() => {
    apiCase = API_CASES.CARDS_GET_ALL;
    apiCall(METHOD.CARDS_GET_ALL);
  }, [apiCall]);

  useEffect(() => {
    switch (apiCase) {
      case API_CASES.BASE_STATE:
        break;
      case API_CASES.CARDS_GET_ALL:
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
        apiCase = API_CASES.CARDS_GET_ALL;
        apiCall(METHOD.CARDS_GET_ALL);
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
  if (listOfCards.length < 1) return <div>No results found</div>;

  return (
    <div className='my_container'>
      <h2> Home Page </h2>
      <Grid container spacing={4}>
        {filteredCards.map((card) => (
          <Grid item key={card._id} xs={12} sm={6} md={4} lg={3}>
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
                  <Typography gutterBottom variant="h5" component="div"
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary"
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
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
                {userState && userState.isAdmin &&
                  <Link to={`/mycardsdelete/${card._id}`}>
                    <button className="icon-button">
                      <img src={deleteIcon} alt="Delete" />
                    </button>
                  </Link>
                }
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

export default Home;
