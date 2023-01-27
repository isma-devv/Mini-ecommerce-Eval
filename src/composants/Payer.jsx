import axios from 'axios';
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Hamburger from 'hamburger-react'
import { Link } from 'react-router-dom';
import "../App.css"


// Initialise d'une variable Stripe pour éviter de charger plusieurs fois Stripe

let stripePromise;


// Fonction pour récupérer les informations de Stripe

const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe('pk_test_51LkOEiB33W2Axp41fl2MogRjfqkBRCjFpKkumbeSXU6G2TvxNY6Xvx9IpUQsndeHepKw4R0TwUgVH4rcRdNtcVad00xtk19YWN');
    }

    return stripePromise;
};

const Payer = ({ cart, shippingAddress }) => {

    // Utilise des états pour gérer l'ouverture/fermeture du menu Hamburger, les erreurs Stripe et le chargement de la page

    const [isOpen, setIsOpen] = useState(false);
    const [stripeError, setStripeError] = useState(null);
    const [isLoading, setLoading] = useState(false);

    // Fonction pour gérer l'envoie du formulaire de paiement

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {

            // Récupère les informations de carte du formulaire Stripe

            const stripe = await getStripe();
            const { error } = await stripe.redirectToCheckout({
                lineItems: cart,
                mode: "payment",
                successUrl: `${window.location.origin}/success`,
                cancelUrl: `${window.location.origin}/cancel`
            });
            console.log("Stripe checkout error", error);

            // Si une erreur Stripe est rencontrée, elle est stocke dans l'état stripeError

            if (error) setStripeError(error.message);

            // Envoie les informations de paiement à votre serveur pour effectuer le paiement
            try {
                const response = await axios.post('./server.js', {
                    cart,
                    shippingAddress,
                });

                // Si la réponse du serveur est incorrecte, afficher : There was an error with your payment. Please try again

                if (!response.ok) {
                    throw new Error('There was an error with your payment. Please try again.');
                }
            } catch (err) {
                setStripeError(err.message);
            }
            setLoading(false);
        } catch (err) {
            setStripeError(err.message);
            setLoading(false);
        }
    };

    // Affiche une alerte pour les erreurs Stripe

    if (stripeError) alert(stripeError);

    return (


        <div className="checkout">

            {/** Utilisation de l'icône hamburger pour ouvrir/fermer le menu déroulant */}

            <Hamburger isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            {isOpen && (
                <div className="menu-dropdown">
                    <Link to="/" className="dropdown-item">Accueil</Link>
                    <Link to="/cart" className="dropdown-item">Catalogue</Link>
                    <Link to="/order" className="dropdown-item">Panier</Link>
                    <Link to="/payer" className="dropdown-item">Payer</Link>


                </div>
            )}


            {/** Affiche un message d'erreur de Stripe s'il y en a un */}

            {stripeError && <p>{stripeError}</p>}
            <form onSubmit={handleSubmit}>
                <h2>Récapitulatif de la commande</h2>
                <ul>

                    {/** Affiche le nom, la quantité et le prix de chaque article dans le panier */}
                    {cart.map((item) => (
                        <li key={item.name}>
                            {item.name} ({item.quantity} x {item.price} €)
                        </li>
                    ))}
                </ul>
                <h2>Adresse de livraison</h2>
                <p>{shippingAddress}</p>
                <button type="submit" disabled={isLoading}>{isLoading ? "Loading..." : "Payer"}</button>
            </form>
        </div>
    );
};

export default Payer;
