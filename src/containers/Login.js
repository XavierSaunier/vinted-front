import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPW] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );

      if (response.data.token) {
        setUser(response.data.token);
        history.push("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="loginPage">
      <h2>Se Connecter</h2>
      <form className="loginForm" onSubmit={handleSubmit}>
        <input
          className="inputForm"
          onChange={(event) => setEmail(event.target.value)}
          type="text"
          placeholder="your Email"
        ></input>
        <input
          className="inputForm"
          onChange={(event) => setPW(event.target.value)}
          type="password"
          placeholder="your password"
        ></input>
        <input className="sales" type="submit" value="connexion"></input>
      </form>
      <Link to="/signup">
        <p className="signUpLink">Pas de compte ? Créez-le ici.</p>
      </Link>
    </div>
  );
};

export default Login;
