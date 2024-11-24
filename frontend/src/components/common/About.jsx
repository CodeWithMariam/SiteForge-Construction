import React from 'react'
import AboutImg from '../../assets/images/about-us.jpg';


const About = () => {
  return (
           <section className='section-2 py-5'>
                <div className='container py-5'> 
                    <div className='row'>
                        <div className='col-md-6'>
                            <img src={AboutImg} className='w-100' />
                        </div>
                        <div className='col-md-6 py-2'>
                            <span>About Us</span>
                            <h2>Crafting structure that last a lifetime</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ipsa aspernatur ratione sapiente consectetur tenetur impedit hic fuga nostrum libero, harum! At nulla esse culpa dolorem, dolore laboroptio esse quidem reiciendis.</p>

                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente laboriosam, dolor delectus beatae ut tempore corporis quod quam, obcaecati doloribus ipsum rerum neque deleniti ipsa quas nesciunt consectetur, optio esse quidem.</p>
                        </div>
                    </div>
                </div>
            </section>
          
  )
}

export default About
