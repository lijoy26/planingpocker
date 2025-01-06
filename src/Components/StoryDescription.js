import React, { useEffect, useState } from "react";
import './Story.css';

const StoryDescription = (props) => {
  const clearJiraLink = props.clearJiraLink
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
        socket.emit("isStoryAvailable",true);
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
    
    goback();
    socket.emit("clearStory");
    socket.emit("clearJiraLink");
    socket.emit("isStoryAvailable",false);
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
    });

    socket.on("clearJiraLink",()=>{
      clearJiraLink();
    })

      return () => {
        socket.off("story");
        socket.off("clearStory");
      }
  }, [socket])

 
  return (
    <div className="story" >
      <form className="form-story">
        <textarea className="textArea"
          rows="5"
          placeholder="Brief Your Story"
          value={stor}
          disabled={!roomOwner || isInputDisabled}
          onChange={({ target: { value } }) => {
            if (!coffeeon) {
              setStor(value);
              
              if (buttonLabel === "Edit") {
                setButtonLabel("Update");
              }
            }
          }}
        />

        <div className="story-btn">
          {roomOwner  && buttonLabel === 'Send' && (
            <button className="btn sendButtons"
              onClick={(e) => {
                e.preventDefault();
                if (!coffeeon) {
                  sendStory();
                }
              }}
              disabled={!stor.trim()}
            >{buttonLabel}</button>)}

          {roomOwner  && buttonLabel !== "Send" && (
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
          {roomOwner && (
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
