import React, { useState } from "react";
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, where("name", "==", name));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const productDoc = querySnapshot.docs[0];
        const productRef = doc(db, "products", productDoc.id);
        await updateDoc(productRef, {
          quantity: productDoc.data().quantity + quantity
        });
      } else {
        await addDoc(productsRef, {
          name,
          quantity
        });
      }

      setName("");
      setQuantity(1); 
    } catch (error) {
      console.error("Error adding or updating document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre del producto"
        required
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        placeholder="Cantidad"
        min="1"
        required
      />
      <button type="submit">Agregar Producto</button>
    </form>
  );
};

export default AddProduct;
