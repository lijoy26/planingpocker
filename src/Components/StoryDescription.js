import React, { useEffect, useState } from "react";
import './Story.css';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

const StoryDescription = (props) => {
  const clearJiraLink = props.clearJiraLink
  const socket = props.socket;
  const coffeeon = props.coffeeon;
  let roomOwner = props.roomOwner;
  let isPolling = props.isPolling;
  const goback = props.goback;
  const [stor, setStor] = useState('');
  const [lastSentStor, setLastSentStor] = useState("");
  const [buttonLabel, setButtonLabel] = useState("Send");
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [stories, setStories] = useState([]);
  const [bulkInput, setBulkInput] = useState('');
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(null);
  const [newStoryText, setNewStoryText] = useState("");

  const sendStory = () => {
    if (!coffeeon) {
      if (stor) {
        socket.emit("story", stor);
        socket.emit("isStoryAvailable", true);
        setLastSentStor(stor);
        setButtonLabel("Edit");
        setIsInputDisabled(true);
      }
    }
  }

  const handleEditOrUpdate = () => {
    if (buttonLabel === "Edit") {
      setIsInputDisabled(false);
      setButtonLabel("Update")
    } else if (buttonLabel === "Update") {
      socket.emit("story", stor);
      setLastSentStor(stor);
      setButtonLabel("Edit");
      setIsInputDisabled(true);
    }
  }

  const handleNext = () => {
    if (stories.length === 0) {
      goback();
      socket.emit("clearStory");
      socket.emit("clearJiraLink");
      socket.emit("isStoryAvailable", false);
      setStor("");
      setButtonLabel("Send");
      setIsInputDisabled(false);
      return;
    }

    if (currentStoryIndex >= stories.length - 1) {
      goback();
      socket.emit("clearStory");
      socket.emit("clearJiraLink");
      socket.emit("isStoryAvailable", false);
      setStor("");
      setButtonLabel("Send");
      setIsInputDisabled(false);
      return;
    }
    const nextIndex = currentStoryIndex + 1;
    setCurrentStoryIndex(nextIndex);
    setStor(stories[nextIndex]);
    setButtonLabel("Send");
    setIsInputDisabled(false);
    goback();
    socket.emit("isStoryAvailable", false);
    socket.emit("clearJiraLink");
    socket.emit("activeStoryIndex", nextIndex)
  };


  const handleBulkAdd = () => {
    const newStories = bulkInput.split("\n").map(line => line.trim()).filter(line => line.length > 0);
    const updatedStories = [...stories, ...newStories];
    setStories(updatedStories);
    setBulkInput('');
    setCurrentStoryIndex(0);

    if (!stor && newStories.length > 0) {
      setStor(newStories[0]);
    }
    console.log("stories on line 95", updatedStories);
    socket.emit("updateStoryList", updatedStories);
  }

  const handleSelectStory = (index) => {
    if (!roomOwner) return;
    setCurrentStoryIndex(index);
    setStor(stories[index]);
    setButtonLabel("Send");
    setIsInputDisabled(false);
    socket.emit("activeStoryIndex",index);
  }

  const handleStoryEdit = (index) => {
    setSelectedStoryIndex(index);
    setNewStoryText(stories[index]);
    setEditModalOpen(true);
  }

  const handleStoryDelete = (index) => {
    setSelectedStoryIndex(index);
    setDeleteModalOpen(true);
  }

  const saveEditedStory = () => {
    const updatedStories = [...stories];
    updatedStories[selectedStoryIndex] = newStoryText.trim();
    setStories(updatedStories);

    if (selectedStoryIndex === currentStoryIndex) {
      setStor(newStoryText.trim());
    }

    socket.emit("updateStoryList", updatedStories);

    setEditModalOpen(false);
    setSelectedStoryIndex(null);
  }

  const confirmDeleteStory = () => {
    const updatedStories = stories.filter((_, i) => i !== selectedStoryIndex);
    setStories(updatedStories);

    if (selectedStoryIndex === currentStoryIndex) {
      setStor("");
      setCurrentStoryIndex(0);
    } else if (selectedStoryIndex < currentStoryIndex) {
      setCurrentStoryIndex((prevIndex) => prevIndex - 1);
    }

    socket.emit("updateStoryList", updatedStories);

    setDeleteModalOpen(false);
    setSelectedStoryIndex(null);
  }

  useEffect(() => {

    socket.on("story", (data) => {
      setStor(data);
      setLastSentStor(data);
      setButtonLabel("Edit");
      setIsInputDisabled(true);
    });

    socket.on("clearStory", () => {
      setStor("");
      setLastSentStor("");
      setButtonLabel("Send");
      setIsInputDisabled(false);
    });

    socket.on("clearJiraLink", () => {
      clearJiraLink();
    })

    socket.on("activeStoryIndex", (index) => {
        console.log("index",index);
        setCurrentStoryIndex(index);
        setButtonLabel("Send");
        setIsInputDisabled(false);
    });

    socket.on("storyList", (storyList) => {
      setStories(storyList);
      if (storyList.length > 0) {
        setCurrentStoryIndex(0);
        // setStor(storyList[0]);
        setButtonLabel("Send");
        setIsInputDisabled(false);
      }
    });

    return () => {
      socket.off("story");
      socket.off("clearStory");
      socket.off("storyList");
      socket.off("activeStoryIndex");
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
          {roomOwner && buttonLabel === 'Send' && (
            <button className="btn sendButtons"
              onClick={(e) => {
                e.preventDefault();
                if (!coffeeon) {
                  sendStory();
                }
              }}
              disabled={!stor.trim()}
            >{buttonLabel}</button>)}

          {roomOwner && buttonLabel !== "Send" && (
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
      {roomOwner && (
        <div className="bulk-add">
          <textarea
            className="bulk-textArea"
            rows="5"
            placeholder="Add Stories here"
            value={bulkInput}
            onChange={({ target: { value } }) => setBulkInput(value)}
          />
          <button
            className="btn addButton"
            onClick={(e) => {
              e.preventDefault();
              handleBulkAdd();
            }}
            disabled={!bulkInput.trim()}
          >
            Add
          </button>
        </div>
      )}
      {
        stories.length > 0 && (
          <div className="story-list">
            <ul>
              {stories.map((story, index) => (
                <li
                  key={index}
                  className={`story-item ${index === currentStoryIndex ? "active" : ""
                    }`}
                  onClick={() => handleSelectStory(index)}
                >
                  {story}
                  {roomOwner && (
                    <div>
                      <MdEdit color='#007BFF' onClick={() => {
                        handleStoryEdit(index)
                      }} />
                      <MdDelete color='#9D0B1B' onClick={() => {
                        handleStoryDelete(index)
                      }} />
                    </div>)
                  }
                </li>
              ))}
            </ul>
          </div>
        )}
      <EditModal
        isOpen={isEditModalOpen}
        storyText={newStoryText}
        setStoryText={setNewStoryText}
        onClose={() => setEditModalOpen(false)}
        onSave={saveEditedStory}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteStory}
      />
    </div>
  );
};

export default StoryDescription;
