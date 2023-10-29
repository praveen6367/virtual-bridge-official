import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
// import { useNavigate } from 'react-router-dom';
import "./dashboard.css";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Preloader from '../../components/preloader/Preloader';


const Dashboard = () => {

  let navigate = useNavigate();
  let percentage_of_circle = 65;
  let circleLenght = 440;


  useEffect(() => {
    if (!sessionStorage.getItem('token'))
      navigate('/admin');
  }, []);

  setTimeout(() => {
    let number = document.querySelector(".number")
    let ProgressCircle = document.querySelector(".progress-circle");

    let counter = 0;
    setInterval(() => {
      if (counter === percentage_of_circle) {
        clearInterval();
      } else {
        counter += 1;
        number.innerHTML = counter + "%";
        ProgressCircle.style.strokeDashoffset = circleLenght - (circleLenght * counter / 100);
      }
    }, 48)

  }, 100);

  console.log(sessionStorage.getItem('token'))
  return (
    <>
      <Preloader />
      <section className="dashboard-section">
        <div className="sidebar-div">
          <Sidebar />
        </div>
        <div style={{ justifyContent: "flex-start" }} className="dashboard-content">

          <h5 className='text-white'>Dashboard</h5>
          <p className='text-white'>Welcome aboard. GriTisome</p>

          {/* three div with content */}
          <div style={{ width: "100%" }} className="row">
            <div className=' col-lg-4  dash-box'>
              <h6 style={{ textAlign: 'center', color: 'white' }}>User</h6>
              <span style={{ display: "block", textAlign: 'center', color: 'white' }}>2</span>
            </div>
            <div className=' col-lg-4 dash-box'>
              <h6 style={{ textAlign: 'center', color: 'white' }}>Menue</h6>
              <span style={{ display: "block", textAlign: 'center', color: 'white' }}>4</span>
            </div>
            <div className=' col-lg-4  dash-box'>
              <h6 style={{ textAlign: 'center', color: 'white' }}>Order</h6>
              <span style={{ display: "block", textAlign: 'center', color: 'white' }}>8</span>
            </div>

          </div>
          {/* three div with content */}

          {/* Analysis of content */}
          <div style={{ width: "100%" }} className="row">
            

            <div className="col-lg-6 circle">
              <div className="outer">
                <div className="inner">
                  <div className="number">
                    65%
                  </div>
                </div>
              </div>
              <svg >
                <circle className="progress-circle" cx="105" cy="78" r="70" fill="transparent" stroke="#673ab7" stroke-width="17 " stroke-linecap="round" ></circle>
                <text className="loading" fill='blue'>Ok</text>
              </svg>
            </div>
            <div className="col-lg-6 circle">
              <div className="outer">
                <div className="inner">
                  <div className="number">
                    65%
                  </div>
                </div>
              </div>
              <svg >
                <circle className="progress-circle" cx="105" cy="78" r="70" fill="transparent" stroke="#673ab7" stroke-width="17 " stroke-linecap="round" ></circle>
                <text className="loading" fill='blue'>Ok</text>
              </svg>
            </div>

          </div>

        </div>
      </section>
    </>
  )
}

export default Dashboard;
