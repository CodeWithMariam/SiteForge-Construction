// import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Hero from '../common/Hero';

const ContactUs = () => {
  return (
    <>
      <Header />
       <main>
       <Hero preHeading='Quality. Integrity. Value.'
                heading='Contact Us'
                text='We delivering top-quality residential and commercial projects <br /> We bring your vision to life, ensuring every detail is crafted to perfection.'
        />
        <section className='section-9 py-5'>
                <div className='container'>
                <div className='section-header text-center'>
                        <span></span>
                        <h2>Contact Us</h2>
                        <p>We bring your vision to life, ensuring every detail is crafted to perfection.</p>
                </div>
                <div className='row py-5'>
                    <div className='col-md-3'>
                       <div className='card shadow border-0 mb-3'>
                         <div className='card-body p-4'>
                               <h4 className='card-title'>Call Us</h4>
                               <div>(888-000-0000)</div>
                               <div>(123) 456-7890</div>

                               <h4 className='card-title mt-4'>You can write us:</h4>
                               <div>example@example.com</div>
                               <div>info@example.com</div>

                               <h4 className='card-title mt-4'>Address:</h4>
                               <div>1234 Elm Street, Suite 567
                                  <br />Springfield, IL 62701
                                  <br />(555) 123-4567</div>
                         </div>
                         </div>
                       </div>
                    <div className='col-md-9'>
                         <div className='card shadow border-0'>
                               <form>
                                <div className='card-body p-4'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                     <label className='form-label'>Name</label>
                                     <input type='text' className='form-control form-control-lg' placeholder='Enter name' />
                                   </div>
                                   <div className='col-md-6 mb-4'>
                                     <label className='form-label'>Email</label>
                                     <input type='text' className='form-control form-control-lg' placeholder='Enter email' />
                                   </div>
                                   </div>
                                   <div className='row'>
                                    <div className='col-md-6 mb-4'>
                                     <label className='form-label'>Phone</label>
                                     <input type='text' className='form-control form-control-lg' placeholder='Enter phone' />
                                   </div>
                                   <div className='col-md-6 mb-4'>
                                     <label className='form-label'>Subject</label>
                                     <input type='text' className='form-control form-control-lg' placeholder='Enter subject' />
                                   </div>
                                   </div>
                                   <div>
                                       <label className='form-label'>Message</label>
                                       <textarea className='form-control form-control-lg' placeholder='Enter message' rows='5'></textarea>
                                   </div>
                                   <button className='btn btn-primary small mt-3'>Submit</button>
                                </div>
                                 
                               </form>
                         </div>
                    </div>
                </div>
                </div>
        </section>
       </main>
      <Footer />
    </>
  )
}

export default ContactUs
