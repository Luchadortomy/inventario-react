// src/components/AddProduct.jsx
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "products"), {
      name,
      quantity
    });
    setName("");
    setQuantity(0);
    // Recarga la página para actualizar la lista de productos
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre del producto"
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        placeholder="Cantidad"
      />
      <button type="submit">Agregar Producto</button>
    </form>
  );
};

export default AddProduct;
