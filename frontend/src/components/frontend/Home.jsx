// import React from 'react'


import Footer from '../common/Footer';
import Header from '../common/Header';
import Icon1 from '../../assets/images/icon-1.svg';
import Icon2 from '../../assets/images/icon-2.svg';
import Icon3 from '../../assets/images/icon-3.svg';
import 'swiper/css';
import 'swiper/css/pagination';
import About from '../common/About';
// import { apiUrl } from '../common/Http';
// import { useEffect, useState } from 'react';
import LatestServices from '../common/LatestServices';
import LatestProjects from '../common/LatestProjects';
import LatestArticles from '../common/LatestArticles';
import ShowTestimonial from '../common/ShowTestimonial';

const Home = () => {

  

  return (
     <>
      <Header />
      <main>
         { /* Hero section */}
          <section className='section-1'>
             <div className='hero d-flex align-items-center'>
               <div className="container-fluid">
                  <div className="text-center">
                     <span>Welcome Amazing Constructions</span>
                     <h1>Crafting dreams with <br />
                     precsion and excellence.</h1>
                     <p>As a construction company, we delivering top-quality residential and commercial projects <br /> We bring your vision to life, ensuring every detail is crafted to perfection.</p>
                     <div className="mt-4">
                         <a href="#" className='btn btn-primary large'>Contact Now</a>
                         <a href="#" className='btn btn-secondary ms-3 large'>View Projects</a>
                     </div>
                  </div>
               </div>
             </div>
          </section>
          { /* About section */}

           <About />
            
            { /* services section */}
            <LatestServices />

            { /* why choose us section */}
            <section className='section-4 py-5'>
              <div className='container py-5'>
              <div className='section-header text-center'>
                      <span>Why Choose Us</span>
                      <h2>Discover our wide variety of projects</h2>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit labore sintamet ducimus soluta omnis quasi<br></br> Tempora nulla eius illodio labore saepe laboriosam maiores accusantium.</p>
              </div>
              <div className='row py-5'>
                <div className='col-md-4'>
                  <div className='card shadow border-0 p-4'>
                    <div className='card-icon'>
                      <img src={Icon1} alt="" />
                    </div>
                    <div className='card-body'>
                      <h5 className='card-title'>High-Quality Construction</h5>
                      <p className='card-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel arcu id velit sagittis.</p>
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                  <div className='card shadow border-0 p-4'>
                    <div className='card-icon'>
                      <img src={Icon2} alt="" />
                    </div>
                    <div className='card-body'>
                      <h5 className='card-title'>Cutting Edge Solution</h5>
                      <p className='card-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel arcu id velit sagittis.</p>
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                  <div className='card shadow border-0 p-4'>
                    <div className='card-icon'>
                      <img src={Icon3} alt="" />
                    </div>
                    <div className='card-body'>
                      <h5 className='card-title'>High-Quality Construction</h5>
                      <p className='card-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel arcu id velit sagittis.</p>
                  </div>
                </div>
              </div>
              </div>
              </div>
            </section>

            { /* projects section */}
            <LatestProjects />

            { /* testimonials section */}
            <ShowTestimonial />

            { /* blogs section */}
            <LatestArticles />
      </main>
      <Footer />
    </>
  )
}

export default Home
