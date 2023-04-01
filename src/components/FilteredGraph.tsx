
import { Line } from 'react-chartjs-2'; 




export function FilteredGraph( {options, data}: any) { // Отрисовка Нового Графика
  return <>
    {
      data.datasets[0].data.length ? <Line className='main-graph' options={options} data={data} /> : null // Отрисовка шкалы
    }
  </>
}





