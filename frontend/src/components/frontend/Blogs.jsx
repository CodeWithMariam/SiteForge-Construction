// import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Hero from '../common/Hero';
import { useEffect, useState } from 'react';
import { apiUrl, fileUrl } from '../common/Http';


const Blogs = () => {
  const [articles, setArticles] = useState([]);
  const fetchAllArticles = async () => {

     const response = await fetch(apiUrl+'get-articles', {
       'method': 'GET',
     });
     const result = await response.json();
     setArticles(result.data);
  // console.log(result.data);

  }

  useEffect(() => {
    fetchAllArticles();
  },[]);
  return (
    <>
    <Header />
      <main>
        <Hero preHeading='Quality. Integrity. Value.'
                heading='Our Blogs'
                text='We delivering top-quality residential and commercial projects <br /> We bring your vision to life, ensuring every detail is crafted to perfection.'
        />
         { /* blogs section */}
            <section className='section-6 bg-light py-5'>
                <div className='container py-5'>
                <div className='section-header text-center'>
                        <span>Blog & News</span>
                        <h2>Articles & bolg posts</h2>
                        <p>We bring your vision to life, ensuring every detail is crafted to perfection.</p>
                </div>
                <div className="row py-5">
                  {
                    articles && articles.map(article =>{
                      return(
                      <div className='col-md-4 mt-4' key={article.id}>
                      <div className='card shadow border-0'>
                          <div className='card-img-top'>
                            <img src={`${fileUrl}uploads/articles/small/${article.image}`} alt="" className='w-100'/>
                          </div>
                          <div className='card-body p-4'>
                              <div className='mb-3'>
                                 <a href="#">{article.title}</a>
                              </div>
                              <button href="#" className='btn btn-primary small'>Read More</button>
                          </div>
                      </div>
                    </div>
                      )
                    })
                  }
                    

                </div>
                </div>
            </section>
      </main>
    <Footer />
    </>
  )
}

export default Blogs
