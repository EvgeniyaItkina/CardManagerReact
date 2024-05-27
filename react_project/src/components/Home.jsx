import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import useAPI, { METHOD } from '../hooks/useAPI';
import './Home.css';


const Home = () => {
  const [listOfCards, setListOfCards] = useState([]);
  const [data, error, isLoading, apiCall] = useAPI();

  useEffect(() => {
    apiCall(METHOD.CARDS_GET_ALL);
  }, [apiCall]);

  useEffect(() => {
    if (data) {
      console.log(data);
      setListOfCards(data);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (listOfCards.length < 1) return <div>No results found</div>;

  return (
    <Container className='my_container'>
      <Typography variant="h4" gutterBottom >
        Home Page
      </Typography>
      <Grid container spacing={4}>
        {listOfCards.map((card) => (
          <Grid item key={card._id} xs={12} sm={6} md={4}>
            <Card className="card-item">
              <CardActionArea>
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
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
