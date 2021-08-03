import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Header from "./components/Header";
import HomePage from "./containers/HomePage";
import Offer from "./containers/Offer";
import SignUp from "./containers/SignUp";
import Login from "./containers/Login";
import Publish from "./containers/Publish";
import CheckoutForm from "./containers/CheckoutForm";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [userCookie, setUserCookie] = useState(
    Cookies.get("userCookie") || null
  );

  const setUser = (cookie) => {
    if (cookie) {
      Cookies.set("userCookie", cookie, {
        expires: 5,
        sameSite: "none",
        secure: true,
      });
      setUserCookie(cookie);
    } else {
      Cookies.remove("userCookie");
      setUserCookie(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");

  return isLoading ? (
    <p>Chargement en cours</p>
  ) : (
    <Router>
      <Header userCookie={userCookie} setUser={setUser} />
      <Switch>
        <Route exact path="/">
          <HomePage data={data} />
        </Route>

        <Route path="/offer/:id">
          <Offer userCookie={userCookie} />
        </Route>

        <Route path="/login">
          <Login setUser={setUser} />
        </Route>

        <Route path="/signup">
          <SignUp setUser={setUser} />
        </Route>

        <Route path="/publish">
          <Publish token={userCookie} />
        </Route>

        <Route path="/payment">
          <Elements stripe={stripePromise}>
            <CheckoutForm userId={userCookie} />
          </Elements>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
