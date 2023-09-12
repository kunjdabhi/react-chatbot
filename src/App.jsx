import './App.css'
import {Chatbot} from 'react-chatbot-kit';
import config from './chatbotfiles/config';
import MessageParser from './chatbotfiles/MessageParser';
import ActionProvider from './chatbotfiles/ActionProvider';
import 'react-chatbot-kit/build/main.css'
import {connect} from 'react-redux';
import { setBot } from './reducers/userReducer';

function App({bot, setBot, name, age ,timeslot, complete}) {
    const handleEnroll = ()=>{
      setBot(true);
    }
    return (
      <div >
        {complete && <div>
            <p className='final-string'>Your name {name} aged {age} has been added to student system. You may now exit.</p>
          </div>}
        {bot && !complete && <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />}
        {!bot && 
          <div className='home-text'>
            <p>Enter into Student Info System</p>
            <button className='enroll-btn' onClick={handleEnroll}>Enroll Now</button>
          </div>
          
        }
      </div>
    );
}

const mapsStateToProps = (state)=>({
  name:state.user.name,
  age:state.user.age,
  timeslot:state.user.timeslot,
  bot: state.user.bot,
  complete: state.user.complete
})

const mapDispatchToProps = {
  setBot
}

export default connect(mapsStateToProps, mapDispatchToProps)(App);
