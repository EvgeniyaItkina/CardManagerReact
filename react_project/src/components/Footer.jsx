import { MenuItem, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

let footer_icons = [
  { name: 'About', path: '/about' },

]
const Footer = () => {
  const userState = useSelector(store => store.user)


  if (userState) {
    if (userState.isBusiness) {
      footer_icons = [
        { name: 'About', path: '/about' },
        { name: 'Fav Cards', path: '/favCards' },
        { name: 'My Cards', path: '/myCards' },
      ];
    } else {
      footer_icons = [
        { name: 'About', path: '/about' },
        { name: 'Fav Cards', path: '/favCards' },
      ];
    }

    if (userState.isAdmin) {
      footer_icons = [
        { name: 'About', path: '/about' },
        { name: 'Fav Cards', path: '/favCards' },
        { name: 'My Cards', path: '/myCards' },
        { name: 'CRM', path: '/CRM' }
      ];
    }

  } else {
    footer_icons = [
      { name: 'About', path: '/about' },
    ];
  }


  return (
    <div>
      {footer_icons.map((footer_icon) => (
        <MenuItem key={footer_icon.name} component={Link} to={footer_icon.path}>
          <Typography textAlign="center">{footer_icon.name}</Typography>
        </MenuItem>
      ))}
    </div>
  )
}

export default Footer
