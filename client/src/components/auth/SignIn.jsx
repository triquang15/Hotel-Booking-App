import React, { useContext, useState } from 'react'
import { signIn } from '../utils/ApiFunctions'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

export const SignIn = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const {handleLogin} = useContext(AuthContext)

    const handleInputChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const success = await signIn(login)
        if (success) {
            const token = success.token
            console.log('sucess', success);
            handleLogin(token)
            navigate("/")
            window.location.reload()
        } else {
            setErrorMessage("Invalid username or password")
        }

        setTimeout(() => {
            setErrorMessage("")
        }, 4000)
    }

    return (
        <section className='container col-6 mt-5 mb-5'>
           {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div className='row mb-3'>
                    <label htmlFor="email" className='col-sm-2 col-form-label'>Email</label>
                    <div>
                        <input type="email" id='email' name='email' className='form-control' required
                            value={login.email} onChange={handleInputChange} placeholder='Enter your email' />
                    </div>
                </div>

                <div className='row mb-3'>
                    <label htmlFor="password" className='col-sm-2 col-form-label'>Password</label>
                    <div>
                        <input type="password" id='password' name='password' className='form-control' required
                            value={login.password} onChange={handleInputChange} placeholder='Enter your password' />
                    </div>
                </div>
                <div className='mb-3'>
                    <button type='submit' className='btn btn-danger' style={{ marginRight: "10px" }}>
                        Sign In
                    </button>
                    <span style={{ marginLeft: "10px" }}>Don't have an account ?
                        <Link to={"/register"}>Sign Up</Link>
                    </span>
                </div>
            </form>
        </section>
    )
}
