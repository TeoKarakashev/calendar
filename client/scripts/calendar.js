import { drawRadarDiagram } from './radar.js'

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

const generateDays = (dateParam = new Date()) => {
  const year = dateParam.getFullYear();
  const month = dateParam.getMonth();

  const daysContainer = document.querySelector(".calendar-grid");
  const monthYearTitle = document.getElementById("month-year");

  daysContainer.querySelectorAll(".day").forEach((day) => day.remove());

  const monthName = new Date(year, month).toLocaleString("bg-BG", { month: "long" });
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

    const currentDay = new Date(dateParam);
    currentDay.setDate(day);

    dayElement.setAttribute('date', formatDate(currentDay));
    dayElement.setAttribute("data-date", `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`);
    daysContainer.appendChild(dayElement);

    dayElement.addEventListener("click", () => {
      document.getElementById("popup").style.display = "block";
    });
  }

  document.querySelectorAll(".day").forEach(dayElement => {
    dayElement.addEventListener("click", async () => {
      const day = dayElement.getAttribute('date');
      await openPopup(day);
    });
  });
}

const areDatesEqual = (first, second) => {
  return first.getFullYear() === second.getFullYear()
    && first.getMonth() === second.getMonth()
    && first.getDate() === second.getDate()
    && first.getTime() === second.getTime();
};

const openPopup = async (day) => {
  const popup = document.getElementById("popup");
  const hourlyReservations = document.getElementById("hourly-reservations");

  hourlyReservations.innerHTML = "";

  const hours = ["9:30", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];

  const username = localStorage.getItem('username');

  const events = (await getData('../../server/controller/get_events.php')).data;

  const presentationInterests = (await getData('../../server/controller/get_presentationInterests.php')).data;

  const hasCurrentUserReserved = events.find(event => event.presenter === username);

  const currentUserPresentation = (await getData('../../server/controller/load-user.php')).presentation;

  const isCurrentUserAdmin = localStorage.getItem('role') === 'admin';

  hours.forEach(hour => {
    const currentDayTime = new Date(day);
    currentDayTime.setHours(parseInt(hour.split(':')[0]));
    currentDayTime.setMinutes(parseInt(hour.split(':')[1]));
    currentDayTime.setSeconds(0);

    const hourRow = document.createElement("div");
    hourRow.classList.add("hour-row");

    const hourLabel = document.createElement("span");
    hourLabel.textContent = hour;
    hourRow.appendChild(hourLabel);

    const matchingEvent = events.find(event => areDatesEqual(new Date(event.date), currentDayTime));

    const presentationTitleDiv = document.createElement("div");
    presentationTitleDiv.style.width = '200px';
    presentationTitleDiv.style.marginLeft = '30px';

    if (matchingEvent) {
      presentationTitleDiv.textContent = matchingEvent.presentation_title;
    }

    hourRow.appendChild(presentationTitleDiv);

    const reserveButton = document.createElement("button");
    reserveButton.textContent = "Резервирай";
    reserveButton.onclick = async () => {
      await reserveSlot(currentUserPresentation, username, currentDayTime);
      location.reload();
    };
    reserveButton.style.marginLeft = '60px';

    const isReserveDisabled = !!matchingEvent;

    if (isReserveDisabled || hasCurrentUserReserved || !currentUserPresentation) {
      reserveButton.setAttribute('disabled', true);
    }

    hourRow.appendChild(reserveButton);

    // const isCancelEnabled = !!events.find(event => areDatesEqual(new Date(event.date), currentDayTime));

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Отказ";
    cancelButton.onclick = async () => await cancelReservation(matchingEvent.presentation_title, matchingEvent.presenter);

    if (!((isCurrentUserAdmin && matchingEvent) || (!isCurrentUserAdmin && matchingEvent && matchingEvent.presenter === username))) {
      cancelButton.setAttribute('disabled', true);
    }

    hourRow.appendChild(cancelButton);

    hourlyReservations.appendChild(hourRow);
  });

  const radarDiagramButton = document.createElement("button");
  radarDiagramButton.textContent = "Радар диаграма на интересите";
  radarDiagramButton.setAttribute('id', 'generate-button');
  radarDiagramButton.onclick = () => openRadar(events, presentationInterests, new Date(day));
  hourlyReservations.appendChild(radarDiagramButton);

  const automaticAssignButton = document.createElement("button");
  automaticAssignButton.textContent = "Автоматично записване";
  automaticAssignButton.setAttribute('id', 'automatic-assign-button');
  automaticAssignButton.onclick = async () => {
      await automaticAssign(events, presentationInterests, localStorage.getItem('username'), currentUserPresentation, new Date(day))
      location.reload()
    };

  if (currentUserPresentation && !hasCurrentUserReserved && !isCurrentUserAdmin) {
    hourlyReservations.appendChild(automaticAssignButton);
  }

  const adminAssignButton = document.createElement("button");
  adminAssignButton.textContent = "Автоматично записване на всички";
  adminAssignButton.setAttribute('id', 'automatic-assign-button');
  adminAssignButton.onclick = async () => {
    await adminAssign(presentationInterests, new Date(day));
    location.reload();
  }

  if (isCurrentUserAdmin) {
    hourlyReservations.appendChild(adminAssignButton);
  }

  popup.style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

const reserveSlot = async (currentUserPresentation, username, currentDayTime) => {
  await sendData('../../server/controller/add_event.php',
    {
      presentationTitle: currentUserPresentation,
      presenter: username,
      date: formatDate(currentDayTime)
    })
    .catch(err => console.log(err));
}

const cancelReservation = async (currentUserPresentation, username) => {
  await sendData('../../server/controller/delete_event.php',
    {
      presentationTitle: currentUserPresentation,
      presenter: username
    })
    .catch(err => console.log(err));

    location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
  generateDays();

  const popup = document.getElementById('popup');
  const closePopup = document.getElementById('close-popup');

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

document.getElementById('radar').addEventListener('click', () => closeRadarPopup());
document.getElementById('close-popup').addEventListener('click', () => closePopup());

function closeRadarPopup() {
  document.getElementById("radar").style.display = "none";
}

const openRadar = (events, presentationInterests, dayDate) => {
  const interestCounts = {};

  const dailyEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0);
    eventDate.setMinutes(0);
    eventDate.setSeconds(0);
    eventDate.setMilliseconds(0);

    dayDate.setHours(0);
    dayDate.setMinutes(0);
    dayDate.setSeconds(0);
    dayDate.setMilliseconds(0);

    return areDatesEqual(eventDate, dayDate);
  })

  dailyEvents.forEach(event => {
    presentationInterests.forEach(presentationInterest => {
      if (event.presentation_title === presentationInterest.title) {
        if (!interestCounts[presentationInterest.interest]) {
          interestCounts[presentationInterest.interest] = 0;
        }
        interestCounts[presentationInterest.interest]++;
      }
    });
  });

  drawRadarDiagram(Object.keys(interestCounts), Object.values(interestCounts));
  document.getElementById("radar").style.display = "block";
};

