<div class="timer-container">
    <h1>Таймер</h1>
    <input type="number" id="minutes" min="0" value="0"> : 
    <input type="number" id="seconds" min="0" max="59" value="0">
    <br>
    <button onclick="startTimer()">Старт</button>
    <button onclick="resetTimer()">Стоп</button>
    <h2 id="display">00:00</h2>
</div>