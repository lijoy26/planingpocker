import React from 'react'
import Logo from "./Logo";
import ShareLink from "./invite/ShareLink";

const Navbar = ({room,name,cardVale}) => {
  return (
    <header className="NavBar">
        <nav className="navbar navbar-expand-lg navbar-light">
          <Logo className="hbLogo" room={room} name={name} />
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav  d-flex Title">
              <li className="nav-item">
                <div className="User">
                  <div className="UserName">
                    {name}
                  </div>
                </div>
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
  )
}

export default Navbar
