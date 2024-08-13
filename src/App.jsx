import React from "react";
import ProductsList from "./components/ProductsList";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <div className="App">
      <h1>Sistema de Inventarios</h1>
      <AddProduct />
      <ProductsList />
    </div>
  );
}

export default App;
