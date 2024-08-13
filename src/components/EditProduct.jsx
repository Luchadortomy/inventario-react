import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const EditProduct = ({ product, onEditComplete }) => {
  const [name, setName] = useState(product.name);
  const [quantity, setQuantity] = useState(product.quantity);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productRef = doc(db, "products", product.id);
    await updateDoc(productRef, {
      name,
      quantity
    });
    onEditComplete(); // Llamar a una función para actualizar la lista después de la edición
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
      <button type="submit">Guardar Cambios</button>
    </form>
  );
};

export default EditProduct;
