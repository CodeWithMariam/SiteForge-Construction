// import React from 'react'
import Footer from '../../common/Footer'
import { Link } from 'react-router-dom'
import Sidebar from '../../common/Sidebar'
import Header from '../../common/Header'
import { useEffect, useState } from 'react'
import { apiUrl, token } from '../../common/Http'
import { toast } from 'react-toastify'

const Show = () => {
    const[projects, setProjects] = useState([]);

    const fetchProjects = async () =>{
        const response = await fetch(apiUrl+'projects', {
            'method': 'GET',
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token()}`
            }
        });
        const result = await response.json();
        setProjects(result.data);
    }

    useEffect(() => {
        fetchProjects();
    },[]);

    const deleteProject = async(id) => {
        // Delete project logic
        if(confirm('Are you sure you want to delete this project?')){
            const response = await fetch(apiUrl+'projects/'+id,{
            'method': 'Delete',
            'headers': {
                'Authorization' : `Bearer ${token()}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const result = await response.json();
          if(result.status === true){
            const newProjects = projects.filter(project => project.id != id);
            setProjects(newProjects)
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
                    <h4 className="h5">Projects</h4>
                    <Link to="/admin/projects/create" className="btn btn-primary">Create</Link>
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
                                projects && projects.map(project => {
                                    return (
                                       <tr key={project.id}>
                                       <td scope='row'>{project.id}</td>
                                       <td>{project.title}</td>
                                       <td>{project.slug}</td>
                                       <td>
                                           {
                                             (project.status === 1) ? 'Active' : 'Block'
                                           }
                                       </td>
                                       <td>
                                       <Link to={`/admin/projects/edit/${project.id}`} className='btn btn-sm btn-info'>Edit</Link>
                                       <Link to='#' onClick={() => deleteProject(project.id)} className='btn btn-sm btn-danger ms-2'>Delete</Link>
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
