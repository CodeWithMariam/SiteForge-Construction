// import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Hero from '../common/Hero';
import { apiUrl, fileUrl } from '../common/Http';
import { useEffect, useState } from 'react';


const Projects = () => {
  const[projects, setProjects] = useState([]);
  
  // fetch projects data from API
  const fetchAllProjects = async () =>{
    const response = await fetch(apiUrl+'get-projects',{
         'method': 'GET',
    });
    const result = await response.json();
     setProjects(result.data);     
  }
  
  useEffect(() => {
    fetchAllProjects();
  },[]);

  return (
    <>
     <Header />
     <main>
       <Hero preHeading='Quality. Integrity. Value.'
                heading='Our Projects'
                text='We delivering top-quality residential and commercial projects <br /> We bring your vision to life, ensuring every detail is crafted to perfection.'
          />
           { /* projects section */}
            <section className='section-3 bg-light py-5'>
              <div className='container py-5'>
                <div className='row'>
                  <div className='section-header text-center'>
                            <span>Our Projects</span>
                            <h2>Discover our diverse range of projects</h2>
                            <p>We bring your vision to life, ensuring every detail is crafted to perfection.</p>
                  </div>
                  <div className='row pt-5'>
                      {
                        projects && projects.map(project => {
                            return(
                                <div className='col-md-4 col-lg-4' key={project.id}>
                            <div className='item'>
                              <div className='service-img'>
                                 <img src={`${fileUrl}uploads/projects/small/${project.image}`} alt="" className='w-100' />
                              </div>
                              <div className='service-body'>
                                 <div className='service-title'>
                                     <h3>{project.title}</h3>
                                 </div>
                                <div className='service-content'>
                                   <p>{project.short_desc}</p>
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

export default Projects
