/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import Placedcard from "./Placedcard";
import Result from "./Result";
import Backcard from "./backcard";
import './Table.css'
const Table = (props) => {
  const hand = props.hand;
  const socket = props.socket;
  var [valuelist, setValuelist] = useState([]);
  const coffeeon = props.coffeeon;
  valuelist = props.valuelist
  setValuelist = props.setValuelist
  useEffect(() => {
    if (!coffeeon) {
      socket.emit("selected", props.value)
    }
  }, [socket]);
  useEffect(() => {
    socket.on("preach", (data) => {
      if (data !== 'reset') {
        console.log(data)
        setValuelist(data.map((value) => value.worth));

        console.log(valuelist)
      }
      if (data === 'reset') {
        setValuelist([]);
        console.log(valuelist)
      }
    })

  }, [socket]);
  return (
    <div className="theTable">
      <div className="cardplaced">
        <div className="Results">
          {valuelist.indexOf("waiting") < 0 ? (
            <Result
              hand={hand}
              valuelist={valuelist}
              goback={props.goback}
              coffeeon={coffeeon}
              roomOwner={props.roomOwner}
            />
          ) : (<p></p>)}
        </div>
        <div className="placedCards">
          {valuelist.map((value, index) =>
            value !== 'waiting' ? (
              <Placedcard
                key={index}
                value={value}
                user={props.users[index]}
              />
            ) : (
              <Backcard key={index}
                user={props.users[index]}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
export default Table;