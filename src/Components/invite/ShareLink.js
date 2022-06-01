import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
import "./Sharelink.css";
import {CopyToClipboard} from 'react-copy-to-clipboard';



function ShareLink() {
  const [copied, setCopied] =useState(false);
  const [k, sk] = useState("");
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const cal = queryParams.get("cardVale");
    const type = queryParams.get("room");
    const linkz = window.location.href.slice(0,window.location.href.lastIndexOf('/'));

    var kite =
      linkz + "/poker?name=&room=" + type + "&cardVale=" + cal;
    
    sk(kite);
  }, []);

 
  return (
    <div className="Share" onBlur={() => setCopied(false)}>
      <label htmlFor="popup-2" className="sr-only">ShareLink</label>
        <Popup aria-label="Copied"
          trigger={<button className="btn invitebutton" id="popup-2"> Invite Link</button>}>     
            <div className="popc">
              <textarea className="pop" style={{fontSize: '11px', fontWeight: 'bold', padding: '5px'}} value={k} readOnly></textarea>
              <CopyToClipboard aria-hidden="true" text={k} onCopy={() => setCopied(true)}>
                
                <span className="copyText" style={{color: '#c10e21', fontWeight: 'bold'}}><i class="fa fa-clipboard" id="tag"></i></span>

              </CopyToClipboard>
            </div>
            {copied ?
            <div className="copied" style={{color: '#c10e21', fontWeight: 'bold', fontSize: '12px', paddingTop: '5px', paddingLeft: '2px'}}>
                Copied to Clipboard
            </div>
            : ''}
        </Popup>
    </div>
  );
}

export default ShareLink;