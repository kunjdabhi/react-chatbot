import React from 'react'
import { setAge } from '../reducers/userReducer';
import { connect } from 'react-redux';

const Age = ({setState, state, actions, setAge, age})=> {
    const ages = [];
    for(let i=8;i<=40;i++){
        ages.push(i);
    }

    const handleAgeChange = (e)=>{
        setState((prev)=>({
            ...prev,
            user:{...state.user, age:e.target.value}
        }))
        setAge(e.target.value);
        actions.handleAge(e.target.value);
    }

  return (
    <div>
        <select name='age' className='age-dropdown' onChange={handleAgeChange}>
            <option>age</option>
            {ages.map((age)=>{
                return (
                    <option key={age} value={age}>{age}</option>
                )
            })}
        </select>
    </div>
  )

}
const mapStateToProps = (state)=>({
    age:state.user.age,
  })

  const mapDispatchToProps = {
    setAge,
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Age);
  
