// import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Hero from '../common/Hero';
import { useEffect, useState } from 'react';
import { apiUrl, fileUrl } from '../common/Http';

const Services = () => {
  const [services, setServices] = useState([]);

  const fetchAllServices = async () => {
    const response = await fetch(apiUrl+'get-services',{
      'method': 'GET',
   });
    const result = await response.json();
    setServices(result.data)
    // console.log(result);
  }

  useEffect(() => {
    fetchAllServices();
 },[]);

  return (
    <>
     <Header />
      <main>
      <Hero preHeading='Quality. Integrity. Value.'
                heading='Services'
                text='We delivering top-quality residential and commercial projects <br /> We bring your vision to life, ensuring every detail is crafted to perfection.'
          />
          <section className='section-3 bg-light py-5'>
              <div className='container py-5'>
                <div className='row'>
                  <div className='section-header text-center'>
                            <span>Our Services</span>
                            <h2>Our Construction Services</h2>
                            <p>We bring your vision to life, ensuring every detail is crafted to perfection.</p>
                  </div>
                  <div className='row pt-5'>
                       {
                         services && services.map(service => {
                           return (
                            <div className='col-md-4 col-lg-4' key={service.id}>
                            <div className='item'>
                              <div className='service-img'>
                                 <img src={`${fileUrl}uploads/services/small/${service.image}`} alt="" className='w-100' />
                              </div>
                              <div className='service-body'>
                                 <div className='service-title'>
                                     <h3>{service.title}</h3>
                                 </div>
                                <div className='service-content'>
                                   <p>{service.short_desc}</p>
                                </div>          
                                    <a href='#' className='btn btn-primary small'>Read More</a>
                              </div> 
                            </div>
                          </div>
                            )
                         })
                       }
                  </div>
                          
                  
                </div>
              </div>
            </section>
      </main>
    <Footer />
    </>
  )
}

export default Services

