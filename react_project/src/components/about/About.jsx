import React from 'react';
import './About.css';
import exampleCard from '../../images/exampleCard.png';

const About = () => {
  return (
    <div>
      <div className='about_welcome'>
        <h2>About Us</h2>
        <p>
          Welcome to Our Business Card Management Site! <br />
          Our platform is designed to help you manage and store business cards effortlessly. <br />
          Whether it's for individuals or companies, our site offers a convenient way to keep track of useful contacts, favorite businesses, and more. Perfect for those who value staying connected with professionals like plumbers, doctors, hairdressers, or favorite stores like Zara, SuperSal, and Gali.
        </p>
      </div>
      <div className="about-container">
        <div className="about-text">
          <p>
            <h3>How It Works:</h3>
            1. <strong>Registration:</strong> Start by creating an account with your email and password.
            <br />
            2. <strong>Login:</strong> Access your account to begin using the site.
            <br />
            3. <strong>Explore or Create:</strong> Choose from an existing list of registered companies or create your own cards.
            <br />
            4. <strong>Favorite Cards:</strong> Mark the contacts or companies you frequently use as favorites for easy access.
          </p>
          <p>
            <h3>Why Choose Us?</h3>
            Our friendly and intuitive interface makes it easy for anyone to manage their contacts. This site was created as an educational project but is designed to be practical and useful in everyday life.
          </p>
          <p>
            <h3>Navigation:</h3>
            <a href="/">Home</a>
            <br />
            <a href="/login">Login</a>
            <br />
            <a href="/registration">Registration</a>
          </p>
          <p>
            <h3>Contact Us:</h3>
            For suggestions or collaborations, please reach out to us via email: <a href="mailto:eva.last.ita@gmail.com">eva.last.ita@gmail.com</a>.
          </p>
        </div>
        <div className="about-card">
          <img src={exampleCard} alt="Business Card Example" />
        </div>
      </div>
    </div>
  );
};

export default About;
