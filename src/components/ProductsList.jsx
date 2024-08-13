import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import EditProduct from "./EditProduct";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      setProducts(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    setProducts(products.filter(product => product.id !== id));
  };

  const handleEditComplete = () => {
    setEditingProduct(null);
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      setProducts(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchProducts();
  };

  return (
    <div>
      <h2>Inventario de Productos</h2>
      {editingProduct ? (
        <EditProduct product={editingProduct} onEditComplete={handleEditComplete} />
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.name} - {product.quantity}
              <button onClick={() => handleDelete(product.id)}>Eliminar</button>
              <button onClick={() => setEditingProduct(product)}>Editar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductsList;
