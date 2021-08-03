import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

const HomePage = ({ data }) => {
  return (
    <div>
      <div className="banner">
        <img
          alt="bannière"
          src="https://lereacteur-vinted.netlify.app/static/media/hero.09bfd0f9.jpg"
          className="hero"
        />
        <div className="motto">
          <h2>Prêts à faire du tri dans vos placards ?</h2>
          <button className="sales">Commencez à vendre</button>
        </div>
      </div>

      <div className="offers">
        {data.offers.map((offer, index) => {
          return (
            <Link key={offer._id} to={`/offer/${offer._id}`}>
              <div className="offer">
                <p className="prodDesc">{offer.owner.account.username}</p>
                <img
                  alt={offer.product_name}
                  src={offer.product_image.secure_url}
                  className="thumbnail"
                />
                <p className="price">{offer.product_price} €</p>
                <p className="prodDesc">{offer.product_details[0].MARQUE}</p>
                <p className="prodDesc">{offer.product_details[1].TAILLE}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
