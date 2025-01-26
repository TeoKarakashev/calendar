function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

function generateDays(dateParam = new Date()) {
  const year = dateParam.getFullYear();
  const month = dateParam.getMonth();

  const daysContainer = document.querySelector(".calendar-grid");
  const monthYearTitle = document.getElementById("month-year");

  daysContainer.querySelectorAll(".day").forEach((day) => day.remove());

  const monthName = new Date(year, month).toLocaleString("default", { month: "long" });
  monthYearTitle.textContent = `${monthName} ${year}`;

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDayIndex = new Date(year, month, 1).getDay();

  for (let i = 0; i < firstDayIndex; i++) {
    const blankCell = document.createElement("div");
    blankCell.classList.add("day", "empty");
    daysContainer.appendChild(blankCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.textContent = day;
    dayElement.setAttribute('date', formatDate(dateParam));
    dayElement.setAttribute("data-date", `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`);
    daysContainer.appendChild(dayElement);

    dayElement.addEventListener("click", () => {
      document.getElementById("popup").style.display = "block";
    });
  }
}

async function openPopup(day) {
  const popup = document.getElementById("popup");
  const hourlyReservations = document.getElementById("hourly-reservations");

  hourlyReservations.innerHTML = "";

  const hours = ["9:30", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];

  const events = (await getData('../../server/controller/get_events.php')).data;

  hours.forEach(hour => {
    const currentDayTime = new Date(day);
    currentDayTime.setHours(parseInt(hour.split(':')[0]));
    currentDayTime.setMinutes(parseInt(hour.split(':')[1]));
    currentDayTime.setSeconds(0);

    const hourRow = document.createElement("div");
    hourRow.classList.add("hour-row");

    const hourLabel = document.createElement("span");
    hourLabel.textContent = hour;

    const reserveButton = document.createElement("button");
    reserveButton.textContent = "Reserve";
    reserveButton.onclick = () => reserveSlot(day, hour);
    reserveButton.style.marginLeft = '60px';

    const isReserveDisabled = !!events.find(event => new Date(event.date).getTime() == currentDayTime.getTime());
    
    if (isReserveDisabled) {
      reserveButton.setAttribute('disabled', true);
    }

    const isCancelEnabled = !!events.find(event => new Date(event.date).getTime() == currentDayTime.getTime()
                                                  && localStorage.getItem('username') === event.presenter);

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.onclick = () => cancelReservation(day, hour);

    if (!isCancelEnabled) {
      cancelButton.setAttribute('disabled', true);
    }

    hourRow.appendChild(hourLabel);
    hourRow.appendChild(reserveButton);
    hourRow.appendChild(cancelButton);

    hourlyReservations.appendChild(hourRow);
  });

  popup.style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function reserveSlot(day, hour) {
  console.log(`Reserved ${hour} on ${day}`);
}

function cancelReservation(day, hour) {
  console.log(`Cancelled ${hour} on ${day}`);
}

document.querySelectorAll(".day").forEach(dayElement => {
  dayElement.addEventListener("click", async () => {
    const day = dayElement.textContent;
    await openPopup(day);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  generateDays();

  const days = document.querySelectorAll('.day');
  const popup = document.getElementById('popup');
  const closePopup = document.getElementById('close-popup');

  days.forEach((day) => {
    day.addEventListener('click', () => {
      openPopup(day.getAttribute('date'))
    });
  });

  closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  document.getElementById('prev-month').addEventListener('click', () => {
    const currentMonthDate = document.querySelectorAll(".day")[7].getAttribute('date');

    const newDate = new Date(currentMonthDate);
    newDate.setMonth(newDate.getMonth() - 1);
    generateDays(newDate)
  });

  document.getElementById('next-month').addEventListener('click', () => {
    const currentMonthDate = document.querySelectorAll(".day")[7].getAttribute('date');

    const newDate = new Date(currentMonthDate);
    newDate.setMonth(newDate.getMonth() + 1);
    generateDays(newDate)
  });
});