import React, { useMemo, useRef, useState } from 'react'
import Footer from '../../common/Footer'
import JoditEditor from 'jodit-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../common/Sidebar'
import Header from '../../common/Header'
import { toast } from 'react-toastify'
import { apiUrl, fileUrl, token } from '../../common/Http'
import { useForm } from 'react-hook-form'

const Edit = ({placeholder}) => {
    const editor = useRef(null);
	const [content, setContent] = useState('');
	const [project, setProject] = useState('');
	const [isDisable, setIsDisable] = useState(false);
	const [imageId, setImageId] = useState(null);
    const params = useParams();

    const config = useMemo(() => ({
        readonly: false, // all options from https://xdsoft.net/jodit/docs/,
        placeholder: placeholder || ''
    }),
    [placeholder]
   );

    const {
        register,
        handleSubmit,

        formState: { errors },
      } = useForm({
            defaultValues: async () => {
                const response = await fetch(apiUrl+'projects/'+params.id,{
                    'method': 'GET',
                    'headers': {
                          'Authorization': `Bearer ${token()}`,
                          'Content-Type': 'application/json',
                          'Accept': 'application/json'
                    },
             
               });
               const result = await response.json();
                 setContent(result.data.content);
                 setProject(result.data);
               return(
                {
                    title: result.data.title,
                    slug: result.data.slug,
                    short_desc: result.data.short_desc,
                    location: result.data.location,
                    sector: result.data.sector,
                    construction_type: result.data.construction_type,
                    status: result.data.status,
                }
               )
            }
      })

      const navigate = useNavigate();

      const onSubmit = async (data) => {
        const newData = { ...data, 'content' : content, 'imageId' : imageId};
        const response = await fetch(apiUrl+'projects/'+params.id,{
            'method': 'PUT',
            'headers': {
                  'Authorization': `Bearer ${token()}`,
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
            },
            body: JSON.stringify(newData)
     
       });
       const result = await response.json();
       if(result.status === true) { 
            toast.success(result.message);
            navigate('/admin/projects');
       }else{
        toast.error(result.message);
       }
      } 

      const handleFile = async (e) => {
         const formData = new FormData();
         const file = e.target.files[0];
         formData.append('image', file);
         setIsDisable(true);

          await fetch(apiUrl+'temp-images',{
            'method': 'POST',
            'headers': {
                  'Authorization': `Bearer ${token()}`,
                  'Accept': 'application/json'
            },
            body: formData
     
       }).then(response => response.json())
         .then(result => {
          setIsDisable(false);
            if(result.status == false) {
               toast.error(result.errors.image[0])
            }else{
                setImageId(result.data.id)
            }
         });
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
                    <h4 className="h5">Projects / Edit</h4>
                    <Link to="/admin/projects" className="btn btn-primary">Back</Link>
                    </div>
                    <hr />
                     <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Title</label>
                            <input
                            placeholder="Title"
                             {
                                ...register('title', {
                                    required : 'The title field is required.'
                                })
                             }
                            type="text" className={`form-control ${errors.title && 'is-invalid'}`} />
                            {
                                errors.title && <span className='invalid-feedback'>{errors.title?.message}</span>
                            }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Slug</label>
                            <input
                            placeholder="Slug"
                             {
                                ...register('slug', {
                                    required : 'The slug field is required.'
                                })
                             }
                            type="text" className={`form-control ${errors.slug && 'is-invalid'}`} />
                            {
                                errors.slug && <span className='invalid-feedback'>{errors.slug?.message}</span>
                            }
                        </div>

                        <div className='mb-3 row'>
                            <div className="col-md-6">
                                 <label htmlFor="" className="form-label">Location</label>
                                 <input
                                  placeholder="Enter Location"
                                  {
                                    ...register('location')
                                  }
                                  type="text" className="form-control" />
                        </div>
                            <div className="col-md-6">
                            <label htmlFor="" className="form-label">Construction Type</label>
                            <select className="form-control"
                            {
                                ...register('construction_type')
                            }
                            >
                                <option value="">Construction Type</option>
                                <option value="Residential Construction">Residential Construction</option>
                                <option value="Commercial Construction">Commercial Construction</option>
                                <option value="Industrial Construction">Industrial Construction</option>
                                <option value="Specialty Construction">Specialty Construction</option>
                            </select>
                        </div>
                        </div>
                        <div className='mb-3 row'>
                            <div className="col-md-6">
                            <label htmlFor="" className="form-label">Sector</label>
                            <select className="form-control"
                            {
                                ...register('sector')
                            }
                            >
                                <option value="">Sector</option>
                                <option value="Health">Health</option>
                                <option value="Education">Education</option>
                                <option value="Corporate">Corporate</option>
                            </select>
                        </div>
                            <div className="col-md-6">
                            <label htmlFor="" className="form-label">Status</label>
                            <select className="form-control"
                            {
                                ...register('status')
                            }
                            >
                                <option value="1">Active</option>
                                <option value="0">Block</option>
                            </select>
                        </div>
                        </div>
                        

                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Short Description</label>
                            <textarea 
                            placeholder="Short Description"
                            {
                                ...register('short_desc')
                            }
                            type="text" className="form-control" rows={4} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Content</label>
                            <JoditEditor
			                  ref={editor}
			                  value={content}
			                  config={config}
			                  tabIndex={1} // tabIndex of textarea
			                  onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			                  onChange={newContent => {}}
		                    />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Image</label>
                            <br />
                             <input onChange={handleFile} type="file" />
                        </div>
                        <div className='pb-3'>
                            {
                                project.image && <img src={fileUrl+'uploads/projects/small/'+project.image} />
                            }
                        </div>
                        <div className="mb-3">
                           <button disabled={isDisable} className="btn btn-primary">Update</button>
                        </div>
                     </form>
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

export default Edit
