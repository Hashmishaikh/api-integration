import { useField,ErrorMessage } from 'formik';
import React from 'react';
import './Register.css';


const TextField = ({label, ...props}) => {
    const [field,meta] = useField(props)
    return (
        <div className="mb-2">
            <label className="labels" htmlFor={field.name}>{label}</label>
            <input 
            className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
            {...field} {...props} autoComplete="off" />
            <ErrorMessage component="div" name={field.name} className="error" />
            
        </div>
    )
}

export default TextField
