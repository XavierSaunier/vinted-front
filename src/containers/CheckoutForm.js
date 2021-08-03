import {
  useStripe,
  useElements,
  CardElement,
  Elements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ userId, data }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const CardElements = elements.getElement(CardElement);

      const stripeResponse = await stripe.createToken(CardElements, {
        name: userId,
      });

      const response = await axios.post(
        " https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          stripeToken: stripeResponse.token.id,
          price: data.product_price,
        }
      );
    } catch (error) {
      console.log(error.message);
      console.log(error.response);
    }
  };

  return (
    <div>
      {console.log(data)}
      <p>payment</p>
      <p>{data.product_price}</p>
      <p>{userId}</p>
      <form onSubmit={handleSubmit}>
        <CardElement />

        <input type="submit" value="Payer"></input>
      </form>
    </div>
  );
};

export default CheckoutForm;
