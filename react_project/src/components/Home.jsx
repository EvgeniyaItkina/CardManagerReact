import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./Home.css"

/* function ContainerExample() {
  return (
    <Container>
      <Row>
        <Col>1 of 1</Col>
      </Row>
    </Container>
  );
}

export default ContainerExample; */

const Home = () => {
  const [cards, setCards] = useState([])

  const listOfCards = [
    {
      "_id": "6601941691640a0b5122cdd5",
      "title": "testnataly11",
      "subtitle": "testnataly1000",
      "description": "testnataly1000",
      "phone": "0500000000",
      "email": "testnataly1000@mail.cpm",
      "web": "https://www.testnataly1000.com",
      "image": {
        "url": "https://images.unsplash.com/photo-1573847792062-9292df56ebb4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=m3wxmja3fdb8mhxzzwfyy2h8mjb8fhbpy3xlbnwwfhwwfhx8ma%3d%3d",
        "alt": "business card image",
        "_id": "66450819f9d3ea58f6e861b0"
      },
      "address": {
        "state": "hbj",
        "country": "testnataly1000",
        "city": "testnataly1000",
        "street": "testnataly1000",
        "houseNumber": 12,
        "zip": 1212121,
        "_id": "66450819f9d3ea58f6e861b1"
      },
      "bizNumber": 5961227,
      "likes": [
        "65fc06e7cb7aa60febcced58",
      ],
      "user_id": "65f5597d5aabf0bc85194dce",
      "createdAt": "2024-03-25T15:11:18.853Z",
      "__v": 1404
    }, {
      "_id": "660194ef91640a0b5122ce0a",
      "title": "gadi",
      "subtitle": "gadi1",
      "description": "gadi",
      "phone": "050-0000000",
      "email": "natalyyy@gmail.com",
      "web": "https://www.test.com",
      "image": {
        "url": "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
        "alt": "nataly",
        "_id": "664e740900b4d006b40f1230"
      },
      "address": {
        "state": "nataly",
        "country": "nataly",
        "city": "nataly",
        "street": "nataly",
        "houseNumber": 121,
        "zip": 1212121,
        "_id": "664e740900b4d006b40f1231"
      },
      "bizNumber": 5427643,
      "likes": [
        "65fc1706794d54d12ca949a7",
      ],
      "user_id": "65f5597d5aabf0bc85194dce",
      "createdAt": "2024-03-25T15:14:55.092Z",
      "__v": 843
    }, {
      "_id": "660194ef91640a0b5122ce0a",
      "title": "gadi",
      "subtitle": "gadi1",
      "description": "gadi",
      "phone": "050-0000000",
      "email": "natalyyy@gmail.com",
      "web": "https://www.test.com",
      "image": {
        "url": "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
        "alt": "nataly",
        "_id": "664e740900b4d006b40f1230"
      },
      "address": {
        "state": "nataly",
        "country": "nataly",
        "city": "nataly",
        "street": "nataly",
        "houseNumber": 121,
        "zip": 1212121,
        "_id": "664e740900b4d006b40f1231"
      },
      "bizNumber": 5427643,
      "likes": [
        "65fc1706794d54d12ca949a7",
      ],
      "user_id": "65f5597d5aabf0bc85194dce",
      "createdAt": "2024-03-25T15:14:55.092Z",
      "__v": 843
    }, {
      "_id": "660194ef91640a0b5122ce0a",
      "title": "gadi",
      "subtitle": "gadi1",
      "description": "gadi",
      "phone": "050-0000000",
      "email": "natalyyy@gmail.com",
      "web": "https://www.test.com",
      "image": {
        "url": "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
        "alt": "nataly",
        "_id": "664e740900b4d006b40f1230"
      },
      "address": {
        "state": "nataly",
        "country": "nataly",
        "city": "nataly",
        "street": "nataly",
        "houseNumber": 121,
        "zip": 1212121,
        "_id": "664e740900b4d006b40f1231"
      },
      "bizNumber": 5427643,
      "likes": [
        "65fc1706794d54d12ca949a7",
      ],
      "user_id": "65f5597d5aabf0bc85194dce",
      "createdAt": "2024-03-25T15:14:55.092Z",
      "__v": 843
    }];

  return (
    <Container>
      <h1>Home Page</h1>
      <Row className="card-container">
        {listOfCards.map((card) => (
          <Col key={card._id} md={4} className="mb-4">
            <Card className="card-item">
              <Card.Img variant="top" src={card.image.url} />
              <Card.Body className="card-body-flex">
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.subtitle}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item className='my_card_label'>Phone: {card.phone}</ListGroup.Item>
                <ListGroup.Item className='my_card_label'>Address: {card.address.city + " " + card.address.houseNumber}</ListGroup.Item>
                <ListGroup.Item className='my_card_label'>Card Number: {card.bizNumber}</ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )

}

export default Home
