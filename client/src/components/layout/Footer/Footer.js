import React from 'react'
import appStore from "../../images/AppStore.png"
import playStore from "../../images/googleplaystore.png"
import "./Footer.css"

const Footer = () => {
  return (
    <footer id="footer">
        <div className="leftFooter">
            <h3>DOWNLOAD OUR APP</h3>
            <p>Download App for Android and IOS mobile phone</p>
            <img src={playStore} alt="playstore" />
            <img src={appStore} alt="Appstore" />

        </div>
        <div className="midFooter">
            <h1>PRAVIAA.</h1>
            <p>High Quality is our first priority</p>

            <p>Copyrights 2023 &copy; Praviaa</p>
        </div>
        <div className="rightFooter">
            <h3>FOLLOW US</h3>
            <a href='http://google.com/'>Instagram</a>
            <a href='http://google.com/'>Facebook</a>
            <a href='http://google.com/'>Twitter</a>
        </div>
    </footer>
  )
}

export default Footer