import React, { useEffect, useState } from 'react';
import { store } from '../redux/store';
import { data, options } from '../data/data';

import { Circle } from './Circle';
import { FilteredGraph } from './FilteredGraph'
import { redGraph } from '../data/data';


const cleanObj = (obj: Object): Object => { // Создание нового массива, отвязка адреса от исходного 
  return JSON.parse(JSON.stringify(obj))
}

const calculateAverage = (arr: any): number[] => { // Вычисляет среднее значениние, для построения точек крастой прямой, возвращает массив 10 элементов
  const av: number = parseInt(arr.reduce((sum: number, elem: string) =>  sum + +elem * .1 , 0) || 0) 
  return Array<number>(10).fill(av)
}


export function BottomPanel() {
  const [ localPoints, setLocalPoints ] = useState<number[]>(store.getState().global.points) // Точки, которые будут показаны
  const [ labels, setLabels ] = useState<string[]>(store.getState().global.labels) // разметка оси абсцисс 'x1', ...
  const [ newData, setNewData ] = useState<any>(cleanObj(data)) // данные, которые будут соответствовать новым точкам по индексам
  const [ newOpions, setNewOptions ] = useState<any>(cleanObj(options)) // массив для оформления данных 
  
  
  

  const unsubscribe = store.subscribe(() => {
    let points = store.getState().global.points,
        labs: string[] = []
    const range: any = {} = store.getState().global.range
    const multiple = store.getState().global.multiple

    if (store.getState().global.analys === 'ran' ){ // если в select выбран Range
      points = points.filter( (point, i) => {
        if(+point >= +range.min && +point <= +range.max) {
          labs.push(store.getState().global.labels[i]) // Все значения x, попадающие в диапазон 
          return point 
        }
      }) // фильтрую точки, входящие в интервал range 
    } else {
      if( multiple ){ // Чтобы не прилетало Nan когда ввод пустой
        points = points.filter( (point, i) => {
          if( (i + 1)  % multiple === 0) { // Проверка кратности
            labs.push(store.getState().global.labels[i]) // Все значения x, попадающие в диапазон 
            return point 
          }
        }) 
      } else { // если пустой инпут, заполняет исходными точками
        points = store.getState().global.points 
        labs = store.getState().global.labels
      }
    }
    
    

      setLabels(labs)
      setLocalPoints(points) // После того как стейт обновился, устанавливаю его в локальный 
      unsubscribe() // Когда компонент обновляется (а происходит это доаольно часто) вешаются всё новые и новые прослушивальщики store, удаляю их после отработки
  }) 



  useEffect(() => {
    let datasets = JSON.parse(JSON.stringify(newData.datasets))
        datasets[0].data = labels.map((item, i) => localPoints[i] ) // напрямую (newData.datasets... ) переопределить нельзя, поэтому datasets вытаскивается, обновляется и вноситься обратно
        // после того как в глобальном стейте сгенерировался массив точек, интрефейс обновляется 
        datasets[1] = redGraph
        datasets[1].data = calculateAverage(localPoints)
    setNewData({
            ...newData,
            datasets,
            labels
          })
  }, [localPoints])


  return <>
    {
    
      !newData.datasets[0].data.length ? null  : ( // Отрисовка шкалы
        <div className='filtered-area'>
          <FilteredGraph options={newOpions} data={newData} />
          <Circle options={newOpions} data={newData} />
        </div>
      ) 
    }
  </>
}





