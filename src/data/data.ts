// Creation start data of graphs
import { store } from '../redux/store';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, 
  PolarAreaController, 
  RadialLinearScale,  
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PolarAreaController, 
  RadialLinearScale,  
  ArcElement
); // Подключение всех функций 


export const options = { // Тип графика 
  responsive: true, //Автоизменнение шкалы, в зависимости от амплитуды элементов 
  interaction: { // Возможно ли пересечение графиков
    mode: 'index' as const,
    intersect: false,
  },
  stacked: false, // Закрашивание поля под графиком 
  plugins: { // Основные параметры графика
    title: {
      display: true,
      text: 'Lab2',
    },
    legend: {
      labels:{
        font: {
          size: 27
        }
      }
    }
  },
  scales: { // Шкала
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
      grid: {
        drawOnChartArea: false,
      },
      ticks: {
        font: {
          size: 22
        }
      }
    },
    
  },
};

export const labels = store.getState().global.labels;

export const data = { //start data for all graphs 
  
  labels,
  datasets: [
    {
      label: 'Dataset',
      data: [0],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: ['rgba(53, 162, 235, 0.5)'],
      yAxisID: 'y1',
    },
    
  ],
};

export const redGraph = {// data for red graph line 
  label: 'Dataset',
  data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  pointRadius: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  borderColor: 'rgb(220, 53, 69)',
  backgroundColor: ['rgb(220, 53, 69)'],
  yAxisID: 'y',
}

export const chartOptions = {
  plugins: {
    title: {
      display: true,
      text: "Diagramm"
    },
    legend: {
      labels: {
        font: {
          size: 12
        }
      }
    }
  },
  
  scales: {
    r: {
      ticks: {
        font: {
          size: 12,
        },
      }
    },
  },
  
};

export const backgroundColor = [
  'rgb(255, 99, 132)',
  'rgb(75, 192, 192)',
  'rgb(255, 205, 86)',
  'rgb(201, 203, 207)',
  'rgb(54, 162, 235)',
  'rgb(255, 9, 132)',
  'rgb(35, 12, 192)',
  'rgb(25, 205, 86)',
  'rgb(201, 23, 7)',
  'rgb(54, 12, 235)',
]


