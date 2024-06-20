import { Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import likeIcon from '../images/like.png';
import aboutIcon from '../images/about.png';
import my_cardsIcon from '../images/my_cards.png';
import './Footer.css';

let footer_icons = [
  { name: 'About', path: '/about', icon: aboutIcon },
]
const Footer = () => {
  const userState = useSelector(store => store.user)

  if (userState) {
    if (userState.isBusiness) {
      footer_icons = [
        { name: 'About', path: '/about', icon: aboutIcon },
        { name: 'Fav Cards', path: '/favCards', icon: likeIcon },
        { name: 'My Cards', path: '/myCards', icon: my_cardsIcon },
      ];
    } else {
      footer_icons = [
        { name: 'About', path: '/about', icon: aboutIcon },
        { name: 'Fav Cards', path: '/favCards', icon: likeIcon },
      ];
    }

    if (userState.isAdmin) {
      footer_icons = [
        { name: 'About', path: '/about', icon: aboutIcon },
        { name: 'Fav Cards', path: '/favCards', icon: likeIcon },
        { name: 'My Cards', path: '/myCards', icon: my_cardsIcon },
        { name: 'CRM', path: '/CRM', /* icon: crmIcon */ }
      ];
    }

  } else {
    footer_icons = [
      { name: 'About', path: '/about', icon: aboutIcon },
    ];
  }

  return (
    <footer>
      <div className="footer-icons">
        {footer_icons.map((footer_icon) => (
          <Link key={footer_icon.name} to={footer_icon.path} className="footer-icon-item">
            <Typography textAlign="center">{footer_icon.name}</Typography>
            <img src={footer_icon.icon} alt={`${footer_icon.name} icon`} />
          </Link>
        ))}
      </div>
    </footer>
  )
}
export default Footer
