
import React, { useEffect, useState } from 'react';
import { store } from '../redux/store';
import { setPoints } from '../redux/reducer';
import { data, labels, options } from '../data/data';
import { Line } from 'react-chartjs-2'; // Импорт всех библиотек выше









export function Graph() {

  const [dt, setDt] = useState<any>(JSON.parse(JSON.stringify(data))) // чтобы 2 графика были одинаковыми только по изначальным данным, убрал ссылку на данные графика с изначального


  useEffect(() => {
    store.dispatch( setPoints() ) // После загрузки компонента сразу же отправляется запрос на заполнение данных
    data.datasets[0].data = labels.map((item, i) => store.getState().global.points[i]) // после того как в глобальном стейте сгенерировался массив точек, интрефейс обновляется 
  }, [])
  
  useEffect(() => {
    setDt(JSON.parse(JSON.stringify(data))) // Создание нового массива по образу и подобию переданного
  }, [data])

  

  return <>
    {
      data.datasets[0].data.length === 10 ? <Line className='main-graph' options={options} data={dt} /> : null // Отрисовка шкалы
    }
  </>
}
