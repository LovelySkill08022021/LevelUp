import React from 'react'
import axios from 'axios';

export default function MyButton({func}:{func: () => void}) {

    let arr = [1,2,3,4,5];
    let shown = false;

    function getData(){
        axios.get("/subject")
    }

  return (
    <div>

        <div>
            1
        </div>
        {
            shown && <div>2</div>
        }
        
    </div>
  )
}
