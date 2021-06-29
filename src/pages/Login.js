import React from 'react'
import { http } from '../services/Users';


const Login = ({setAuth}) => {
    const emailRef = React.useRef();
    const phoneRef = React.useRef();
    const [ users, setUSers ] = React.useState([]);

    React.useEffect(()=> {
        http.get('/users')
        .then(res => setUSers(res.data))
        .catch(err => alert(err));
    })


    const setAuthTrue = (email) => {
        setAuth(true);
        window.localStorage.setItem('email', email)
    }

    const onLogin = () => {
        users.map(user => {
            if(emailRef.current.value === user.email){
                setAuthTrue(user.email);
            }
            return true
        })
    }


    return (
        <>
        <div className='main_login'>
            <div className='card shadow bg-light'>
                <div className='card-header'>
                    <span>Login</span>

                </div>
                <div className='card-body'>
                    <form>
                        <div className='mb-3'>
                            <label className='form-label'>Email</label>
                            <input type='email' ref={emailRef} className='form-control'></input>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Phone</label>
                            <input type='text' ref={phoneRef} className='form-control'></input>
                        </div>
                    </form>

                </div>
                <div className='card-footer text-end'>
                    <button type='button' onClick={onLogin} className='btn btn-warning'>Login</button>
                </div>

            </div>
        </div>
            
        </>
    )
}

export default Login
