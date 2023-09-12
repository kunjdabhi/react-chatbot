import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { setComplete } from '../reducers/userReducer';

const Counter = ({setComplete})=> {
    const [count, setCount] = useState(5);
    useEffect(() => {
        const countdownInterval = setInterval(() => {
          if (count >= 1) {
            setCount(count - 1);
          } else {
            setComplete(true);
            clearInterval(countdownInterval);
          }
        }, 1000);
    
        return () => {
          clearInterval(countdownInterval);
        };
      }, [count]);


    return (
        <div className='counter'>{count}</div>
    )
}
const mapStateToProps = (state)=>({
    complete:state.user.complete
})
const mapDispatchToProps = {
    setComplete
};
export default connect(mapStateToProps, mapDispatchToProps)(Counter);