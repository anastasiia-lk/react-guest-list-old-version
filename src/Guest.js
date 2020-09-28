import React from 'react';

export default function Guest({ guest, toggleGuest }) {
  function handleGuestClick() {
    toggleGuest(guest.id);
  }
  return (
    <div>
      <label class="container">
        <input
          class="checkboxStyle"
          type="checkbox"
          checked={guest.complete}
          onChange={handleGuestClick}
        />
        <span class="checkmark"></span>
        <p class="guestText">{guest.name}</p>
      </label>
    </div>
  );
}
