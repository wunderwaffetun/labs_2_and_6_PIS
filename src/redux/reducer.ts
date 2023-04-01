import { createSlice } from "@reduxjs/toolkit";
import { faker } from '@faker-js/faker';
import type { PayloadAction } from "@reduxjs/toolkit";

export interface initialInterface { 
  points: number[],
  analys: string,
  multiple: number,
  labels: string[],
  range: Object
}

const initialState :initialInterface = {
  points: [],
  analys: 'ran', //Какой тип анализа использутеся ran - range, mul - multiple
  multiple: 0,
  labels: ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10'],
  range: { min: -1000, max: 1000 }
}

function generatePoint():number { // start random genearation point
  const value = faker.datatype.number({ min: -1000, max: 1000 })
  return value
}

function generateStartPoints():Array<number> {
  let points: number[] = []
  for(let i = 0; i < 10; i++){
    points.push(generatePoint())
  }

  return points
}

const dataSlice = createSlice( { // Основной редюсер стора, в нём хранятся все точки графика 
  name: 'data',
  initialState, // Начальная инициализация значения стора 
  reducers: {
    setPoints: { // Редюсер Заполнения 
      reducer: (state, acttion: PayloadAction<number[]>) => { // Заполняет массив точек 
        state.points = acttion.payload
      },
      prepare: () => { // Срабатывает сразу же как приходят данные, после этого вызывается reducer сверху 
        let points = generateStartPoints()
        return { payload: points }
      }
    },
    setRange: {
      reducer: (state, acttion: PayloadAction<Object>) => { // Заполняет range
        state.range = acttion.payload
      },
      prepare: (data: object) => { 
        return { payload: data }
      }
    },
    setMul: { // setting multiple element
      reducer: (state, action: PayloadAction<number>) => {
        state.multiple = action.payload
      },
      prepare: (mul: number) => {
        
        return { payload: mul}
      }
    },
    setAnal: { // setting type of analys
      reducer: (state, action: PayloadAction<string>) => {
        state.analys = action.payload
      },
      prepare: (type: string) => {
        return { payload: type}
      }
    },
    
  }
} )

export const { setPoints, setRange, setAnal, setMul } = dataSlice.actions
export default dataSlice.reducer