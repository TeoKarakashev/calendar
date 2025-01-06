<?php
  session_start();
  if (isset($_SESSION['username'])) {
    echo('Authorized!');
  } else {
    echo('Unauthorized');
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calendar</title>
  <script src="../scripts/utilities.js"></script>
  <script src="../scripts/index.js"></script>
  <script src="../scripts/logout.js"></script>
  <script src="../scripts/calendar.js"></script>
  <link rel="stylesheet" href="../styles/calendar.css"/>
</head>
<body onload="loadSession()">
  <nav class="navbar">
    <ul>
      <li><a class="links" id="logout-btn" onclick="logout(event)">Logout</a></li>
      <li><a class="links" id="interests-btn" href="./interests.php">Interests</a></li>
      <li><a class="links" id="my-profile-btn" href="./my-profile.php">My Profile</a></li>
      <li><a class="links" id="presentation-btn" href="./presentations.php">Presentations</a></li>
      <li><a class="links" id="sign-in-btn" href="./register.php">Register</a></li>
      <li><a class="links" id="sign-up-btn" href="./login.php">Login</a></li>
    </ul>
  </nav>

  <div id="content">
    <h1 style="text-align: center;">Simple Calendar</h1>
    <div class="calendar" id="calendar"></div>
  </div>

  <!-- Primary Popup -->
  <div class="popup" id="popup">
    <div id="popupContent"></div>
  </div>

  <!-- Secondary Popup -->
  <div class="popup" id="secondaryPopup">
    <div id="secondaryPopupContent"></div>
  </div>
</body>
</html>
