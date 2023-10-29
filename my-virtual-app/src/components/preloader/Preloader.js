import React from 'react'
import "./preloader.css";

const Preloader = () => {


  setTimeout(() => {

    let loaded = document.querySelector("#se-pre-con")
    loaded.classList.add("addc");

  }, 1500)


  return (
    <>
      <div id='se-pre-con' class='hu'></div>
    </>
  )
}

export default Preloader
