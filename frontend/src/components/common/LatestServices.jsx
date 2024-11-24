// import React from 'react'
import { useEffect, useState } from 'react';
import { apiUrl, fileUrl } from './Http';

const LatestServices = () => {
    const [services, setServices] = useState([]);

  const fetchLatestServices = async () => {
    const response = await fetch(apiUrl+'get-latest-services?limit=4',{
      'method': 'GET',
   });
    const result = await response.json();
    setServices(result.data)
    // console.log(result);
  }

  useEffect(() => {
    fetchLatestServices();
 },[]);
 
  return (
    <section className='section-3 bg-light py-5'>
              <div className='container-fluid py-5'>
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
                            <div className='col-md-3 col-lg-3' key={service.id}>
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
  )
}

export default LatestServices
