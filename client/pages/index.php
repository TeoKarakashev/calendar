<?php
  session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calendar</title>
  <script defer src="../scripts/utilities.js"></script>
  <script defer src="../scripts/index.js"></script>
  <script defer src="../scripts/logout.js"></script>
  <script defer src="../scripts/calendar.js"></script>
  <link rel="stylesheet" href="../styles/calendar.css"/>
  <link rel="stylesheet" href="../styles/navbar.css"/>
</head>
<body onload="loadSession()">
  <?php include '../components/navbar.php'; ?>

  <div id="content">
  <h1 style="text-align: center;">Simple Calendar</h1>
  <div class="calendar" id="calendar"></div>
  </div>

  <div class="popup" id="popup">
    <div id="popupContent"></div>
  </div>

  <div class="popup" id="secondaryPopup">
    <div id="secondaryPopupContent"></div>
  </div>
</body>
<script defer src="../scripts/navbar.js"></script>
</html>
