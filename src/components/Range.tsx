import React, { useEffect, useRef } from 'react'
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import 'materialize-css/dist/css/materialize.min.css';
import wNumb from 'wnumb'; 
import { useSelector } from 'react-redux';
import { setRange } from '../redux/reducer';
import { store } from '../redux/store';

interface DivWithSlider extends HTMLDivElement {
  noUiSlider: any
}

interface stateInterface {
  global: {
    points: number[],
    range: {
      min: number,
      max: number
    }
  }
} // 2 object's interfaces for creating by the patterns them  

export const Range = () => { // Range-element for updating edges of filtering

  const range = useSelector( ( state: stateInterface ) => state.global.range) // getting authentificative numbers from global state
  
  const sliderRef = useRef<DivWithSlider>(null) // creating HTML elements in React in the right way

  const changeVal = (sides: any): void => { // updating range bar into global state
    store.dispatch(setRange({min: sides[0], max: sides[1]}))
  }
  
  useEffect(() => { // re-render Range-element after moving
    const slider = sliderRef.current // extracting slider from ref obj
    if(slider) { // if it there (for ts)
      noUiSlider.create( slider, { // pattern of creating slider in the standart way (lib doc)
        start: [range.min, range.max],
        connect: true,
        step: 1,
        orientation: 'horizontal', // 'horizontal' or 'vertical'
        range: {
          'min': -1000,
          'max': 1000
        },
        tooltips: true, 
        format: wNumb({
          decimals: 0
        })
      });
      slider.noUiSlider.on('end', changeVal) // stopped move handler
    }


    return () => { // deletion this after unmount
      if(slider) { 
        slider.noUiSlider.destroy();
      }
    };


  }, [range])
  
  
  return ( // drawing
    <div ref={sliderRef} className='slider' id='slider' ></div>
  )

}