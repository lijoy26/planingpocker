import React from 'react'
import LinkIcon from "../assets/Icons/link-icon.png"

const JiraLink = ({linkChange,setLinkChange,showLinks,setShowLinks,roomOwner,sendJira}) => {

  return (
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
          <img src={LinkIcon} className={`jira-link-icon ${linkChange ? "active-icon" : "disabled-icon"}`} />
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
  )
}

export default JiraLink
