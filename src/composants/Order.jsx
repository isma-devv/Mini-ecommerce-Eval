import Hamburger from 'hamburger-react'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import "../App.css";

// Component qui affiche le panier et les options de navigation

const Order = ({ cart, setCart }) => {

  // Utilisation de l'état pour gérer l'affichage du menu hamburger

  const [isOpen, setIsOpen] = useState(false);

  // Fonction pour supprimer un produit du panier

  const removeFromCart = (index) => {
    setCart(cart.filter((product, i) => i !== index));
  }

  useEffect(() => {

    // Effect qui s'exécute lorsque la variable cart change

  }, [cart]);

  return (
    <>
      {/** Utilisation du composant Hamburger pour afficher un menu hamburger */}

      <Hamburger isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />

      {/** Si le menu est ouvert, affichage des options de navigation */}

      {isOpen && (
        <div className="menu-dropdown">
          <Link to="/" className="dropdown-item">Accueil</Link>
          <Link to="/cart" className="dropdown-item">Catalogue</Link>
          <Link to="/order" className="dropdown-item">Panier</Link>
          <Link to="/payer" className="dropdown-item">Payer</Link>

        </div>
      )}

      {/** Bouton pour accéder à la page de récapitulatif de la commande */}

      <Link to={{
        pathname: '/payer',
        state: { cart }
      }}>
        <button className='payer1'>Récapitulatif de la commande</button>
      </Link>
      <h1>Panier</h1>

      {/** Si le panier est vide, affiche "Votre panier est vide." */}

      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>

          {/** Affichage des produits du panier */}

          {cart.map((product, index) => (
            <div key={index}>
              <img src={product.image} alt={product.name} width="280" height="200" />
              <p>Type: {product.name}</p>
              <p>Description: {product.description}</p>
              <p>Prix: {product.price} €</p>
              <button className='supprimer' onClick={() => removeFromCart(index)}>Supprimer</button>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default Order;