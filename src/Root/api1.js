import axios from 'axios'
import { useState } from 'react'

const API = () => {
    const [value, setValue] = useState()
    axios.post('http://localhost:3033/data')
        .then(res  => {
            console.log('hdhmh');
            console.log(res.data)
            setValue(res.data)
            console.log(value);
        }).catch((error) => {
            console.log(error)
        })
 
    return (
        <div>
            {API}
            {value.map( (e) => {
                return(
                    <div> 
                        {e.x0}
                        {e.x1}
                        {e.fx}
                    </div>
                )
            })}
        </div>
    )
}
export default API

