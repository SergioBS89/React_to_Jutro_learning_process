import { useState } from "react";

export default function Signup() {
  /**
   * This is a big example how to deal with forms in react
   */

  const [passwordsAreNotEquals, setPasswordsAreNotEquals] = useState(false)

  function handleSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.target);
   
    //We can retrive all inputs using this approach
    // const email = formData.get('email'); //It makes reference to the input property name
    // const password = formData.get('password');
    // const confPassword = formData.get('confirm-password');

    //However the best way to deal with a complex form is using Object.fromEntries which generates an array with all the values :
    const data = Object.fromEntries(formData.entries());

    //if we have a multi option input
    const multiOption = formData.getAll('acquisition');
    //Now we add the new property to our array of inputs values
    data.multiOption = multiOption;    

    //How to validate that both passwords are equal
    if(data.password !== data['confirm-password']){
      //We set the state as true becuase are not equals
      setPasswordsAreNotEquals(true)
      console.log('Passwords are diferent')
      return;
    }
    setPasswordsAreNotEquals(false)
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        {/* A basic HTML validation is required */}
        <input id="email" type="email" name="email" required/>
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required minLength={3}/>
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            required
          />
          <div className="control-error">{passwordsAreNotEquals && <p>Passwords are different!</p>}</div>
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" required/>
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" required/>
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role" required>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" required/>I
          I agree to the terms and conditions
        </label>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  );
}
