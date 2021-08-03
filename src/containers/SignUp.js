import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SignUp = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPW] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
        }
      );

      if (response.data.token) {
        setUser(response.data.token);
        history.push("/");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMsg("Email déjà utilisé");
      }
    }
  };

  return (
    <div className="loginPage">
      <form className="loginForm" onSubmit={handleSubmit}>
        <input
          className="inputForm"
          onChange={(event) => setUsername(event.target.value)}
          type="text"
          placeholder="username"
        ></input>
        <input
          className="inputForm"
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          placeholder="email"
        ></input>
        <input
          className="inputForm"
          onChange={(event) => setPW(event.target.value)}
          type="password"
          placeholder="password"
        ></input>
        <p className="errorMsg">{errorMsg}</p>
        <input className="sales" type="submit" value="S'inscrire"></input>
      </form>
    </div>
  );
};

export default SignUp;
