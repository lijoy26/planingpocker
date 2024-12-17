import React, { useEffect, useState } from "react";
import './Story.css';

const StoryDescription = (props) => {
  const socket = props.socket;
  const coffeeon = props.coffeeon;
  let roomOwner = props.roomOwner;
  let isPolling = props.isPolling;
  const goback = props.goback;
  const [stor, setStor] = useState('');
  const [lastSentStor,setLastSentStor] = useState("");
  const [buttonLabel, setButtonLabel] = useState("Send");
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const sendStory = () => {
    if (!coffeeon) {
      if (stor) {
        socket.emit("story", stor);
        setLastSentStor(stor);
        setButtonLabel("Edit");
        setIsInputDisabled(true);
      }
    }
  }

  const handleEditOrUpdate = () => {
    if(buttonLabel === "Edit") {
      setIsInputDisabled(false);
      setButtonLabel("Update")
    } else  if (buttonLabel === "Update") {
      socket.emit("story",stor);
      setLastSentStor(stor);
      setButtonLabel("Edit");
      setIsInputDisabled(true);
    }
  }

  const handleNext = () => {
    // setStor("");
    // setLastSentStor("");
    // setButtonLabel("Send");
    // setIsInputDisabled(false);
    goback();
    socket.emit("clearStory");
  };

  useEffect(() => {

    socket.on("story", (data) => {
      setStor(data);
      setLastSentStor(data);
      setButtonLabel("Edit");
      setIsInputDisabled(true);
    });

    socket.on("clearStory",()=>{
      setStor("");
      setLastSentStor("");
      setButtonLabel("Send");
      setIsInputDisabled(false);
    })

      return () => {
        socket.off("story");
        socket.off("clearStory");
      }
  }, [socket])

  // useEffect(()=>{
  //   if(stor.length){
  //     props.setIsDescription(false);
  //   }else{
  //     props.setIsDescription(true);

  //   }
  // },[stor])
  return (
    <div className="story" >
      <form className="form-story">
        <textarea className="textArea"
          rows="5"
          placeholder="Brief Your Story"
          value={stor}
          disabled={roomOwner === 'false' || isInputDisabled}
          onChange={({ target: { value } }) => {
            if (!coffeeon) {
              setStor(value);
              // console.log(stor);
              if (buttonLabel === "Edit") {
                setButtonLabel("Update");
              }
            }
          }}
        // onKeyPress={(event) => event.key === 'Enter' ? (event)=> { if(!coffeeon){sendStory(event)}} : null}
        />

        <div className="story-btn">
          {roomOwner === 'true' && buttonLabel === 'Send' && (
            <button className="btn sendButtons"
              onClick={(e) => {
                e.preventDefault();
                if (!coffeeon) {
                  sendStory();
                }
              }}
            >{buttonLabel}</button>)}

          {roomOwner === "true" && buttonLabel !== "Send" && (
            <button
              className="btn sendButtons"
              onClick={(e) => {
                e.preventDefault();
                if (!coffeeon) {
                  handleEditOrUpdate();
                }
              }}
              disabled={buttonLabel === "Update" && stor === lastSentStor}
            >
              {buttonLabel}
            </button>
          )}
          {roomOwner === "true" && (
            <button
              className="btn sendButtons"
              onClick={(e) => {
                e.preventDefault();
                handleNext();
              }}
            >
              Next Story
            </button>
          )}
        </div>
      </form>
    </div>

  );
};

export default StoryDescription;
