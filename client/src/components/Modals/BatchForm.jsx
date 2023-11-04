/* eslint-disable no-unused-vars */
import React from 'react'

function BatchForm() {
  return (
    <div>
        <form action="">
            <div>
                <label htmlFor='gcs'>G.C.S</label>
                <input name='gcs' type="text" placeholder='Enter Value' />
            </div>
            <div>
                <label htmlFor='compactibility'>Compactibility</label>
                <input name='compactibility' type="text" placeholder='Enter Value' />
            </div>
            <div>
                <label htmlFor='moisture'>Moisture</label>
                <input name='moisture'  type="text" placeholder='Enter Value' />
            </div>
            <div>
                <label htmlFor='permeability'>Permeability</label>
                <input name='permeability' type="text" placeholder='Enter Value' />
            </div>
        </form>
    </div>
  )
}

export default BatchForm