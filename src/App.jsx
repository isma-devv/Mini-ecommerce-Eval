import React, { useState } from 'react';
import { useEffect } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './composants/home';
import Cart from './composants/Cart';
import Order from './composants/Order';
import Payer from './composants/Payer';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./composants/CheckoutForm";
import "./App.css";


const App = () => {
  const [cart, setCart] = useState([]);
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {

    // Créer PaymentIntent dès que la page se charge

    fetch("/composants/CreatePaymentIntent.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };




  return (

    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
      <Router>
        <Routes>
          <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/order" element={<Order cart={cart} setCart={setCart} />} />
          <Route path="/payer" element={<Payer cart={cart} />} />

        </Routes>
      </Router>
    </div>
  );

}
export default App;