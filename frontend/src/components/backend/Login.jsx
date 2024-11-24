// import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './context/Auth'

const Login = () => {
    const {login} = useContext(AuthContext)
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

      const onSubmit = async (data) =>{
        // console.log(data)

        const res = await fetch('http://localhost:8000/api/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if(result.status == false){
            toast.error(result.message)
        }else{
            const userInfo = {
                id: result.id,
                token: result.token
            }
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            login(userInfo);
            navigate('/admin/dashboard')
        }
      } 
  return (
    <>
      <Header />
        <main>
            <div className="container py-5 d-flex justify-content-center">
                <div className="login-form my-5">
                    <div className='card shadow border-0'>
                        <div className='card-body p-4'>
                            <h4 className='mb-3'>Login Here</h4>
                            <form onSubmit = {handleSubmit(onSubmit)}>
                                <div className='mb-3'>
                                    <label htmlFor="" className='form-label'>Email</label>
                                    <input
                                      {
                                        ...register('email',{
                                            'required': 'This field is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Please enter a valid email address'
                                            }
                                        })
                                      }
                                    type="text" className={`form-control ${errors.email && 'is-invalid'}`} placeholder='Email' />
                                    {
                                        errors.email && <span className='invalid-feedback'>{errors.email?.message}</span>
                                    }
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="" className='form-label'>Password</label>
                                    <input
                                       {
                                        ...register('password',{
                                            'required': 'This field is required'
                                        })
                                      }
                                    type="password" className={`form-control ${errors.password && 'is-invalid'}`} placeholder='Password' />
                                    {
                                        errors.password && <span className='invalid-feedback'>{errors.password?.message}</span>
                                    }
                                </div>
                                <button type='submit' className='btn btn-primary'>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
      <Footer />
    </>
  )
}

export default Login
