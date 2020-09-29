import React from 'react';
import './Guest.css';

export default function Guest({ guest, toggleGuest, handleClearGuestList }) {
  function handleGuestClick() {
    toggleGuest(guest.id);
  }
  function handleClearClick() {
    handleClearGuestList(guest.id);
  }
  return (
    <div class="divList">
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
        <button class="button" onClick={handleClearClick}>
          Delete
        </button>
      </label>
    </div>
  );
}
