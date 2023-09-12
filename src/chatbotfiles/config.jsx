import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import GotIt from '../Components/GotIt';
import CalendarStrip from '../Components/CalendarStrip';
import Age from '../Components/Age';
import Counter from '../Components/Counter';
const config = {
    botName:"HelperBot",
    initialMessages: [createChatBotMessage(`Hello, Welcome to student info system!`, {
      widget:"gotIt",
      
    })],
    customStyles: {
        botMessageBox: {
          backgroundColor: '#376B7E',
        },
        chatButton: {
          backgroundColor: '#5ccc9d',
        },
    },
    widgets:[
      
      {
        widgetName:"gotIt",
        widgetFunc: (props)=> <GotIt {...props} />
      },
      {
        widgetName:'timeslot',
        widgetFunc:(props)=> <CalendarStrip {...props} />
      },{
        widgetName:'ageDropDown',
        widgetFunc: (props)=> <Age {...props} />

      },
      {
        widgetName:'counter',
        widgetFunc:(props)=> <Counter {...props} />
      }
    ],
    state:{
      checker: null,
      user:{
        name:"",
        age:"",
        slot:""
      }
    }

};

export default config;