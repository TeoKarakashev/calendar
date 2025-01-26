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
  <link rel="stylesheet" href="../styles/navbar.css"/>
  <link rel="stylesheet" href="../styles/login.css"/>
  <script defer src="../scripts/navbar.js"></script>
</head>
<body>
  <?php include '../components/navbar.php'; ?>
  
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
      <p class="error-message" id="password-error"></p>
    </div>
    <button id="login-btn" type="submit">Login</button>
  </form>
</body>
</html>
