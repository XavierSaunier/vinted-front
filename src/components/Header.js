import logoVinted from "../images/Vinted_logo.png";
import { Link } from "react-router-dom";

const Header = ({ userCookie, setUser }) => {
  return (
    <div className="header">
      <img alt="logo-vinted" src={logoVinted} className="logo" />
      <input
        type="text"
        placeholder="rechercher des articles"
        className="research"
      ></input>

      {userCookie ? (
        <div>
          <Link to="/">
            <button className="logOut" onClick={() => setUser(null)}>
              Déconnexion
            </button>
          </Link>
          <Link to="/publish">
            <button className="sales">Mise en vente</button>
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="profile">Connexion</button>
          </Link>
          <Link to="/signup">
            <button className="profile">Inscription</button>
          </Link>
          <Link to="/login">
            <button className="sales">Mise en vente</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
