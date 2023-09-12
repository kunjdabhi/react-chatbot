import React from 'react'

export default function GotIt(props) {
    const handleGotIt = ()=>{
        props.actions.handleGotIt();
    }
  return (
    <div className='button-container'>
        <button className='got-it-button' onClick={handleGotIt}>
            Got It!
        </button>
    </div>
    
  )
}
