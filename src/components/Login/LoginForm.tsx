import React from 'react';
import {useForm} from "react-hook-form";
import '../../styles/login.scss';

interface IProps {
    loginUser: (email:string, password:string, rememberMe:boolean) => void
}

const LoginForm:React.FC<IProps> = ({loginUser}) => {
    const {handleSubmit, register, errors} = useForm();
    const onSubmit = (values: any) => {
       loginUser(values.email, values.password, values.rememberMe)
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='loginForm'>
            <input name='email' ref={register({
                required: true,
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                    message: "Invalid email address"
                }
            })}
                   className={errors.email && errors.email.type === 'required' ? ' loginForm__input loginForm__errors' : 'loginForm__input'}
                   type="text" placeholder='Email'/>
            {(errors.email && errors.email.message) || (errors.email && errors.email.type === 'required' &&
                <span className='loginForm__errors'>Email is required</span>)}

            <input name='password' ref={register({
                required: true
            })}
                   className={errors.password && errors.password.type === 'required' ? 'loginForm__input loginForm__errors' : 'loginForm__input'}
                   type="password" placeholder='Password'/>
            {errors.password &&
            errors.password.type === "required" &&
            <span className='loginForm__errors'>Password is required</span>}
            <div className='loginForm__checkBox'>Remember me: <input type="checkbox" name='rememberMe'/></div>

            <button type='submit' className='loginForm__btn'>sign in</button>

        </form>
    )
}

export default LoginForm;