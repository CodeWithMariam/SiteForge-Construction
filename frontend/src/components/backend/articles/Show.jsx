import { useEffect, useState } from 'react'
import Header from '../../common/Header'
import Sidebar from '../../common/Sidebar'
import { Link } from 'react-router-dom'
import Footer from '../../common/Footer'
import { apiUrl, token } from '../../common/Http'
import { toast } from 'react-toastify'

const Show = () => {
    const[articles, setArticles] = useState([]);
    
    const fetchArticles = async () => {
        const response = await fetch(apiUrl+'articles',{
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token()}`,
                'Accept': 'application/json',
            }
        });
        const result = await response.json();
        setArticles(result.data);
    }

    useEffect(() => {
        fetchArticles();
    }, []);

    const deleteArticle = async(id) => {
        if(confirm('Are you sure you want to delete?')){
            const response = await fetch(apiUrl+'articles/'+id,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token()}`,
                    'Accept': 'application/json',
                }
            });
            const result = await response.json();
          if(result.status === true){
            const newArticles = articles.filter(article => article.id != id);
            setArticles(newArticles)
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
                    <h4 className="h5">Articles</h4>
                    <Link to="/admin/articles/create" className="btn btn-primary">Create</Link>
                    </div>
                    <hr />
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Title</th>
                            <th scope='col'>Slug</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* service data */}
                            {
                                articles && articles.map(article => {
                                    return (
                                       <tr key={article.id}>
                                       <td scope='row'>{article.id}</td>
                                       <td>{article.title}</td>
                                       <td>{article.slug}</td>
                                       <td>
                                           {
                                             (article.status === 1) ? 'Active' : 'Block'
                                           }
                                       </td>
                                       <td>
                                       <Link to={`/admin/articles/edit/${article.id}`} className='btn btn-sm btn-info'>Edit</Link>
                                       <Link to='#' onClick={() => deleteArticle(article.id)} className='btn btn-sm btn-danger ms-2'>Delete</Link>
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
