import { useState } from "react";
import CustomInput from "./CustomInput";
import {isEmail, isNotEmpty, hasMinLength} from '../util/validations.js'

export default function Login() {

  /**
   * How to use forms in react, a simpliest example using submmit credentials form. 
   * Keep in mind, we can do similar process using ref() example on the top
   */

  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const [editInput, setEditInput] = useState({ email: false, password: false });


  /**
   * We can manage validations with our libraries 
   */
  const isEmailCorrect = editInput.email && isEmail(credentials.email);
  const isPasswordCorrect = editInput.password && isNotEmpty(credentials.password) && hasMinLength(credentials.password, 3);


  function handleCredentialsChange(event) {
    //example:  name=email value="input value for user" ---  name=password value="input value for user"
    const { name, value } = event.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      //Using computed property names [name]: value, in this way allows for flexible and dynamic updates to the state based on form inputs.
      [name]: value
    }));

    //It restart the state value of the validation Blur for the input 
    setEditInput(prev => ({
      ...prev,
      [name]: false
    }))
  }

  function handleInputBlur(identifier) {
    console.log(`handleInputBlur called with identifier: ${identifier}`);
    console.log(`Current credentials: ${JSON.stringify(credentials)}`);
    //If the input is empty we dont set the state
    if (credentials[identifier].length > 0) {
      //Here we manage the state of inputs(has been edited)
      setEditInput(prev => ({
        ...prev,
        [identifier]: true
      }))
    }
  }

  function handleSubmmit(event) {
    event.preventDefault(); //this function is to avoid the browser behavior submitting a form

    if (!isEmailCorrect) {
      console.log("The email is not correct... please enter a correct email address")
      return;
    }
    if (!isPasswordCorrect) {
      console.log("The password is not correct... please enter a correct password")
      return;
    }
    console.log(credentials)
  }

  return (
    <form onSubmit={handleSubmmit}>
      <h2>Login</h2>

      <div className="control-row">
        <CustomInput
          label="Email"
          id="email"
          type="email"
          name="email"
          //On blur means the input was press and the user is writting
          onBlur={() => handleInputBlur('email')}
          //onChange is executed after onBlur
          onChange={handleCredentialsChange}
          error={editInput.email && !isEmailCorrect && 'Please enter a valid email'}
        />

        <CustomInput
          label="Password"
          id="password"
          type="password"
          name="password"
          onBlur={() => handleInputBlur('password')}
          onChange={handleCredentialsChange}
          error={editInput.password && !isPasswordCorrect && 'Please enter a valid password'}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat" type="reset">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}

/**
 * ALTERNATIVE WAY TO MAKE A FORM
 */

// function LoginForm() {
//   const emailRef = useRef();
//   const passwordRef = useRef();

//   function handleSubmit(event) {
//     event.preventDefault();
//     const email = emailRef.current.value;
//     const password = passwordRef.current.value;
//     console.log('Submitted credentials:', { email, password });
//     // Handle form submission with email and password
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>

//       <div className="control-row">
//         <div className="control no-margin">
//           <label htmlFor="email">Email</label>
//           <input id="email" type="email" name="email" ref={emailRef} />
//         </div>

//         <div className="control no-margin">
//           <label htmlFor="password">Password</label>
//           <input id="password" type="password" name="password" ref={passwordRef} />
//         </div>
//       </div>

//       <p className="form-actions">
//         <button type="button" className="button button-flat">Reset</button>
//         <button type="submit" className="button">Login</button>
//       </p>
//     </form>
//   );
// }

