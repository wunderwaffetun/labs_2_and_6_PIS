import { useEffect, FC } from "react"
import { store } from "../redux/store"
import 'materialize-css'
import { setAnal } from "../redux/reducer"

export const Select: FC = () => {// Selectr element render 

  useEffect(() => { 
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  }, [])

  return (
    <div  className="input-field col s12" >
      <select onChange={ // change value into global state after selecting element
        (e) => {
          store.dispatch(setAnal(e.target.value)) 
        }
      }>
        <option value="ran">Range</option>
        <option value="mul">Multiple</option>
      </select>
      <label> Select</label>
    </div>
  )
  
}