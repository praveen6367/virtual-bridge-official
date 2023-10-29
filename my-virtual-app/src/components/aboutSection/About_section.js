import React from 'react'
import './about_section.css';
import {
    BrowserRouter as Router,
    Link,
} from 'react-router-dom';

import { useNavigate } from "react-router-dom";


const about_section = () => {
  return (
   <>
     <section className="row p-4 ">
          <div className="image-div p-5 col-lg-6">
              <img src="/IMAGE/home-section-pic.jpeg"  alt="img"/>
          </div>
          <div className="p-5 col-lg-6">
                <h2 className="py-2" style={{textAlign: 'center'}}><span  style={{ "color": " #37cdcf" }}>Who We </span>Are</h2>
                <p>Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum</p>

                <p>Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem Ipsum</p>

                <Link   className="blue-btn text-red mx-5 nav-item nav-link" to="#">Read more</Link>
          </div>
     </section>
   </>
  )
}

export default about_section
