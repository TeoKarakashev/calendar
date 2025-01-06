<?php
  session_start();
  if (isset($_SESSION['username'])) {
    header("location: index.php");
   //session_unset();
        //session_destroy();
  }
?>
<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8"/>
  <title>Calendar</title>
  <script defer src="../scripts/utilities.js"></script>
  <script defer src="../scripts/login.js"></script>
</head>
<body>
<nav class="navbar">
    <ul>
      <li><a class="links" href="./register.php">Register</a></li>
      <li><a class="links" href="./login.php">Login</a></li>
    </ul>
  </nav>
  <div id="errors">
    <p class="error-msg"></p>
  </div>
  <form id="login-form">
    <p class="form-title">Login</p>
    <div class="login-form-input">
      <input type="text" placeholder="Username" id="username"/>
    </div>
    <div class="login-form-input">
      <input type="password" placeholder="Password" id="password"/>
    </div>
    <button id="login-btn" type="submit">Login</button>
  </div>
</body>
</html>
