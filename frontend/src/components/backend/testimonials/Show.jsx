import { useEffect, useState } from 'react'
import Footer from '../../common/Footer'
import { Link } from 'react-router-dom'
import Sidebar from '../../common/Sidebar'
import Header from '../../common/Header'
import { toast } from 'react-toastify'
import { apiUrl, token } from '../../common/Http'

const Show = () => {
    const[testimonials, setTestimonials] = useState([]);
    
    const fetchTestimonials = async () => {
        const response = await fetch(apiUrl+'testimonials',{
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token()}`,
                'Accept': 'application/json',
            }
        });
        const result = await response.json();
        setTestimonials(result.data);
    }

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const deleteTestimonial = async(id) => {
        if(confirm('Are you sure you want to delete?')){
            const response = await fetch(apiUrl+'testimonials/'+id,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token()}`,
                    'Accept': 'application/json',
                }
            });
            const result = await response.json();
          if(result.status === true){
            const newTestimonials = testimonials.filter(testimonial => testimonial.id != id);
            setTestimonials(newTestimonials)
            toast.success(result.message)
          }else{
            toast.error(result.message);
          }
        }
    }
  return (
    <>
    <Header />
    <main>
      <div className='container my-5'>
      <div className="row">
          <div className='col-md-3'>
              {/* sidebar */}
             <Sidebar />
          </div>
          <div className='col-md-9'>
              <div className='card shadow border-0'>
                  <div className='card-body p-4'>
                    <div className='d-flex justify-content-between'>
                    <h4 className="h5">Testimonials</h4>
                    <Link to="/admin/testimonials/create" className="btn btn-primary">Create</Link>
                    </div>
                    <hr />
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Testimonial</th>
                            <th scope='col'>Citation</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* service data */}
                            {
                                testimonials && testimonials.map(testimonial => {
                                    return (
                                       <tr key={testimonial.id}>
                                       <td scope='row'>{testimonial.id}</td>
                                       <td>{testimonial.testimonials}</td>
                                       <td>{testimonial.citation}</td>
                                       <td>
                                           {
                                             (testimonial.status === 1) ? 'Active' : 'Block'
                                           }
                                       </td>
                                       <td >
                                       <Link to={`/admin/testimonials/edit/${testimonial.id}`} className='btn btn-sm btn-info'>Edit</Link>
                                       <Link to='#' onClick={() => deleteTestimonial(testimonial.id)} className='btn btn-sm btn-danger '>Delete</Link>
                                       </td>
                                       </tr>
                                    )
                                })
                            }
                            
                            {/* service data */}
                        </tbody>
                    </table>
                  </div>
              </div>
          </div>
       </div>
      </div>   
    </main>
    <Footer />
  </>
  )
}

export default Show


