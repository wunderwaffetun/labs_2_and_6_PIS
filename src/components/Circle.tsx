import React from 'react'
import {  PolarArea } from 'react-chartjs-2'; 
import { backgroundColor, chartOptions } from '../data/data';


type Props = {
  options: Object,
  data: any
}

export function Circle({options, data}: Props) { // Компонент отрисовки Круговой диаграммы, вынесен в одтельный файл, задал цвета
  let dt = JSON.parse(JSON.stringify(data))
  dt.datasets[0].backgroundColor = backgroundColor

  return (
    <PolarArea className='circle-graph' options={chartOptions} data={dt} />
  )
}