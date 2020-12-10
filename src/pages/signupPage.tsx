import React, { useState } from "react";
import { useFormik } from 'formik';
import lockImg from "../images/lock1.png";
import GoogleLogin from "../components/google-login";

const SignupPage = () => {
  const [signup, isSignup] = useState(false);

  return (
    <div className="edit-container login-page">
      <div className='login-background' >
        {
          signup ? <SignupContainer signup={signup} isSignup={isSignup} /> 
          : <LoginContainer signup={signup} isSignup={isSignup} />
        }
      </div>
    </div>
  );
}

const SignupContainer = (props) => {
  const validate = (values) => {
    const errors : any = {};

    if(!values.username) {
      errors.username = "Required field";
    } else if(values.username.length > 20) {
      errors.username = "Maximum of 20 characters allowed";
    }

    if (!values.email) {
      errors.email = 'Required field';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if(!values.password) {
      errors.password = "Required field";
    } else if(values.password.length > 20) {
      errors.username = "Minimum of 8 characters allowed.";
    }

    if (!values.re_password) {
      errors.re_password = "Required field";
    } else if(values.re_password !== values.password) {
      errors.re_password = "Input doesn't match password.";
    }

    return errors;
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      re_password: '',
    },
    onSubmit: (values, actions) => {
      console.log(values);
      actions.resetForm({})
    },
    validate,
  })

  const {signup, isSignup} = props;

  return (
    <div className='login-container'>
      <div className='lock-img-div'>
        <img alt='lock-icon' src={lockImg} style={{
          height: '50px',
            width: '50px',
        }} />
      </div>

      <div className='login-header' >
        SIGN UP
      </div>

      <form className="form-container login-form" onSubmit={formik.handleSubmit}>
        <label>
          <div className="login-input" >
            Username <span style={{color: "red"}}>*</span>
          </div>
          <input
            placeholder="Username..."
            className='login-field'
            name='username'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          { formik.touched.username && formik.errors.username ? (
            <div className="signup-error" >{formik.errors.username}</div>
            ) : null
          }
        </label>
        <label>
          <div className="login-input" >
            Email <span style={{color: "red"}}>*</span>
          </div>
          <input
            placeholder="Email..."
            className='login-field'
            name='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          { formik.touched.email && formik.errors.email ? (
            <div className="signup-error" >{formik.errors.email}</div>
            ) : null
          }
        </label>
        <label>
          <div className="login-input" >
            Password <span style={{color: "red"}}>*</span>
          </div>
          <input
            placeholder="Password..."
            type="password"
            className='login-field'
            name='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          { formik.touched.password && formik.errors.password ? (
             <div className="signup-error" >{formik.errors.password}</div>
            ) : null
          }
        </label>
        <label>
          <div className="login-input" >
            Confirm Password <span style={{color: "red"}}>*</span>
          </div>
          <input
            placeholder="Confirm Password..."
            type="password"
            className='login-field'
            name='re_password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.re_password}
          />
          { formik.touched.re_password && formik.errors.re_password ? (
              <div className="signup-error" >{formik.errors.re_password}</div>
            ) : null
          }
        </label>
        <button className="login-btn" type="submit">SIGN UP</button>
      </form>
      <div className="login-footer" >
        <GoogleLogin isSignup={signup} />
        <span onClick={() => isSignup(!signup)} >login instead?</span>
      </div>
    </div>
  );
}

const LoginContainer = (props) => {
  const validate = (values) => {
    const errors : any = {}

    if(!values.username) {
      errors.username = "Required field";
    } else if(values.username.length > 20) {
      errors.username = "Maximum of 20 characters allowed";
    }

    if(!values.password) {
      errors.password = "Required field";
    }

    return errors;
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validate,
    onSubmit: (values, actions) => {
      console.log(values);
      actions.resetForm({})
    },
  })

  const {signup, isSignup} = props;

  return (
    <div className='login-container'>
      <div className='lock-img-div'>
        <img alt='lock-icon' src={lockImg} style={{
          height: '50px',
          width: '50px',
        }} />
      </div>

      <div className='login-header' >
        LOG IN
      </div>

      <form className="form-container login-form" onSubmit={formik.handleSubmit} noValidate>
        <label>
          <div className="login-input" >
            Username / Email <span style={{color: "red"}}>*</span>
          </div>
          <input
            placeholder="Username..."
            className='login-field'
            name='username'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          { formik.touched.username && formik.errors.username ? (
            <div className="signup-error" >{formik.errors.username}</div>
            ) : null
          }
        </label>
        <label>
          <div className="login-input" >
            Password <span style={{color: "red"}}>*</span>
          </div>
          <input
            placeholder="Password..."
            type="password"
            className='login-field'
            name='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          { formik.touched.password && formik.errors.password ? (
             <div className="signup-error" >{formik.errors.password}</div>
            ) : null
          }
        </label>
        <button 
          disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0} 
          className="login-btn" type="submit"
        >
          LOG IN
        </button>
      </form>
      <div className="login-footer" >
        <GoogleLogin isSignup={signup} />
        <span onClick={() => isSignup(!signup)} >sign up instead?</span>
      </div>
    </div>
  );
}

export default SignupPage;