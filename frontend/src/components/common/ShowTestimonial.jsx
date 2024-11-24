// import React from 'react'
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import { apiUrl, fileUrl } from './Http';


const ShowTestimonial = () => {
    const [testimonials, setTestimonials] = useState([]);

    const fetchLatestTestimonials = async () => {
      const response = await fetch(apiUrl+'get-testimonials',{
        'method': 'GET',
     });
      const result = await response.json();
      setTestimonials(result.data)
      // console.log(result);
    }
  
    useEffect(() => {
        fetchLatestTestimonials();
   },[]);
  return (
    <section className='section-5 py-5'>
                <div className='container py-5'>
                <div className='section-header text-center'>
                        <span>Testimonials</span>
                        <h2>What people are saying about us</h2>
                        <p>We bring your vision to life, ensuring every detail is crafted to perfection.</p>
                </div>
                <Swiper
                    modules={[Pagination]}
                    spaceBetween={50}
                    slidesPerView={3}
                    pagination={{ clickable: true }}
                    breakpoints={{ 
                        200: { 
                            slidesPerView: 1,
                            spaceBetween: 20,
                         },
                        768: { 
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: { 
                            slidesPerView: 3,
                            spaceBetween: 50,
                        },
                       
                     }}
                    >
                     {
                         testimonials && testimonials.map(testimonial => {
                            return (
                                <SwiperSlide key={testimonial.id}>
                                <div className='card shadow border-0' >
                                  <div className='card-body p-5'>
                                       <div className='rating'>
                                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                       </svg>
                                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                       </svg>
                                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                       </svg>
                                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                       </svg>
                                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                       </svg>
                                       </div>
                                       <div className='content pt-4 pb-2'>
                                         <p>{testimonial.testimonials}</p>
                                       </div>
                                       <hr />
                                       <div className='d-flex meta'>
                                         <div>
                                              <img src={`${fileUrl}uploads/testimonials/${testimonial.image}`} alt="" width={50} />
                                         </div>
                                         <div className='ps-3'>
                                            <div className='name'>{testimonial.citation}</div>
                                            <div>{testimonial.designation}</div>
                                         </div>
                                       </div>
                                  </div>
                                </div>
                              </SwiperSlide>
                            )
                         })
                     }

                </Swiper> 
                </div>
            </section>
  )
}

export default ShowTestimonial
