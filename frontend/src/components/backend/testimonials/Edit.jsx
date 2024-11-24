import React, { useMemo, useRef, useState } from 'react'
import Footer from '../../common/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../common/Sidebar'
import Header from '../../common/Header'
import { apiUrl, fileUrl, token } from '../../common/Http'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'

const Edit = ({placeholder}) => {
    const editor = useRef(null);
    const[testimonials, setTestimonials] = useState('');
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
            const response = await fetch(apiUrl+'testimonials/'+params.id,{
                'method': 'GET',
                'headers': {
                           'Authorization': `Bearer ${token()}`,
                           'Content-Type': 'application/json',
                           'Accept': 'application/json'
                }
            });
            const result = await response.json();
            setTestimonials(result.data);
            return (
                {
                    testimonials: result.data.testimonials,
                    citation: result.data.citation,
                    designation: result.data.designation,
                    status: result.data.status,
                }
            )
          }
      });

      const navigate = useNavigate();

      const onSubmit = async (data)=>{
        const newData = { ...data, 'imageId' : imageId };  
        const response = await fetch(apiUrl+'testimonials/'+params.id,{
           'method': 'PUT',
           'headers': {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token()}`,
               'Accept': 'application/json'
           },
           body: JSON.stringify(newData)
        });
        const result = await response.json();
        if(result.status === true){
           toast.success(result.message);
           navigate('/admin/testimonials');
        }else{
           toast.error(result.message);
        }       
     }

     const handleFile = async (e)=> {
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
           if(result.status == false){
               toast.error(result.errors.image[0]);
           }else{
               setImageId(result.data.id);
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
                    <h4 className="h5">Testimonials / Edit</h4>
                    <Link to="/admin/testimonials" className="btn btn-primary">Back</Link>
                    </div>
                    <hr />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Testimonial</label>
                            <textarea
                            placeholder="Testimonial"
                             {
                                ...register('testimonials', {
                                    required : 'The testimonial field is required.'
                                })
                             }
                            type="text" className={`form-control ${errors.testimonials && 'is-invalid'}`} />
                            {
                                errors.testimonials && <span className='invalid-feedback'>{errors.testimonials?.message}</span>
                            }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Citation</label>
                            <input
                            placeholder="Citation"
                             {
                                ...register('citation', {
                                    required : 'The citation field is required.'
                                })
                             }
                            type="text" className={`form-control ${errors.citation && 'is-invalid'}`} />
                            {
                                errors.citation && <span className='invalid-feedback'>{errors.citation?.message}</span>
                            }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Designation</label>
                            <input
                            placeholder="Designation"
                             {
                                ...register('designation')
                             }
                            type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Image</label>
                            <br />
                             <input onChange={handleFile} type="file" />
                        </div>
                        <div className='pb-3'>
                            {
                                testimonials.image && <img src={fileUrl+'uploads/testimonials/'+testimonials.image} />
                            }
                        </div>
                        <div className="mb-3">
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
                        <button disabled={isDisable} className="btn btn-primary">Update</button>
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
