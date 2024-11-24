// import React from 'react'
import { useEffect, useState } from "react"
import Footer from "../../common/Footer"
import Header from "../../common/Header"
import Sidebar from "../../common/Sidebar"
import { apiUrl, token } from "../../common/Http"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

const Show = () => {

 const [services, setServices] = useState([]);

 const fetchServices = async () => {
  const response = await fetch(apiUrl+'services',{
       'method': 'GET',
       'headers': {
             'Authorization': `Bearer ${token()}`,
             'Content-Type': 'application/json',
             'Accept': 'application/json'
       }

  });
  const result = await response.json();
//   console.log(result);
  setServices(result.data);
 }

 const deleteService = async (id) => {
  if(confirm('Are you sure you want to delete?')){
    const response = await fetch(apiUrl+'services/'+id,{
      'method': 'DELETE',
      'headers': {
            'Authorization': `Bearer ${token()}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
      }
  
  });
      const result = await response.json();

      if(result.status === true){
          const newServices = services.filter(service => service.id != id)
          setServices(newServices);
          toast.success(result.message);
      }else{
        toast.error(result.message);
      }
      
  }
 
 }

 useEffect(() => {
    fetchServices();
 },[]);

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
              {/* dashboard */}
              <div className='card shadow border-0'>
                  <div className='card-body p-4'>
                    <div className='d-flex justify-content-between'>
                    <h4 className="h5">Services</h4>
                    <Link to="/admin/services/create" className="btn btn-primary">Create</Link>
                    </div>
                    <hr />
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Slug</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* service data */}
                            {
                                services && services.map(service => {
                                    return (
                                       <tr key={service.id}>
                                       <td scope='row'>{service.id}</td>
                                       <td>{service.title}</td>
                                       <td>{service.slug}</td>
                                       <td>
                                           {
                                             (service.status === 1) ? 'Active' : 'Block'
                                           }
                                       </td>
                                       <td>
                                       <Link to={`/admin/services/edit/${service.id}`} className='btn btn-sm btn-info'>Edit</Link>
                                       <Link to='#' onClick={() => deleteService(service.id)} className='btn btn-sm btn-danger ms-2'>Delete</Link>
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
