import React, { useState, useEffect } from 'react';
import axios from 'axios';
//if importing a Form from UI semantic, etc, can change Form below to FormikForm and do: import {Form as FormikForm, Field, withFormik} from 'formik'; 
import { Form, Field, withFormik } from 'formik';
//import everything Yup gives us using *
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import './form.css';

//STEP 1: Create Formik Form
const UserForm = ({ errors, touched, values }) => {
    return (
        <div className='user-form'>
            <Form>
                <Field
                    className='username-field'
                    type='text'
                    name='username'
                    placeholder='username'
                    component={TextField}
                    margin="normal"
                    variant="outlined"
                />
                {touched.username && errors.username && <p className='username'>{errors.username}</p>}
                <Field
                    className='email-field'
                    type='text'
                    name='email'
                    placeholder='email'
                    component={TextField}
                    margin="normal"
                    variant="outlined"
                />
                {touched.email && errors.email && <p className='error'>{errors.email}</p>}
                <Field
                    className='password-field'
                    type='text'
                    name='password'
                    placeholder='password'
                    component={TextField}
                    margin="normal"
                    variant="outlined"
                />
                {touched.password && errors.password && <p className='error'>{errors.password}</p>}
                <Field component='select' className='role' name='role'>
                    <option>Please Select a Role</option>
                    <option value='admin'>Administrator</option>
                    <option value='member'>Member</option>
                    <option value='leader'>Leader</option>
                </Field>
                <label className='checkbox-container'>
                    Terms of Service
                    <Field className='terms-field' type='checkbox' name='terms' checked={values.terms} />
                    <span className='checkmark' />
                </label>
                <button type='submit'>Submit</button>
            </Form>
        </div>
    );
}
// get status from props
const FormComponent = ({ status }) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        // status sometimes comes through as undefined
        console.log('prevent infinite loop');
        if (status) {
            setUsers(users => [...users, status])
        }
    }, [status]);
}

// // STEP 4: get status from props
// handleSubmit(values, { setStatus }) {
//     axios
//         .post('https://reqres.in/api/users/', values)
//         .then(res => {
//             // 
//             setStatus(res.data);
//         })
//         .catch(err => console.log(err.response));
// }

const CopyUserForm = withFormik({
    //prop that handles state. values is an object
    mapPropsToValues({ username, email, password, role, terms }) {
        //handles change, This object is passed into our map fxn with updated value
        return {
            username: username || '',
            email: email || '',
            password: password || '',
            role: role || '',
            terms: terms || false
        };
    },
    //STEP 2: use 2 diff Yup validations for each field +  custom error codes
    validationSchema: Yup.object().shape({
        username: Yup.string().required('Invalid Username'),
        email: Yup.string().required('Invalid email'),
        password: Yup.string().required('Invalid password'),
        role: Yup.string().required('Please select a role'),
        terms: Yup.bool().required('Must acknowledge terms of service')
    }),
    //prop that handles submit
    handleSubmit(values, { setStatus }) {
        console.log('Form submitted', values);
        axios
            //STEP 3: Make Post request
            .post('https://reqres.in/api/users/', values)
            .then(res => {
                //STEP 4: get setStatus: call setStatus and pass in the object you want to add to state
                setStatus(res.data)
            })
            .catch(err => console.log(err.response));
    }
})(UserForm);

export default CopyUserForm;