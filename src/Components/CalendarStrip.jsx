import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import moment from 'moment';


export default function CalendarStrip(props) {
  // console.log(moment('20230823T0300', "YYYYMMDDThhmm"))
  const [currentDate, setCurrentDate] = useState();
  const [morningTimeSlots, setMorningTimeSlots] = useState([]);
  const [eveningTimeSlots, setEveningTimeSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState();
  const [morningSlotIndex, setMorningSlotIndex] = useState(); // Separate state for morning slots
  const [eveningSlotIndex, setEveningSlotIndex] = useState();


  

  const userRef = useRef({
    name: "",
    age: "",
    slot: "",
  });

  const [user, setUser] = useState({
    name:"",
    age:"",
    slot:"",
  });
  const days = [  
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ]
  const months = ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sept","Oct","Nov","Dec"];
  const today = new Date();
  const dates = [];
  const month30 = [3,5,8,10];
  const addNextMonthDates = () => {
    today.setDate(1); // Set the date to the first day of the current month
    today.setMonth(today.getMonth() + 1); // Move to the next month

    while (dates.length < 5) {
      if (month30.includes(today.getMonth())) {
        if (today.getDate() === 31) {
          break;
        }
      }
      if (today.getMonth() === 1) {
        if (today.getDate() === 29) {
          break;
        }
      }
      dates.push({ date: today.getDate(), day: today.getDay(), month: today.getMonth(), year: today.getFullYear() });
      today.setDate(today.getDate() + 1); // Move to the next day
    }
  };

    while (dates.length < 5) {
    if (month30.includes(today.getMonth())) {
      if (today.getDate() === 31) {
        break;
      }
    }
    if (today.getMonth() === 1) {
      if (today.getDate() === 29) {
        break;
      }
    }
    dates.push({ date: today.getDate(), day: today.getDay(), month: today.getMonth(), year:today.getFullYear() });
    today.setDate(today.getDate() + 1); // Move to the next day
  }

  addNextMonthDates();

  const generateMorningTimeSlots = () => {
    const morningSlots = [];
    const startTime = moment().set({ hour: 9, minute: 0 });
    const endTime = moment().set({ hour: 12, minute: 0 });

    while (startTime.isBefore(endTime)) {
      morningSlots.push(startTime.format('h:mm A'));
      startTime.add(1, 'hour');
    }

    setMorningTimeSlots(morningSlots);
  };

  const generateEveningTimeSlots = () => {
    const eveningSlots = [];
    const startTime = moment().set({ hour: 14, minute: 0 });
    const endTime = moment().set({ hour: 18, minute: 0 });

    while (startTime.isBefore(endTime)) {
      eveningSlots.push(startTime.format('h:mm A'));
      startTime.add(1, 'hour');
    }

    setEveningTimeSlots(eveningSlots);
  };

  useEffect(() => {
    // Generate the initial morning and evening time slots
    generateMorningTimeSlots();
    generateEveningTimeSlots();
  }, []);



  const handleClick = (e, index)=>{
      const date = e.target.dataset.date;
      if(e.target.classList.contains("slot-active")){
        setSlotIndex(null);
        // setUser((prev)=>({...prev, slot:""}))
      } else {
        setSlotIndex(index);
        // setUser((prev)=>({...prev, slotDate:moment(date, "DDMMYYYY")}))
        setCurrentDate(date);
      }
    }
  const handleSetUser = (newUser) => {
    userRef.current = { ...userRef.current, ...newUser };
    props.setState((prev) => ({ ...prev, user: userRef.current }));
  };

  const handleTimeSlotClick = (e, index)=>{
    const time = e.target.dataset.time;
    const timeArray = time.split(':');
    const amHour = timeArray[0].padStart(2,0);
    const pmHour = parseInt(timeArray[0])+12;
    if(currentDate){
      const formatedTime = `${currentDate}T${timeArray[1][3] === "A"? amHour : pmHour}00`;
      console.log(formatedTime)
      handleSetUser({ slot: moment(formatedTime, "YYYYMMDDTHHmm") });
    }    
  }

  useEffect(()=>{
    props.actions.handleCalendarStrip();
  },[props.state.user.slot])

  const handleMorningSlotClick = (e, index) => {
    if(e.target.classList.contains("timeslot-active")){
      setMorningSlotIndex(null);
    } else {
      setMorningSlotIndex(index);
      setEveningSlotIndex(null); 
    }
    
  };

  const handleEveningSlotClick = (e, index) => {
    if(e.target.classList.contains("timeslot-active")){
      setEveningSlotIndex(null); 
    } else {
      setEveningSlotIndex(index);
      setMorningSlotIndex(null);
    } 
  };
  
  const responsive = {
      superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  

    return (
      <div className='calendar'>
        <Carousel responsive={responsive} draggable={false} className='carousel'  >
          {dates && dates.map((date, index)=>{
            return (

              <button key={index} data-date={
                  `${date.year}${date.month.toString().length == 1 ? "0" : ""}${date.month+1}${date.date.toString().length == 1 ? "0" : ""}${date.date}`
                } 
                className={`slot ${index === slotIndex ? 'slot-active' : ''}`} onClick={(e)=>{handleClick(e,index)}} >
              {date.date} {months[date.month]}<br/>
              {days[date.day]}
            </button>
          )
          })}
          
        </Carousel>
        <div className='timeslot-container'>
          {morningTimeSlots && morningTimeSlots.map((slot,index)=>{
            return (
              <button key={index} data-time={morningTimeSlots[index]} className={`timeslot ${index === morningSlotIndex ? 'timeslot-active' : ''}` } onClick={(e)=>{
                handleMorningSlotClick(e,index);
                handleTimeSlotClick(e, index)
              }}>{slot}</button>
            )
          })}
        </div>

        <div className='timeslot-container'  >
          {eveningTimeSlots && eveningTimeSlots.map((slot,index)=>{
            return (
              <button key={index} data-time={eveningTimeSlots[index]} onClick={(e)=>{
                handleEveningSlotClick(e,index)
                handleTimeSlotClick(e, index)

              }} className={`timeslot ${index === eveningSlotIndex  ? 'timeslot-active' : ''}` }>{slot}</button>
            )
          })}
        </div>
        
      </div>
  );
  
}
