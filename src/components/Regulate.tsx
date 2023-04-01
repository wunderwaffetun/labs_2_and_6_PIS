import React, { useState, useEffect, FC } from "react"
import { Range } from "./Range"
import { store } from "../redux/store"
import 'materialize-css'
import { Select } from "./Select"
import { MultipleInp } from "./Input"




export const Regulate: FC = () => { // Выбор типа фильтрации ( Range, Multiple )

  const [ choice, setChoise ] = useState<string>('ran')
  
  useEffect(() => { // After uploading app start from global state's value 
    setChoise(store.getState().global.analys)
  }, [])

  store.subscribe(() => { // change it after updating into select element throw state
    setChoise(store.getState().global.analys)
  })

  return (
    <div className='regulate-panel'>
      <Select />
      {
        choice === 'ran' ? <Range /> : <MultipleInp />
      }
    </div>
  )
} 