const express = require("express");
const app = express();

// Test ma clé API Stripe
const stripe = require('stripe')('sk_test_51LkOEiB33W2Axp41eG3T0vF7cm5hcZskw5oNqcAdFXrjC9SjXgCZxhJd4M5ga3OLVsEltvWEOwqo01lSOOpUEEXr00umwD0W3m');

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
    // Remplacez cette constante par un calcul du montant de la commande
    // Calculez le total de la commande sur le serveur pour éviter les clients de manipuler directement le montant sur le client

    return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;

    // Créer un PaymentIntent avec le montant de la commande et la devise (ici euros)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: 2000,
        currency: 'eur',
        payment_method_types: ['card'],
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

app.listen(4242, () => console.log("Serveur Node en écoute sur le port 5173 !")); 