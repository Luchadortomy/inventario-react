import React from "react";
import ProductsList from "./components/ProductsList";
import AddProduct from "./components/AddProduct";
import './styles/styles.css';
import BarChart from "./charts/Bar";

function App() {
  return (
    <div className="App">
      <h1>Sistema de Inventarios</h1>
      <AddProduct />
      <ProductsList />
      
      <div className="graphs">
        <BarChart />
      </div>
    </div>
  );
}

export default App;
