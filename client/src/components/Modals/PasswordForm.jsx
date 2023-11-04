/* eslint-disable no-unused-vars */
import React from 'react'

function PasswordForm() {
  return (
    <div className='flex space-x-3'>
        <form>
            <div>
                <input type="password" placeholder='Password' />
            </div>
            <div>
                <button type='submit' className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Validate</button>
            </div>
        </form>
    </div>
  )
}

export default PasswordForm