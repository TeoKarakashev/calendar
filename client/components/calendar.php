<div class="calendar-container">
    <div class="calendar-header">
      <button class="nav-btn" id="prev-month">&lt;</button>
      <h2 id="month-year"></h2>
      <button class="nav-btn" id="next-month">&gt;</button>
    </div>
    <div class="calendar-grid">

      <div class="day-label">Нд</div>
      <div class="day-label">Пн</div>
      <div class="day-label">Вт</div>
      <div class="day-label">Ср</div>
      <div class="day-label">Чт</div>
      <div class="day-label">Пт</div>
      <div class="day-label">Сб</div>
    </div>
  </div>

  <div class="popup" id="popup">
  <div id="popupContent">
    <button id="close-popup">X</button>
    <div id="hourly-reservations">
    </div>
  </div>
  </div>

  <div class="radar" id="radar">
  <div id="radarContent">
    <button id="radar-close-popup">X</button>
    <canvas id="radarCanvas" width="400px" height="400px"></canvas>
  </div>
  </div>
</div>