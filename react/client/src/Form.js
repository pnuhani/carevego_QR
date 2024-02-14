import React, { useState, useEffect } from 'react';

const Form = ({id}) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    useEffect(() => {
        console.log('id:', id);
    }, [id]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('/submit-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
            name,
            address,
            phone,
          }),
        });
        if (response.ok) {
          console.log('Form submitted successfully');
          // Optionally, you can reset the form fields after submission
          setName('');
          setAddress('');
          setPhone('');
        } else {
          console.error('Form submission failed');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <br />
        <label>
          Phone:
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  };
  
  export default Form;