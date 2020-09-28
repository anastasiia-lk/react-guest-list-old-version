import React from 'react';
import Guest from './Guest.js';

export default function GuestList({ guestList, toggleGuest }) {
  return guestList.map((guest) => {
    return <Guest key={guest.id} toggleGuest={toggleGuest} guest={guest} />;
  });
}
