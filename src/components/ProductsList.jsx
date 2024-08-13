import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import EditProduct from "./EditProduct";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    // Configura un listener para obtener los productos en tiempo real
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });

    // Cleanup para detener la escucha cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
  };

  const handleEditComplete = () => {
    setEditingProduct(null);
    // No es necesario hacer fetch de los productos aquí, ya que onSnapshot se encargará de actualizar la lista automáticamente
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
              <div className="botones">
                <button onClick={() => handleDelete(product.id)}>Eliminar</button>
                <button onClick={() => setEditingProduct(product)}>Editar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductsList;
