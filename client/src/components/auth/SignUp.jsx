import React, { useState } from 'react'
import { signUp } from '../utils/ApiFunctions'
import { Link } from 'react-router-dom'

export const SignUp = () => {
    const [register, setRegister] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })

    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const handleInPutChange = (e) => {
        setRegister({ ...register, [e.target.name]: e.target.value })
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            const result = await signUp(register)
            setSuccessMessage(result)
            setErrorMessage("")
            setRegister({ firstName: "", lastName: "", email: "", password: "" })
        } catch (error) {
            setSuccessMessage("")
            setErrorMessage(`Error ${error.message}`)
        }
        setTimeout(() => {
            setErrorMessage("")
            setSuccessMessage("")
        }, 5000)
    }

    return (
        <section className='container col-6 mt-5 mb-5'>
            {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
            {successMessage && <p className='alert alert-success'>{successMessage}</p>}
            <h2 className='text-center'>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <div className='mb-3 row'>
                    <label htmlFor="firstName" className='col-sm-2 col-form-label'>First Name</label>
                    <div className='col-sm-10'>
                        <input type="text" id='firstName' name='firstName' className='form-control'
                            required value={register.firstName} onChange={handleInPutChange} />
                    </div>
                </div>

                <div className='mb-3 row'>
                    <label htmlFor="lastName" className='col-sm-2 col-form-label'>Last Name</label>
                    <div className='col-sm-10'>
                        <input type="text" id='lastName' name='lastName' className='form-control'
                            required value={register.lastName} onChange={handleInPutChange} />
                    </div>
                </div>

                <div className='mb-3 row'>
                    <label htmlFor="email" className='col-sm-2 col-form-label'>Email</label>
                    <div className='col-sm-10'>
                        <input type="email" id='email' name='email' className='form-control'
                            required value={register.email} onChange={handleInPutChange} />
                    </div>
                </div>

                <div className='mb-3 row'>
                    <label htmlFor="password" className='col-sm-2 col-form-label'>Password</label>
                    <div className='col-sm-10'>
                        <input type="password" id='password' name='password' className='form-control'
                            required value={register.password} onChange={handleInPutChange} />
                    </div>
                </div>
                <div className='mb-3'>
                    <button type='submit' className='btn btn-danger' style={{ marginRight: "10px" }}>
                        Sign Up
                    </button>
                    <span style={{ marginLeft: "10px" }}>Already have an account ?
                        <Link to={"/login"}>Sign In</Link>
                    </span>
                </div>
            </form>
        </section>
    )
}