const haveSameInterests = (event, presentationInterests, userPresentationInterests) => {
  const eventInterests =
    presentationInterests.filter(pi => pi.title === event.presentation_title).map(pi => pi.interest);

  return eventInterests.every(interest => userPresentationInterests.includes(interest))
    && userPresentationInterests.every(interest => eventInterests.includes(interest));
};

const automaticAssign = async (events, presentationInterests, currentUser, currentUserPresentation, dayDate) => {
  const hours = ["9:30", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];

  const userPresentationInterests =
    presentationInterests.filter(pi => pi.title === currentUserPresentation).map(pi => pi.interest);

  while (true) {
    const dailyEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0);
      eventDate.setMinutes(0);
      eventDate.setSeconds(0);
      eventDate.setMilliseconds(0);

      dayDate.setHours(0);
      dayDate.setMinutes(0);
      dayDate.setSeconds(0);
      dayDate.setMilliseconds(0);

      return areDatesEqual(eventDate, dayDate);
    });

    const hasPresentationWithSameInterests = dailyEvents.some(event => haveSameInterests(event, presentationInterests, userPresentationInterests))

    if (hasPresentationWithSameInterests) {
      dayDate.setDate(dayDate.getDate() + 1);
      continue;
    }

    for (const hour of hours) {
      const currentDayTime = new Date(dayDate);
      currentDayTime.setHours(parseInt(hour.split(':')[0]));
      currentDayTime.setMinutes(parseInt(hour.split(':')[1]));
      currentDayTime.setSeconds(0);

      const matchingEvent = events.find(event => areDatesEqual(new Date(event.date), currentDayTime));

      if (!matchingEvent) {
        await reserveSlot(currentUserPresentation, currentUser, currentDayTime);
        return;
      }
    }

    dayDate.setDate(dayDate.getDate() + 1);
  }
};

const adminAssign = async (presentationInterests, startDate) => {
  const allPresentations = (await getData('../../server/controller/presentation.php')).all

  let events = (await getData('../../server/controller/get_events.php')).data;

  const presentationsToAssign = allPresentations.filter(presentation => presentation.is_taken
    && !events.find(event => event.presentation_title === presentation.title));

    for (const presentation of presentationsToAssign) {
      await automaticAssign([...events], [...presentationInterests], presentation.username, presentation.title, new Date(startDate));

      events = (await getData('../../server/controller/get_events.php')).data;
    }
}