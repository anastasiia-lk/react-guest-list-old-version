import React from 'react';
import Guest from './Guest.js';

export default function GuestList({
  guestList,
  toggleGuest,
  handleClearGuestList,
}) {
  return guestList.map((guest) => {
    return (
      <Guest
        key={guest.id}
        toggleGuest={toggleGuest}
        guest={guest}
        handleClearGuestList={handleClearGuestList}
      />
    );
  });
}
