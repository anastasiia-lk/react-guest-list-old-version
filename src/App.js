import React, { useEffect, useState, useRef } from 'react';
// import { showNotification } from 'react-admin';
/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { jsx, css } from '@emotion/core';

//import DataFetchingWithUseEffect from './DataFetchingWithUseEffect';
import GuestList from './GuestList.js';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'guestApp.guestList';

function App() {
  const [guestList, setGuestList] = useState([]);
  const guestFirstNameRef = useRef();
  const guestLastNameRef = useRef();

  useEffect(() => {
    const storedGuestList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedGuestList) setGuestList(storedGuestList);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(guestList));
  }, [guestList]);

  function toggleGuest(id) {
    const newGuestList = [...guestList];
    const guest = newGuestList.find((guest) => guest.id === id);
    guest.complete = !guest.complete;
    setGuestList(newGuestList);
  }

  function handleAddGuest(e) {
    const name =
      guestFirstNameRef.current.value + ' ' + guestLastNameRef.current.value;
    if (name === '') return;
    setGuestList((prevGuestList) => {
      return [...prevGuestList, { id: uuidv4(), name: name, complete: false }];
    });
    console.log(name);
    guestFirstNameRef.current.value = null;
    guestLastNameRef.current.value = null;
  }

  function handleClearGuestList() {
    const newGuestList = guestList.filter((guest) => !guest.complete);
    setGuestList(newGuestList);
  }

  const DataPost = async () => {
    // useEffect(() => {
    // const fetchData = async () => {
    const response = await fetch('http://localhost:5000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // firstName: 'hello',
        // lastName: 'world',
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
      }),
    });
    const createdGuest = await response.json();
  };
  // fetchData();
  // }, []);
  return (
    <div>
      <GuestList guestList={guestList} toggleGuest={toggleGuest} />
      <input
        ref={guestFirstNameRef}
        type="text"
        id="firstName"
        placeholder="Enter the first name"
      />
      <input
        class="inputFirstNameStyles"
        ref={guestLastNameRef}
        type="text"
        id="lastName"
        placeholder="Enter the last name"
      />
      <button onClick={handleAddGuest}>Print Guest</button>
      <button onClick={handleClearGuestList}>Delete Guest</button>
      <button onClick={DataPost}>Add the guest</button>
      <div>{guestList.filter((guest) => !guest.complete).length} confirmed</div>
      <div>{guestList.filter((guest) => guest.complete).length} delete </div>
    </div>
  );
}

export default App;
