document.addEventListener("DOMContentLoaded", () => {
  const calendar = document.getElementById("calendar");
  const popup = document.getElementById("popup");
  const popupContent = document.getElementById("popupContent");

  const secondaryPopup = document.getElementById("secondaryPopup");
  const secondaryPopupContent = document.getElementById("secondaryPopupContent");

  // Time slots
  const timeSlots = ["9:30", "10:00", "10:30", "11:00"];

  // Generate the calendar for one month
  const daysInMonth = 30; // Assuming 30 days for simplicity
  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement("div");
    day.className = "day";
    day.textContent = i;
    day.addEventListener("click", () => showPopup(i));
    calendar.appendChild(day);
  }

  // Show the primary popup
  function showPopup(day) {
    // Clear previous content
    popupContent.innerHTML = `
      <div class="popup-header">
        Day Details for Day ${day} 
        <button class="close-btn" id="closeBtn">Close</button>
      </div>
    `;

    const timeSlotContainer = document.createElement("div");
    timeSlots.forEach((time) => {
      const slotDiv = document.createElement("div");
      slotDiv.className = "time-slot";
      slotDiv.innerHTML = `
        <span>${time}</span>
        <button class="reserve-btn">Reserve</button>
        <button class="view-btn" data-time="${time}">View</button>
      `;
      timeSlotContainer.appendChild(slotDiv);
    });

    popupContent.appendChild(timeSlotContainer);

    // Add event listener to close button
    document.getElementById("closeBtn").onclick = () => {
      popup.classList.remove("active");
    };

    // Add event listener to "View" buttons
    const viewButtons = popupContent.querySelectorAll(".view-btn");
    viewButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const time = event.target.getAttribute("data-time");
        showSecondaryPopup(day, time);
      });
    });

    popup.classList.add("active");
  }

  // Show the secondary popup
  function showSecondaryPopup(day, time) {
    secondaryPopupContent.innerHTML = `
      <div class="popup-header">
        Presentation Details for Day ${day} at ${time} 
        <button class="close-btn" id="secondaryCloseBtn">Close</button>
      </div>
      <div class="details">
        <label for="name">Име:</label>
        <input type="text" id="name" placeholder="Enter your name" />
        
        <label for="Име в системата">:</label>
        <input type="text" id="username" placeholder="Enter your username" />
        
        <label for="presentation">Тема:</label>
        <input type="text" id="presentation" placeholder="Enter presentation name" />
      </div>
    `;

    // Add close button behavior for secondary popup
    document.getElementById("secondaryCloseBtn").onclick = () => {
      secondaryPopup.classList.remove("active");
      secondaryPopupContent.innerHTML = ''; // Reset content
    };

    secondaryPopup.classList.add("active");
  }
});
