import React from 'react';
import axios from 'axios';
//if importing a Form from UI semantic, etc, can change Form below to FormikForm and do: import {Form as FormikForm, Field, withFormik} from 'formik'; 
import { Form, Field, withFormik } from 'formik';
//import everything Yup gives us using *
import * as Yup from 'yup';

//STEP 1: Create Formik Form
const UserForm = ({ errors, touched, values }) => {
    return (
        <div className='user-form'>
            <h2>User Info</h2>
            <Form>
                <Field type='text' name='username' placeholder='username' />
                {touched.username && errors.username && <p className='username'>{errors.username}</p>}
                <Field type='text' name='email' placeholder='email' />
                {touched.email && errors.email && <p className='error'>{errors.email}</p>}
                <Field type='text' name='password' placeholder='password' />
                {touched.password && errors.password && <p className='error'>{errors.password}</p>}
                <label className='checkbox-container'>
                    Terms of Service
                    <Field type='checkbox' name='terms' checked={values.terms} />
                    <span className='checkmark' />
                </label>
                <button type='submit'>Submit</button>
            </Form>
        </div>
    );
}

const CopyUserForm = withFormik({
    //prop that handles state. values is an object
    mapPropsToValues({ username, email, password, terms }) {
        //handles change, This object is passed into our map fxn with updated value
        return {
            username: username || '',
            email: email || '',
            password: password || '',
            terms: terms || false
        };
    },
    //STEP 2: use 2 diff Yup validations for each field +  custom error codes
    validationSchema: Yup.object().shape({
        username: Yup.string().required('Invalid Username'),
        email: Yup.string().required('Invalid email'),
        password: Yup.string().required('Invalid password'),
        terms: Yup.bool().required('Must acknowledge terms of service')
    }),
    //prop that handles submit
    handleSubmit(values) {
        console.log('Form submitted', values);
        axios
            //STEP 3: Make Post request
            .post('https://reqres.in/api/users/', values)
            .then(res => console.log(res))
            .catch(err => console.log(err.response));
    }
})(UserForm);

export default CopyUserForm;