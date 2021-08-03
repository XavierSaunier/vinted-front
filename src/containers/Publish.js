import { useState } from "react";
import axios from "axios";

const Publish = ({ token }) => {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [data, setData] = useState();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const formData = new FormData();
      formData.append("title", title);
      formData.append("picture", picture);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("price", price);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            Content_Type: "multipart/form-data",
          },
        }
      );

      setData(response.data.result);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="publishBody">
      <form className="submitForm" onSubmit={handleSubmit}>
        <input
          className="insertPic"
          type="file"
          onChange={(event) => {
            setPicture(event.target.files[0]);
          }}
        ></input>
        <div className="itemName">
          <span>
            Titre
            <input
              type="text"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            ></input>
          </span>
          <span>
            Décris ton article
            <input
              type="text"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            ></input>
          </span>
        </div>
        <div className="itemDesc">
          <span>
            Marque
            <input
              type="text"
              onChange={(event) => {
                setBrand(event.target.value);
              }}
            ></input>
          </span>

          <span>
            Taille
            <input
              type="number"
              onChange={(event) => {
                setSize(event.target.value);
              }}
            ></input>
          </span>
          <span>
            Couleur
            <input
              type="text"
              onChange={(event) => {
                setColor(event.target.value);
              }}
            ></input>
          </span>
          <span>
            Etat
            <input
              type="text"
              onChange={(event) => {
                setCondition(event.target.value);
              }}
            ></input>
          </span>
          <span>
            Lieu
            <input
              type="text"
              onChange={(event) => {
                setCity(event.target.value);
              }}
            ></input>
          </span>
        </div>
        <span className="itemPrice">
          Prix
          <input
            type="number"
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          ></input>
        </span>
        <br />
        <input type="submit"></input>
      </form>
      {data && <img alt="" src={data.secure_url} />}
    </div>
  );
};

export default Publish;
