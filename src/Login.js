import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import TextField from './TextField';
import * as Yup from 'yup';
import './Register.css'
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
    const [datas,setDatas] = useState([]);
    const [errors,setErrors] = useState("")
    const history = useHistory();
    const validate = Yup.object({     
        email:Yup.string().email("email is invalid").required("Eamil is required"),
        password:Yup.string().min(6,"Password is less han 6 characters").required('Password is require'),
    },)
    useEffect(() => {
        fetch("http://localhost:3000/Users").then((data) => {
      data.json().then((result) => {
        setDatas(result);
            })
        })
    },[])
    console.log("data:",datas.password)
    return (
        <div>
           <h1 className="login">Login</h1>

           <h3>{datas.email}</h3>
            <Formik
            initialValues={{
                email:"",
                password:"",
            }}
            //validate schema of formic
            validationSchema = {validate}

            onSubmit={values=>{
                {datas.map((rest) => {
                    if(values.email === rest.email && values.password === rest.password){
                        console.log("login");  
                        history.push("/app")
                    }else(
                        setErrors("wrong credential")
                    ) 
                    
                })}              
            }}
            >
                {formik => (
                    <div className="container">
                    <div className="form">
                        <Form>
                            <TextField label="Email:" name="email" type="email" />
                            <TextField label="Password:" name="password" type="password" />
                            <div className="buttons">
                            <button className="btn btn-dark mt-3" type="submit">Login</button>
                            <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
                            <Link to="/"><button className="btn btn-primary mt-3 ml-3">Register</button></Link>
                            </div>
                        </Form>
                        
                    </div>
                    <h3 className="errorss">{errors}</h3>
                    
                    </div>
                    
                ) }
            </Formik>
            
        </div>
    )
}

export default Login;