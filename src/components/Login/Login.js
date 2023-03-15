import React, { useEffect, useState, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

//reducer for an email 
const emailReducer = (state, action) => {
  switch (action.type) {
    case 'user_input': {
      return {
        value: action.val,
        isValid: action.val.includes('@')
      };
    }
    case 'email_valid': {
      return {
        value: state.value,
        isValid: state.value.includes('@')
      };
    }
    default: {
      return {
        value: '',
        isValid: false
      }
    }
  }

}
//reducer func for the password of the form
const pswdReducer = (state, action) => {
  switch (action.type) {
    case 'password_input': {
      return {
        value: action.val,
        isValid: action.val.trim().length > 6
      };
    }
    case 'password_valid': {
      return {
        value: state.value,
        isValid: state.value.trim().length > 6
      };
    }
    default: {
      return {
        value: '',
        isValid: false
      }
    }
  }

}
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);


  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null });
  const [passwordState,dispatchPassword]=useReducer(pswdReducer,{value:'',isValud:null});

  const {isValid:emailisValid}=emailState; //destructring the object using alias
  const {isValid:passwordisValid}=passwordState;

  // here we are using useeffect to have a better so that there should be proper previous state value
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("checking form validity");
      setFormIsValid(emailisValid && passwordisValid);
    }, 500);
    return () => 
    {
      console.log("cleanup running");
      clearTimeout(identifier);
    }  
  }, [emailisValid, passwordisValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: 'user_input',
      val: event.target.value
    });
    // setFormIsValid(event.target.value.includes('@') && passwordState.value.trim().length > 6);
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({
      type:'password_input',
      val:event.target.value
    })
    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({
      type: 'email_valid',
    })
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({
      type:'password_valid'
    })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
