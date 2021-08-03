import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const Offer = ({ userCookie }) => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");

  return isLoading ? (
    <p>Chargement</p>
  ) : (
    <div className="offerBody">
      <div className="offerProfile">
        <img
          className="productPic"
          alt={data.product_name}
          src={data.product_image.secure_url}
        />

        <div className="product">
          <p>{data.product_price} €</p>
          <ul className="productDetails">
            {data.product_details.map((details, index) => {
              return (
                <li key={index}>
                  <span>{Object.keys(details)[0]} : </span>
                  <span>{details[Object.keys(details)[0]]}</span>
                </li>
              );
            })}
          </ul>
          <div className="productOverview">
            <p>{data.product_name}</p>
            <p>{data.product_description}</p>
            <p>{data.owner.account.username}</p>
          </div>
          {userCookie ? (
            <Router>
              <Route path="/payment">
                <Elements stripe={stripePromise}>
                  <CheckoutForm data={data} />
                </Elements>
              </Route>
              <Link to="/payment">
                <button className="sales">Acheter</button>
              </Link>
            </Router>
          ) : (
            <Link to="/login">
              <button>Acheter</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Offer;
