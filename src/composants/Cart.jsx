import { Link } from 'react-router-dom';
import React, { useState } from 'react';            // Importe les composants nécessaires à l'affichage de la page
import produit1 from '../images/orange.png';
import produit2 from '../images/pomme.png';
import produit3 from '../images/banane.png';

import Hamburger from 'hamburger-react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';




const Cart = ({ cart, setCart }) => {

  // Gère l'état de l'ouverture du menu hamburger

  const [isOpen, setIsOpen] = useState(false);


  // Ajoute un élément au panier en utilisant la fonction setCart

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (

    <div className="home-container">
      <Hamburger isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      <div className="cart-button">
        <Link to="/order">

          {/** Affichage du nombre d'items dans le panier */}

          <button>
            Panier ({cart.length})
          </button>
        </Link>
      </div>



      {isOpen && (
        <div className="menu-dropdown">
          <Link to="/" className="dropdown-item">Accueil</Link>
          <Link to="/cart" className="dropdown-item">Catalogue</Link>
          <Link to="/order" className="dropdown-item">Panier</Link>
          <Link to="/payer" className="dropdown-item">Payer</Link>

        </div>
      )}

      {/** Titre de la page */}

      <h1 className='Catalogue-title'>Catalogue</h1>


      {/** Affiche les produits avec leur nom, description, prix et une image. */}

      <div>
        <img src={produit1} alt="Produit 1" width="280" height="200" />
        <p>Type : Orange</p>
        <p>Description : Un produit de qualité supérieure</p>
        <p>Prix : 15.99 €</p>
        <button onClick={() => addToCart({ name: 'Orange', image: produit1, description: 'Un produit de qualité supérieure', price: '15.99' })}>Ajouter au panier</button>
      </div>
      <div>
        <img src={produit2} alt="Produit 1" width="280" height="200" />
        <p>Type :  Pomme</p>
        <p>Description : Un produit de grande qualité </p>
        <p>Prix : 5.99 €</p>

        {/** Ajoute les produits au panier en cliquant sur le bouton "Ajouter au panier". */}

        <button onClick={() => addToCart({ name: 'Pomme', image: produit2, description: 'Un produit de grande squalité', price: '5.99' })}>Ajouter au panier</button>
      </div>

    </div>

  );
};

export default Cart;