<?php
  session_start();
  if (isset($_SESSION['username'])) {
    header("location: index.php");
  }
?>
<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8"/>
  <title>Presentation calendar</title>
  <script defer src="../scripts/utilities.js"></script>
  <script defer src="../scripts/register.js"></script>
  <script defer src="../scripts/navbar.js"></script>
  <link rel="stylesheet" href="../styles/navbar.css"/>
  <link rel="stylesheet" href="../styles/register.css"/>
</head>
<body>
  <nav class="navbar">
    <ul>
    <li><a class="links" id="home-btn" href="./index.php">Home</a></li>
      <li><a class="links" id="interests-btn" href="./interests.php">Interests</a></li>
      <li><a class="links" id="my-profile-btn" href="./my-profile.php">My Profile</a></li>
      <li><a class="links" id="presentation-btn" href="./presentations.php">Presentations</a></li>
      <li><a class="links" id="sign-in-btn" href="./register.php">Register</a></li>
      <li><a class="links" id="sign-up-btn" href="./login.php">Login</a></li>
      <li><a class="links" id="logout-btn" onclick="logout(event)">Logout</a></li>
    </ul>
  </nav>

  <form id="register-form">
  <p class="form-title">Register</p>
  <div class="form-input">
    <input type="text" placeholder="First Name" id="first-name" />
    <p class="error-message" id="first-name-error">First Name is required.</p>
  </div>
  <div class="form-input">
    <input type="text" placeholder="Last Name" id="last-name" />
    <p class="error-message" id="last-name-error">Last Name is required.</p>
  </div>
  <div class="form-input">
    <input type="text" placeholder="Username" id="username" />
    <p class="error-message" id="username-error">Username is required.</p>
  </div>
  <div class="form-input">
    <input type="password" placeholder="Password" id="password" />
    <p class="error-message" id="password-error">Password is required.</p>
  </div>
  <div class="form-input">
    <input type="password" placeholder="Repeat Password" id="repeat-password" />
    <p class="error-message" id="repeat-password-error">Passwords must match.</p>
  </div>
  <button id="register-button" type="submit">SIGN IN</button>
</form>

</body>
</html>
