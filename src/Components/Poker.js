/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import Logo from "./Logo";
import ShareLink from "./invite/ShareLink";

import StoryDescription from "./StoryDescription";
import "./poker.css";
import { useHistory } from "react-router";
import Card from "./Card";
import Table from "./Table";
import Hamburger from "./Hamburger";
import UsersInRoom from "./UsersInRoom";
import Cofee from "./Cofee";
import $, { error } from 'jquery';
import Timer from "./Timer";
import { getSocket } from "./Socket";
// import socket from "./Socket";

// const socket = io.connect(location.origin);
const socket = getSocket();
var chooseTime = 0;

var series = "";
var cardVales = "";
var value = "";

const Poker = () => {
  let interval;
  const history = useHistory();
  var [name, setName] = useState("");
  let [roomOwner, setRoomOwner] = useState(false)
  const [room, setRoom] = useState("");
  var [cardVale, setCardVal] = useState([""]);
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isDescription, setIsDescription] = useState(true);

  const [hand, setHand] = useState([]);
  const [hand2, setHand2] = useState([]);
  const [selected, setSelected] = useState("");
  const [placed, setPlaced] = useState([]);
  const [numberofuser, setNumberofuser] = useState(null);
  const [flag, setFlag] = useState(false);

  const [on, setOn] = useState(false);
  const [chatT, setChatT] = useState(false);
  const [onBlur, setOnBlur] = useState(true);
  var [noName, setNoName] = useState(false);
  var [flags, noflags] = useState(0);
  const [coffeeon, setCoffeeOn] = useState(false);

  const [valuelist, setValuelist] = useState([]);

  const [isPolling, setIsPolling] = useState(false);
  const [enablePolling, setEnablePolling] = useState(false);

  useEffect(() => {
    var { name, room, cardVale, roomOwner } = queryString.parse(location.search);
    // roomOwner = roomOwner ? roomOwner : false;

    roomOwner = roomOwner === 'true'
    setRoom(room);
    setName(name);
    setRoomOwner(roomOwner)
    if (!name) {
      setNoName(true);
    }
    series = cardVale;
    cardVale = series.split(",");
    cardVales = series.split(",");
    cardVale.forEach((element) => {
      console.log(element.toString());
      setCardVal([...cardVale, element]);
    });
    // console.log(cardVales);
    // setCardVal(...cardVal,cardVal);

    socket.emit("join", { name, room, roomOwner, cardVale }, (error) => {
      if (error) {
        console.error("Join error:", error);
      }
      //   // setBackerror('1');
      // }
    });
    if (roomOwner) {
      socket.on("admin", () => {
        // console.log("The admin user");
      });
    }
  }, [socket, location.search]);
  useEffect(() => { }, [socket]);
  //Chat

  useEffect(() => {
    if (!coffeeon) {
      socket.on("message", (message) => {
        setMessages((messages) => [...messages, message]);
      });

      socket.on("roomData", ({ users }) => {
        setUsers(users);
        console.log(users);
      });

      socket.on("receive", (data) => { });

    }
  }, []);

  //cards
  useEffect(() => {
    if (!coffeeon) {
      addCards();
    }
  }, []);

  useEffect(() => {
    socket.on("playerdet", (data) => {
      setNumberofuser(data);
    });
    socket.on("preach", (data) => {
      if (data === "reset") {
        setFlag(0);
        addCards();
        setValuelist([])
      }
    });

    socket.on("selected", (data) => {
      setSelected(data);
    });

  }, [socket]);

  //goback reset

  const goback = () => {
    console.log("Reset");
    if (!coffeeon) {
      socket.emit("preach", "reset");
      if (isPolling) {
        socket.emit("poll", "false")
      }
      if (enablePolling) {
        socket.emit("enable", "false")
      }
    }
  };

  const addCards = () => {
    if (interval) {
      clearInterval(interval);
    }
    let count = cardVales.length;

    setHand([cardVales[count - 1]]);
    setHand2([cardVales[count - 1]]);
    interval = setInterval(() => {
      --count;
      if (count === 0) {
        clearInterval(interval);
        interval = null;
        return;
      }
      setHand((prevValues) => [...prevValues, cardVales[count - 1]]);
      setHand2((prevValues) => [...prevValues, cardVales[count - 1]]);
    }, 100);

  };
  const removeCard = (value) => {
    setHand((prevValues) => prevValues.filter((e) => e !== value));
    setPlaced(value);
    setFlag(1);
    //Unmount required
    console.log('selected')
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (!coffeeon) {
      if (message) {
        socket.emit("sendMessage", message, () => setMessage(""));
      }
    }
  };
  //Name Functions
  function handleFlag(e) { 
    value = value.trim().charAt(0).toUpperCase() + value.trim().slice(1).toLowerCase();
    setName(value);
    setOn(!on);
    history.push(`/poker?name=${value}&room=${room}&roomOwner=${roomOwner}&cardVale=${series}`, {
      some: "state",
    });
  }
  const cafe = () => {
    var { name, room, roomOwner, cardVale } = queryString.parse(location.search);

    console.log(flags)
    if (flags === 0) {

      socket.disconnect()
      setCoffeeOn(true)
      console.log("disconnect")

      noflags(1)
    }
    else {
      setCoffeeOn(false)
      socket.emit("join", { name, room, roomOwner, cardVale }, (error) => {
        // if (error) {
        //   alert(error);
        //   // setBackerror('1');
        // }
      });
      socket.open();
      history.push(`/poker?name=${name}&room=${room}&roomOwner=${roomOwner}&cardVale=${series}`, {
        some: "state",
      });
      console.log("connect")
      noflags(0)
    }
  }
  const Log = (props) => {
    return (
      <div className={on ? "off" : null} id="name">
        <div className="overlay-name">
          <div className="noname-form">
            <input
              type="text"
              name="sda"
              id="asd"
              placeholder="Enter your name"
              onChange={(e) => {
                value = e.target.value;
              }}
              required
            />
            <button
              type="button"
              className="name-button"
              onClick={(e) => {
                handleFlag(value);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };
  const RemoveLog = (props) => {
    return (
      <div>

      </div>
    );
  };

  function Status(props) {
    const noName = props.noName;

    if (noName) {
      return (
        <Log />
      );
    }
    return (<RemoveLog />);
  }
  const startPoll = (event) => {
    event.preventDefault();
    if (!coffeeon) {
      if (!isPolling) {
        socket.emit("poll", "true")
        if (!enablePolling

        ) {
          socket.emit("enable", "true")
        }
      }
    }
  }
  useEffect(() => {
    socket.on("poll", (data) => {
      if (data === 'true') {
        setIsPolling(true)
      }
      else
        setIsPolling(false)
    })
  }, [socket])

  useEffect(() => {
    socket.on("enable", (data) => {
      if (data === 'true')
        setEnablePolling(true)
      else
        setEnablePolling(false)
    })
  }, [socket])


  const showUsers = () => {

    socket.emit('getusers', { name, room }, (error) => {
      // if(error) {
      //   alert(error);
      // }
    });

  }




  const [linkChange, setLinkChange] = useState('');
  const [showLinks, setShowLinks] = useState(true);
  const [showJira, setShowJira] = useState(true);
  const [isJira, setIsJira] = useState(true);

  const sendJira = (event) => {
    event.preventDefault();

    socket.emit("jira", linkChange)
  }

  const clearJiraLink = () => {
    setLinkChange(""); 
  };

  useEffect(() => {
    if (!coffeeon) {
      socket.on("jira", (data) => {
        setLinkChange(data);
      })
    }
  }, [socket])
  useEffect(() => {
    console.log(linkChange);
    if (linkChange.length) {
      setIsJira(false);
    } else {
      setIsJira(true);
    }
  }, [linkChange])

  return (
    <div
      className={
        onBlur ? "notBlur" : "Blur"
      }
    >
      <div className="unBlurred">
        <Status noName={noName} />
      </div>
      <header className="NavBar">
        <nav className="navbar navbar-expand-lg navbar-light">
          <Logo className="hbLogo" room={room} name={name} />
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav  d-flex Title">
              <li className="nav-item">
                {/* <div className="User">
                  <div className="UserName">  */}
                {name}
                {/* </div>
                </div> */}
              </li>
              <li className="nav-item">
                <ShareLink room={room} cardVal={cardVale} />
              </li>
              {/* <li className="nav-item">
                
                />
              </li> */}
            </ul>
          </div>

        </nav>

      </header>
      <div className="m-content">
        <div>
          <UsersInRoom users={users} />
        </div>
        <main className="main-content"> 
          <div>
            {flag !== 1 ? (
              <div className="Cards">
                <div className="cardK" role="group" aria-labelledby="cardgroup">
                  <label id="cardgroup" className="sr-only">Pointer stories</label>
                  {hand.map((value, index) => (
                    <Card
                      key={value}
                      index={index}
                      value={value}

                      enablePolling={enablePolling}
                      isJira={isJira}
                      onClick={() => {
                        removeCard(value);
                        showUsers()
                      }
                      }
                    />
                  ))
                  }
                </div>
              </div>
            )
              :
              (
                <Table
                  hand={hand2}
                  value={placed}
                  socket={socket}
                  usersnum={numberofuser}
                  goback={goback}
                  users={users}
                  valuelist={valuelist}
                  setValuelist={setValuelist}
                  coffeeon={coffeeon}
                  roomOwner={roomOwner}
                />
              )}
          </div>
          <div className="poll-button-container">
            {roomOwner && !isPolling ? (<button className="btn pollButtons" onClick={startPoll}>Poll</button>) : (<></>)}
          </div>
          <Timer isPolling={isPolling} coffeeon={coffeeon} />
          <div className="Jira-outer-link">
            {showLinks ? (
              <div className="Jira-link">
                <a
                  className={`Jira-text ${linkChange ? "active-link" : "disabled-link"}`}
                  href={linkChange.startsWith("http") ? linkChange : `https://${linkChange}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={linkChange ? 0 : -1} 
                >
                  Jira Link
                </a>
                {roomOwner && (
                  <button
                    aria-label="Jira Link Edit"
                    className="btn rounded"
                    onClick={() => setShowLinks(false)}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                )}
              </div>
            ) : (
              <div className="Jira-link">
                <input
                  type="text"
                  className="Jira-Text"
                  value={linkChange}
                  onChange={({ target: { value } }) => setLinkChange(value)}
                  placeholder="Enter Jira Link"
                />
                <button
                  className="btn Jira-button"
                  onClick={(event) => {
                    setShowLinks(true);
                    sendJira(event);
                  }}
                >
                  Save
                </button>
              </div>
            )}
          </div>

          <div className="storyDes ">

            <StoryDescription socket={socket} setIsDescription={setIsDescription} roomOwner={roomOwner} isPolling={isPolling} startPoll={startPoll} goback={goback} clearJiraLink={clearJiraLink} />
          </div>

          <div className={flags === 1 ? "disconnect" : "connect"}>
            <Cofee onClick={() => {
              if (!isPolling
              ) { cafe() }
            }} />
          </div>

          <div className="Hamburgericon" >
            <Hamburger
              chatT={chatT}
              setMessage={setMessage}
              room={room}
              name={name}
              sendMessage={sendMessage}
              message={message}
              messages={messages}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Poker;
