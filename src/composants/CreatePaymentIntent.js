const express = require('express');
const stripe = require('stripe')('sk_test_51LkOEiB33W2Axp41eG3T0vF7cm5hcZskw5oNqcAdFXrjC9SjXgCZxhJd4M5ga3OLVsEltvWEOwqo01lSOOpUEEXr00umwD0W3m');

const app = express();
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
    try {
        const { items } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
            currency: 'eur',
        });

        res.json({ client_secret: paymentIntent.client_secret });
    } catch (err) {
        console.log(err);
        res.status(500).end();
    }
});

