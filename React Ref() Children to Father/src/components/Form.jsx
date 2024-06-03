import React, { useRef, useState, forwardRef, useImperativeHandle } from "react";

const Form = forwardRef((props, ref) => {

  //States Hooks
  const form = useRef();
  const nameRef = useRef();
  const emailRef = useRef();

  const [name, setNam] = useState('');
  const [email, setEm] = useState('');

  /**
   * We can sent a ref property to the father using this function provided by React
   */
  useImperativeHandle(ref, () => ({
    clear() {
      form.current.reset();
      setNam('');
      setEm('');
    },
  }));

  function handleData(e) {
    e.preventDefault();
    setNam(nameRef.current.value);
    setEm(emailRef.current.value);
  }

  return (
    <>
      <form ref={form}>
        <p>
          <label htmlFor="name">Name</label>
          <input ref={nameRef} type="text" id="name" />
        </p>

        <p>
          <label htmlFor="email">Email</label>
          <input ref={emailRef} type="email" id="email" />
        </p>
        <p id="actions">
          <button onClick={handleData}>Save</button>
        </p>
      </form>
      <p>{name}</p>
      <p>{email}</p>
    </>
  );
});

export default Form;
