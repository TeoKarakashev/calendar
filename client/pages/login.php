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
  <title>Календар</title>
  <script defer src="../scripts/utilities.js"></script>
  <script defer src="../scripts/login.js"></script>
  <link rel="stylesheet" href="../styles/navbar.css"/>
  <link rel="stylesheet" href="../styles/login.css"/>
  <script defer src="../scripts/createAdmin.js"></script>
  <script defer src="../scripts/navbar.js"></script>
</head>
<body onLoad = 'createAdmin()'>
  <?php include '../components/navbar.php'; ?>

  <form id="login-form">
    <p class="form-title">Вход</p>
    <div class="login-form-input">
      <input type="text" placeholder="Потребителско име" id="username"/>
      <p class="error-message" id="username-error">Потребителското име е задължително поле.</p>
    </div>
    <div class="login-form-input">
      <input type="password" placeholder="Парола" id="password"/>
      <p class="error-message" id="password-error">Паролата е задължително поле.</p>
    </div>
    <button id="login-btn" type="submit">Вход</button>
  </form>
</body>
</html>
