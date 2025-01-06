/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import Placedcard from "./Placedcard";
import Result from "./Result";
import Backcard from "./backcard";
import './Table.css'
const Table = (props) => {
  const hand = props.hand;
  const setResultsDisplayed = props.setResultsDisplayed;
  const socket = props.socket;
  const [votes, setVotes] = useState({});
  const coffeeon = props.coffeeon;
  useEffect(() => {
    if (!coffeeon) {
      socket.emit("selected", props.value)
    }
  }, [socket]);

  useEffect(() => {
    socket.on("preach", (data) => {
      if (data === "reset") {
        setVotes({});
      } else {
        const updatedVotes = data.reduce((acc, user) => {
          acc[user.id] = user.worth;
          return acc;
        }, {});
        setVotes(updatedVotes);
      }
    })

    socket.on("roomData", (data) => {
      const updatedVotes = data.users.reduce((acc, user) => {
        acc[user.id] = user.worth;
        return acc;
      }, {});
      setVotes(updatedVotes);
    })


  }, [socket]);

  const allVotesComplete = !Object.values(votes).includes("waiting");
  console.log(Object.values(votes));
  console.log("votes", votes);
  useEffect(() => {
    setResultsDisplayed(allVotesComplete);
    console.log("allvotes",allVotesComplete);
    if (allVotesComplete) {
      
    }
  }, [allVotesComplete, setResultsDisplayed, socket]);

  return (
    <div className="table-comp">
      <div className="theTable">
        <div className="cardplaced">
          <div className="placedCards">
            {
              props.users.map((user) =>
                votes[user.id] !== "waiting" ? (
                  <Placedcard key={user.id} value={votes[user.id]} user={user} />
                ) : (
                  <Backcard key={user.id} user={user} />
                )
              )
            }
          </div>
        </div>
      </div>
      <div className="Results">
        {allVotesComplete ? (
          <Result
            users={props.users}
            hand={hand}
            valuelist={Object.values(votes)}
            goback={props.goback}
            coffeeon={coffeeon}
            roomOwner={props.roomOwner}
          />
        ) : (<p></p>)
        }
      </div>
    </div>
  )
}
export default Table;