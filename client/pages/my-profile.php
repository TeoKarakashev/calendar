<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Calendar</title>
  <script src="../scripts/utilities.js"></script>
  <script src="../scripts/index.js"></script>
  <script src="../scripts/logout.js"></script>
  <script src="../scripts/my-profile.js"></script>
</head>
<body onload="loadSessionMyProfile()">
  <nav class="navbar">
    <a href="./index.php" class="logo">
      <p class="logo-text">Calendar</p>
    </a>
    <ul>
    <li><a class="links" id="logout-btn" onclick="logout(event)">Logout</a></li>
      <li><a class="links" id="interests-btn" href="./interests.php">Interests</a></li>
      <li><a class="links" id="my-profile-btn" href="./my-profile.php">My Profile</a></li>
      <li><a class="links" id="presentation-btn" href="./presentations.php">Presentations</a></li>
    </ul>

    </nav>

    <div id="content">
      <div id="profile">
        <p id="profile-title">My Profile</p>
        <div id="profile-info">
          <p id="first-name">First Name: </p>
          <p id="last-name">Last Name: </p>
          <p id="username">Username: </p>
          <p id="interests">Interests: </p>
          <p id="presentation">Presentation: </p>
        </div>
      </div>
</body>
</html>
