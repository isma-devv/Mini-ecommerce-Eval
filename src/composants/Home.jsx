import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/apple.gif';
import '../App.css';
import Hamburger from 'hamburger-react'
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {

  // Déclaration de la variable isOpen qui gère l'ouverture et la fermeture du menu déroulant

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="home-container">

      {/** Appel de l'icône Hamburger pour l'afficher sur la page d'accueil */}

      <Hamburger className="hamburger" isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <div className="menu-dropdown">
          <Link to="/" className="dropdown-item">Accueil</Link>       {/** Lien vers la page d'accueil */}
          <Link to="/cart" className="dropdown-item">Catalogue</Link> {/** Lien vers la page du catalogue */}
          <Link to="/order" className="dropdown-item">Panier</Link>   {/** Lien vers la page du panier */}
          <Link to="/payer" className="dropdown-item">Payer</Link>    {/** Lien vers la page de paiement */}


        </div>
      )}
      <div className="welcome-text">
        <h1>Bienvenue dans le Mini E-Fruit 🍲</h1>
        <img src={logo} alt="Logo" width="854" height="480" /> {/** Affichage de la banniere GIF */}
      </div>
    </div>
  );
};


export default Home;
