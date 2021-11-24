import React from 'react';
import { Form, Formik } from 'formik';
import TextField from './TextField';
import * as Yup from 'yup';
import './Register.css'
import { Link ,useHistory} from 'react-router-dom';

const Register = () => {
    const validate = Yup.object({
        firstName:Yup.string().min(3,"Minimum 3 character is required").max(15,'15 character is the limit').required('Firstname Required'),
        lastName:Yup.string().min(3,"Minimum 3 character is required").max(15,'15 characters is the limit').required("Lastname Required"),
        email:Yup.string().email("email is invalid").required("Eamil is required"),
        password:Yup.string().min(6,"Password is less han 6 characters").required('Password is require'),
        cpassword:Yup.string().oneOf([Yup.ref('password'),null],"Password is Mismatch").required("Confirmed password is required"),
    })
    const history = useHistory();
    return (
        <div>
            <h1 className="login">Registeration</h1>
            <Formik
            initialValues={{
                firstName:"",
                lastName:"",
                email:"",
                password:"",
                cpassword:""
            }}
            //validate schema of formic
            validationSchema = {validate}

            onSubmit={values=>{
                console.log(values)
                const datas = values;
                fetch("http://localhost:3000/Users",{
                method:"POST",
                    headers:{
                        Accept:"application/json",
                        "Content-type":"application/json"
                    },
                    body:JSON.stringify(datas)

                }).then((results) => {
                    results.json().then((response) => {
                        console.log(response);
                    })
                })
                history.push("/login")

            }}
            >
                {formik => (
                    <div className="container">
                    <div className="form">
                        <Form>
                            <TextField label="First Name:" name="firstName" type="text" />
                            <TextField label="Last Name:" name="lastName" type="text" />
                            <TextField label="Email:" name="email" type="email" />
                            <TextField label="Password:" name="password" type="password" />
                            <TextField label="Confirm-Password:" name="cpassword" type="text" />
                            <div className="buttons">
                            <button className="btn btn-dark mt-3" type="submit">Register</button>
                            <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
                            <Link to="/login"><button className="btn btn-primary mt-3 ml-3">Login</button></Link>
                            </div>
                            
                        </Form>
                    </div>
                    </div>
                ) }
            </Formik>
        </div>
    )
}

export default Register
