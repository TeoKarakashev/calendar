<?php
  session_start();
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Calendar</title>
  <script src="../scripts/utilities.js"></script>
  <script src="../scripts/index.js"></script>
  <script src="../scripts/logout.js"></script>
  
  
</head>
<body onload="loadInterests()">
  <nav class="navbar">
    <ul>
    <li><a class="links" id="logout-btn" onclick="logout(event)">Logout</a></li>
      <li><a class="links" id="interests-btn" href="./interests.php">Interests</a></li>
      <li><a class="links" id="my-profile-btn" href="./my-profile.php">My Profile</a></li>
      <li><a class="links" id="presentation-btn" href="./presentations.php">Presentations</a></li>
    </ul>
  </nav>
  <div id="content">
  <form id="interests-form"></form>
  <button id="update-btn" type="submit">Update</button>
  </div>

  <script src="../scripts/interests.js"></script>
</body>
</html>
