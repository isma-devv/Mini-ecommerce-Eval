import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    LinkAuthenticationElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "Succés":
                    setMessage("Paiement Succés!");
                    break;
                case "processing":
                    setMessage("Votre paiement est en cours.");
                    break;
                case "requires_payment_method":
                    setMessage("Votre paiement n'est pas passé, s'il vous plait reesayer");
                    break;
                default:
                    setMessage("?");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js n'a pas encore été chargé.
            // Assurez-vous de désactiver le formulaire jusqu'à ce que Stripe.js soit chargé.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {

                // Assurez-vous de le remplacer par votre page de fin de paiement

                return_url: "http://localhost:3000",
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("Une erreur inattendue est apparue.");
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs"
    }

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement
                id="link-authentication-element"
                onChange={(e) => setEmail(e.target.value)}
            />
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Payer maintenant"}
                </span>
            </button>
            {/* Afficher les messages d'erreur ou de réussite */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}