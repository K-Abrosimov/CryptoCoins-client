import React from "react";
import { useForm } from "react-hook-form";


const Login = (props) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: 'onBlur',
    });

    const onSubmit = data => {
        props.loginUser(data)
        reset()
    }

    return (
        <div className="login">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Login</h1>

                <div className="input-wrapper">
                    <input placeholder="email" {...register("email", { required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} />
                    {errors.email && <p className="input-error">invalid email address</p>}
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="password" {...register("password", {
                        required: true, minLength: { value: 5, message: 'Password must to be min: 5 signs' },
                        maxLength: { value: 15, message: 'Password must to be max: 15 signs' }
                    })} />
                    {errors?.password && <p className="input-error">{errors?.password?.message || "The password must be min: 5 max: 10 letters"}</p>}
                </div>
                <input type="submit" value="Continue" />

                {props.errorMessage ? <p className="input-error">{props.errorMessage}</p> : undefined}
            </form>

        </div>

    );
}

export default Login