import React from 'react';
import {createClientMessage} from 'react-chatbot-kit'
import GotIt from '../Components/GotIt';
import moment from 'moment';
import {connect} from 'react-redux';
import {setName, setAge, setTimeslot} from '../reducers/userReducer'
import { setComplete } from '../reducers/userReducer';

const ActionProvider = ({ createChatBotMessage, setState, children,setName, setTimeslot}) => {
    const handleGotIt = ()=>{
        const message = createClientMessage('Got It');
        updateState(message);
        
        const pickSlotMessage = createChatBotMessage('Pick a slot',{
            widget:'timeslot'
        });
        updateState(pickSlotMessage);
    }

    const afterNameMessage = () =>{
        const message = createChatBotMessage('Enter your age',{
            widget:'ageDropDown'
        }
        );
        updateState(message, "age");
    }

    const afterAgeMessage = () =>{
      const user = children.props.children.props.state.user
      setName(user.name);
      setTimeslot(user.slot); 
      const message = createChatBotMessage("Thank you! the bot will exit in 5 second",{
        widget:'counter',
      });
      updateState(message);
      
    }

    const handleAge = (age)=>{
        const message = createClientMessage(age)
        updateState(message);
        afterAgeMessage();
    }

    const updateState = (message, checker)=>{
        setState((prev)=>({
            ...prev,
            messages:[...prev.messages, message],
            checker
        }))
    }

    const handleCalendarStrip = ()=>{
        const user = children.props.children.props.state.user;
        const moment = user.slot;
        if(moment){
          const date = moment.format("DD MMMM");
          const time = moment.format("hh:mm a");
          const day = moment._locale._weekdaysShort[moment.day()];
          const slotMessage = createClientMessage(`${date}, ${day} ${time}`);
          updateState(slotMessage);

          
          const message = createChatBotMessage('Enter your name');
          updateState(message, "name");
        }
        
    }



  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {handleGotIt, handleCalendarStrip, afterNameMessage, handleAge, afterAgeMessage},
        });
      })}
    </div>
  );
};


const mapsStateToProps = (state)=>({
  name:state.user.name,
  age:state.user.age,
  timeslot: state.user.timeslot,
  complete:state.user.complete
})

const mapDispatchToProps = {
  setName,
  setAge,
  setTimeslot,
  setComplete
};

export default connect(mapsStateToProps, mapDispatchToProps)(ActionProvider);