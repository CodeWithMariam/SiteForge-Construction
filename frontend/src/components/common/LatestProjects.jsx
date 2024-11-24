import  { useEffect, useState } from 'react'

import { apiUrl, fileUrl} from './Http';

const LatestProjects = () => {
    const [projects, setProjects] = useState([]);
    const fetchLatestProjects = async () => {

       const response = await fetch(apiUrl+'get-latest-projects?limit=4', {
         'method': 'GET',
       });
       const result = await response.json();
       setProjects(result.data);
    // console.log(result.data);

    }

    useEffect(() => {
      fetchLatestProjects();
    },[]);

  return (
    <section className='section-3 bg-light py-5'>
              <div className='container-fluid py-5'>
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
                                <div className='col-md-3 col-lg-3' key={project.id}>
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
  )
}

export default LatestProjects
