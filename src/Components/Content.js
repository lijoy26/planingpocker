

// Cards
import Card1 from '../assets/Cards/Horizontal/Group7094.svg'
import Card2 from '../assets/Cards/Horizontal/Group9379.svg'
import Card3 from '../assets/Cards/Horizontal/Group9006.svg'
import Card4 from '../assets/Cards/Horizontal/Group18155.svg'
import Card5 from '../assets/Cards/Horizontal/Group14790.svg' 
import Card6 from '../assets/Cards/Horizontal/Group58162.svg'

import Card7 from '../assets/Cards/Vertical/Group31141.svg'
import Card8 from '../assets/Cards/Vertical/Group28237.svg'
import Card9 from '../assets/Cards/Vertical/Group7422.svg' 
import Card10 from '../assets/Cards/Vertical/Group21173.svg'
import React, { useEffect, useState,useRef } from 'react'
import { Link,useHistory } from "react-router-dom"

// import $ from 'jquery';
import CreatableSelect from "react-select/creatable";
// Title

import planningTitle from '../assets/Title/Group58173.svg' 
import '../Components/content.css'


const options = [
   
   { value: ["0","1","2","3","5","7","13","?"], label: "Fibb [0,1,2,3,5,7,13,?]" },
   { value: ["0","1","2","3","5","7","13","?"], label: "Modified Fibb [0,0.5,2,3,5,8,13,?]" },
  
 ];
const  Content= () => {
      const history=useHistory()
      const [name, setName] = useState('');
      const [room, setRoom] = useState('');
      const [cardVal, setCardVal] = useState('');
      const [errors, setErrors] = useState('');
      const [formErrors, setFormErrors] = useState({});
      const [focus,setfocus] =useState(false); 
      const [patternValue, setPatternValue] = useState()
      
    const handleChange = (field, value) => {
      switch (field) {
        case 'roles':
          setPatternValue(value);
         for(var i in value){
            if(i==="value"){
               setCardVal(value[i])
            }
         }
         setTimeout(() => {
            console.log(patternValue);
          console.log(cardVal);
         }, 2000);
          
          break
  
        default:
          break
      }
    }



    const userSubmit=(event)=>{
      event.preventDefault()
      setErrors("")
     if( !cardVal )
        setErrors("*Select the options!" )
     else
        history.push(`/poker?name=${name}&room=${room}&cardVale=${cardVal}`)
     
   }
   
  

    const handleClick =( value) =>{    
       if(!value){
          alert("Required!!");
       }
           setPatternValue(value);
           setTimeout(() => {
            console.log(patternValue);
          console.log(cardVal);
         }, 2000);
           
       }

      
       const customStyles = {
         
          container: provided => ({
            ...provided,
            '&:focus': { outline: 2+'px solid #E17509 !important',  boxShadow: '0 0 4px 4px #dd8f40 !important'},
            width: 100+'%',
            display:'flex'
          }),
          control: (provided,state) => ({
            ...provided,
            '&:focus': {  border: 2+'px solid #E17509 !important', outline: 2+'px solid #E17509 !important',  boxShadow: '0 0 4px 4px #dd8f40 !important'},
            width: 100+'%',
            height:40+'px',
            border: state.isFocused && 1+'px solid #E17509 !important',
            boxShadow: state.isFocused && '0 0 3px 3px #E17509 !important'
          }),
          singleValue: provided => ({
            ...provided,
            color:'#495057 !important',
            paddingInline:10+'px',
            height:40+'px important'
          }),
          valueContainer: provided => ({
            ...provided,
         
            padding:0+'px',
            height:40+'px important'
          }),
          indicatorSeparator: provided => ({
            ...provided,
            display:'none'
          }),
          indicatorsContainer: provided => ({
            ...provided,
            height:40+'px'
          }),
          input: provided => ({
            ...provided,
            margin:0+'px',
            padding:0+'px',
            paddingLeft:10+'px'
          }),
          placeholder: provided => ({
            ...provided,
            marginLeft:10+'px',
            color:'#495057ad'
          })
       }


       
    return (
         
         <div className="content" id ="contents"> 
               <div className="title ">
                  <div className="postioning">
                     <img id="Pointing-Poker-Text" src={planningTitle} alt="Title Text Pointing Poker" />
                    
                  </div>
               </div>
               {/* Cards here */}
               <div className="cards ">
                  <div id="cardHorizontal" className="CardH cardT">
                     <img src={Card1} alt="" />
                     <img src={Card2}  alt=""  />
                     <img src={Card3}  alt="" />  
                  </div>
                  <div className="outerLogin">
                  <div id="cardVertical" >
                     <img src={Card7} className="cardV" alt="" />
                     <img src={Card8} className="cardV" alt=""  />
                  </div>
                  <div id='loginDivBlock' className="Login">
                     <form className="d-flex flex-column p-2" name="myForm" action="form.html" method="post" onSubmit={e => {userSubmit(e)}} >
                        <p aria-label="Create a room" id = "loginHead"> CREATE/JOIN </p>
                        
                      <input className="Input1 form-control" type="text"  aria-label="Enter User ID"   placeholder="User Name" name="uname" required  onChange={(event) =>setName(event.target.value)}/>
                      <p className='formerror'>{formErrors.name}</p>

                        <input className="Input2 form-control"type="text" aria-label="Enter Room ID" placeholder="Room ID" name="roomid" required onChange={(event) =>setRoom(event.target.value)}/>
                        <p className='formerror'>{formErrors.room}</p>

                       
                        <label htmlFor="react-select-3-input" className="sr-only">Select your Pattern</label>
                        <div className="selectCreate" >
                              <CreatableSelect
                           
                             
                              styles={customStyles}
                              isClearable
                              onChange={(value) => handleChange('roles', value)}
                              value={patternValue}
                              options={options}
                              isFocused={focus}
                              onClick={(event) => {
                                 handleClick(event.target.value); 
                                 event.preventDefault()}}   
                                 />
                           </div>
                           <p id='formerror'>{formErrors.cardval}</p>
                           <p className="errstyle">{errors}</p>
                           <button type="submit" className="loginButton" aria-label="Submit" >Enter</button>
                        
                     </form>
                    
                  </div>
                  <div id="cardVertical" >
                     <img src={Card9} className="cardV"alt="" />
                     <img src={Card10} className="cardV" alt=""  />
                  </div>
                  </div>
                  <div id="cardHorizontal" className="CardH cardB">
                     <img src={Card4} alt=""   />
                     <img src={Card5} alt="" />
                     <img src={Card6} alt=""  />  
                  </div>
               </div>

      </div>
          
      
      );
}
 
export default Content;