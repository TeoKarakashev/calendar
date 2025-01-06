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
</head>
<body>
  <nav class="navbar">
    <a href="./index.php" class="logo">
      <p class="logo-text">Calendar</p>
    </a>
    <ul>
      <li><a class="links" href="./register.php">Register</a></li>
      <li><a class="links" href="./login.php">Login</a></li>
    </ul>
  </nav>
  <div id="errors">
    <p class="error-msg"></p>
  </div>
  <form id="register-form">
    <p class="form-title">Sign In</p>
    <div class="form-input">
      <input type="text" placeholder="First Name" id="first-name"/>
    </div>
    <div class="form-input">
      <input type="text" placeholder="Last Name" id="last-name"/>
    </div>
    <div class="form-input">
      <input type="text" placeholder="Username" id="username"/>
    </div>
    </div>
    <div class="form-input">
      <input type="password" placeholder="Password" id="password"/>
    </div>
    <div class="form-input">
      <input type="password" placeholder="Repeat Password" id="repeat-password"/>
    </div>
    <button id="sign-in-btn" type="submit">SIGN IN</button>
</form>
</body>
</html>
