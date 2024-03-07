import React, { useState, useEffect } from 'react';

function App() {
  const [qrData, setQrData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = async (qrId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/userdata/${qrId}`);
      if (response.ok) {
        const data = await response.json();
        setQrData(data);
        setErrorMessage('');
      } else {
        setQrData(null);
        setErrorMessage('QR ID does not exist');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setQrData(null);
      setErrorMessage('Error fetching data');
    }
  };

  useEffect(() => {
    // Call fetchData function with the desired QR ID when the component mounts
    fetchData('UyBEAHf6'); // You can replace 'UyBEAHf6' with any desired QR ID
  }, []);

  return (
    <div className="App">
      <h1>QR Data Display</h1>
      {errorMessage && <p>{errorMessage}</p>}
      {qrData && (
        <div>
          <h2>QR Data</h2>
          <p>ID: {qrData.id}</p>
          <p>QR ID: {qrData.qrid}</p>
          <p>Name: {qrData.name || 'N/A'}</p>
          <p>Phone: {qrData.phone || 'N/A'}</p>
          <p>Address: {qrData.address || 'N/A'}</p>
          <p>Is Activated: {qrData.isactivated ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
}

export default App;
