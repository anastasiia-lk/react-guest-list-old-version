import React, { useEffect, useState, useRef } from 'react';
// import { showNotification } from 'react-admin';
/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { jsx, css } from '@emotion/core';

//import DataFetchingWithUseEffect from './DataFetchingWithUseEffect';
import GuestList from './GuestList.js';
import { v4 as uuidv4 } from 'uuid';

// Change to the API
const LOCAL_STORAGE_KEY = 'guestApp.guestList';
const baseUrl = 'http://localhost:5000';

function App() {
  const [guestList, setGuestList] = useState([]);
  const [id, setId] = useState(0);
  const guestFirstNameRef = useRef();
  const guestLastNameRef = useRef();

  // Save after refreshing
  // useEffect(() => {
  //  const storedGuestList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //  if (storedGuestList) setGuestList(storedGuestList);
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000');
      const storedGuestList = await response.json();
      if (storedGuestList) setGuestList(storedGuestList);
      // console.log(storedGuestList);
    };

    fetchData();
    // });
  }, []);

  // Every time save when changing smth
  // useEffect(() => {
  // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(guestList));
  // }, [guestList]);

  /* useEffect(() => {
    const DataPost = async () => {
      const response = await fetch('http://localhost:5000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      firstName: guestFirstNameRef.current.value,
      lastName: guestLastNameRef.current.value,
      }),
    });
  }, [guestList]); */

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
        firstName: guestFirstNameRef.current.value,
        lastName: guestLastNameRef.current.value,
      }),
    });
    const createdGuest = await response.json();
  };

  /* function toggleGuest(id) {
    const newGuestList = [...guestList];
    const guest = newGuestList.find((guest) => guest.id === id);
    guest.attending = !guest.attending;
    setGuestList(newGuestList);
  }
  */

  async function toggleGuest(id) {
    const newGuestList = [...guestList];
    const guest = newGuestList.find((guest) => guest.id === id);
    guest.attending = !guest.attending;
    setGuestList(newGuestList);

    const response = await fetch(`${baseUrl}/${guest.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: true }),
    });
  }

  async function handleAddGuest(e) {
    const newFirstName = guestFirstNameRef.current.value;
    const newLastName = guestLastNameRef.current.value;
    const newId = id + 1;
    if (newFirstName === '') return;
    if (newLastName === '') return;
    setGuestList((prevGuestList) => {
      return [
        ...prevGuestList,
        {
          /*id: uuidv4(),*/ id: newId,
          firstName: newFirstName,
          lastName: newLastName,
          attending: false,
        },
      ];
    });
    setId(newId);
    const response = await fetch('http://localhost:5000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: guestFirstNameRef.current.value,
        lastName: guestLastNameRef.current.value,
      }),
    });
    // console.log(newFirstName);
    // console.log(newLastName);
    guestFirstNameRef.current.value = null;
    guestLastNameRef.current.value = null;
  }

  async function handleClearGuestList(id) {
    // const newDelGuestList = [...guestList];
    // const guest = newDelGuestList.find((guest) => guest.id === id);
    // setGuestList(newGuestList);
    // const newDelGuestList = [...guestList];
    // const guest = newDelGuestList.find((guest) => guest.id === id);
    // const guest = newDelGuestList.find((guest) => guest.id === id);
    const newGuestList = guestList.filter((guest) => {
      if (guest.id === id) {
        return false;
      }
      return true;
    });
    setGuestList(newGuestList);
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });
    // const response = await fetch(`${baseUrl}/${guest.id}`, {
    // method: 'DELETE',
    // });

    // const newGuestList = guestList.filter((guest) => !guest.id);
    // setGuestList(newGuestList);
  }

  /* const DataPost = async () => {
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
        firstName: guestFirstNameRef.current.value,
        lastName: guestLastNameRef.current.value,
      }),
    });
    const createdGuest = await response.json();
  };
  // fetchData();
  // }, []);*/

  return (
    <div>
      <GuestList
        guestList={guestList}
        toggleGuest={toggleGuest}
        handleClearGuestList={handleClearGuestList}
      />
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
      <button onClick={handleAddGuest}>Add Guest</button>
      <button onClick={handleClearGuestList}>Delete Guest</button>
      <div>
        {guestList.filter((guest) => !guest.attending).length} waiting the
        decision
      </div>
      <div>{guestList.filter((guest) => guest.attending).length} confirmed</div>
    </div>
  );
}

export default App;
