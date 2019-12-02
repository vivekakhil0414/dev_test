import React from 'react';

export default function Select(props) {
     
     const onChange = (event) => {
          console.log(event.target.value)
     }

     if(props && props.list && props.list.length) {
          return (
               <select className="selectpicker" onChange={onChange}>
                    {
                         props.list.map(item => {
                              return <option value={item.attr}>{ item.val }</option>
                         })
                    }
               </select>
          )
     } else {
          return <div>No data available</div>
     }
}