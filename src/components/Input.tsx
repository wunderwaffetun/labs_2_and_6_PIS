
import { useState, FC } from "react"
import { store } from "../redux/store"
import 'materialize-css'
import {  setMul } from "../redux/reducer"


export const MultipleInp: FC = () => { // Компонент ввода значения для сортировки по нему 

  const [ value, setValue ] = useState<string>('') // строка, которая хранит это значение


  const update = (value: string) => { // маска ввода 
    
    if ( /^[1-9]*$/.test(value) ) {
      setValue(value)
      console.log(value)
      store.dispatch(setMul(parseInt(value)))
    }
  }
 
  return ( // Отрисовка самого элемента 
    <div className="row">
      <div className="input-field col s12">
        <input 
          id="text" 
          type="text" 
          className="validate" 
          value={value}
          onChange={(e) => {
            update(e.target.value)
          }}
        />
        <label htmlFor="text">Value</label>
      </div>
    </div>
  )
}