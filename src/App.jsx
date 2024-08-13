import React from "react";
import ProductsList from "./components/ProductsList";
import AddProduct from "./components/AddProduct";
import './styles/styles.css';

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
