import '../index.css';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const BarChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    // Configura un listener en la colección de Firestore para detectar cambios en tiempo real
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const products = snapshot.docs.map(doc => doc.data());

      // Procesa los datos para el gráfico
      const labels = products.map(product => product.name); // Asume que cada producto tiene un campo "name"
      const quantity = products.map(product => product.quantity); // Asume que cada producto tiene un campo "quantity"

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Cantidad de productos',
            data: quantity,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
          }
        ]
      });
    });

    // Cleanup function para dejar de escuchar cambios cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  const config = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Gráfico de Cantidad de Productos'
      }
    }
  };

  return (
    <div className='bar'>
      <h2>Gráfica de barras</h2>
      <div className='chart'>
        <Bar data={chartData} options={config} />
      </div>
    </div>
  );
};

export default BarChart;
