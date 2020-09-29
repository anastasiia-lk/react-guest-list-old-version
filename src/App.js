// eslint-disable-next-line
import React, { useEffect, useState, useRef } from 'react';
/** @jsx jsx */
/** @jsxFrag React.Fragment */
// eslint-disable-next-line
import { jsx, css } from '@emotion/core';
import GuestList from './GuestList.js';

const baseUrl = 'http://localhost:5000';

function App() {
  const [guestList, setGuestList] = useState([]);
  const [id, setId] = useState(0);
  const guestFirstNameRef = useRef();
  const guestLastNameRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(baseUrl);
      const storedGuestList = await response.json();
      if (storedGuestList) setGuestList(storedGuestList);
    };

    fetchData();
  }, []);

  async function toggleGuest(id) {
    const newGuestList = [...guestList];
    const guest = newGuestList.find((guest) => guest.id === id);
    guest.attending = !guest.attending;
    setGuestList(newGuestList);

    // const response =
    await fetch(`${baseUrl}/${guest.id}`, {
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
          id: newId,
          firstName: newFirstName,
          lastName: newLastName,
          attending: false,
        },
      ];
    });
    setId(newId);
    // const response =
    await fetch('http://localhost:5000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: guestFirstNameRef.current.value,
        lastName: guestLastNameRef.current.value,
      }),
    });
    guestFirstNameRef.current.value = null;
    guestLastNameRef.current.value = null;
  }

  async function handleClearGuestList(id) {
    const newGuestList = guestList.filter((guest) => {
      if (guest.id === id) {
        return false;
      }
      return true;
    });
    setGuestList(newGuestList);
    // const response =
    await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });
  }

  return (
    <div>
      <GuestList
        guestList={guestList}
        toggleGuest={toggleGuest}
        handleClearGuestList={handleClearGuestList}
      />
      <div class="waitingStyles">
        {guestList.filter((guest) => !guest.attending).length} waiting
      </div>
      <div class="confirmedStyles">
        {guestList.filter((guest) => guest.attending).length} confirmed
      </div>
      <br />
      <div class="inputFirstNameStyles">
        <input
          ref={guestFirstNameRef}
          type="text"
          id="firstName"
          placeholder="Enter the first name"
        />
      </div>
      <div class="inputLastNameStyles">
        <input
          ref={guestLastNameRef}
          type="text"
          id="lastName"
          placeholder="Enter the last name"
        />
      </div>
      <br />
      <button class="buttonAdd" onClick={handleAddGuest}>
        Add Guest
      </button>
    </div>
  );
}

export default App;
