import React from 'react';
import Delete from './components/Delete.js';

export default function Guest({ guest, toggleGuest, handleClearGuestList }) {
  function handleGuestClick() {
    toggleGuest(guest.id);
  }
  function handleClearClick() {
    handleClearGuestList(guest.id);
  }
  return (
    <div>
      <label class="container">
        <input
          class="checkboxStyle"
          type="checkbox"
          checked={guest.attending}
          onChange={handleGuestClick}
        />
        <span class="checkmark"></span>
        <p class="guestText">
          {guest.firstName} {guest.lastName}
        </p>
        <button onClick={handleClearClick}>Delete</button>
      </label>
    </div>
  );
}
