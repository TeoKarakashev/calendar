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
  <title>Календар за Презентации</title>
  <script defer src="../scripts/utilities.js"></script>
  <script defer src="../scripts/register.js"></script>
  <script defer src="../scripts/navbar.js"></script>
  <script defer src="../scripts/createAdmin.js"></script>
  <link rel="stylesheet" href="../styles/navbar.css"/>
  <link rel="stylesheet" href="../styles/register.css"/>
</head>
<body onLoad = 'createAdmin()'>
  <?php include '../components/navbar.php'; ?>

  <form id="register-form">
  <p class="form-title">Регистрирай се</p>
  <div class="form-input">
    <input type="text" placeholder="Име" id="first-name" />
    <p class="error-message" id="first-name-error">Името е задължително поле.</p>
  </div>
  <div class="form-input">
    <input type="text" placeholder="Фамилия" id="last-name" />
    <p class="error-message" id="last-name-error">Фамилията е задължително поле.</p>
  </div>
  <div class="form-input">
    <input type="text" placeholder="Потребителско име" id="username" />
    <p class="error-message" id="username-error">Потребителското име е задължително поле.</p>
  </div>
  <div class="form-input">
    <input type="password" placeholder="Парола" id="password" />
    <p class="error-message" id="password-error">Паролата е задължително поле.</p>
  </div>
  <div class="form-input">
    <input type="password" placeholder="Повтори парола" id="repeat-password" />
    <p class="error-message" id="repeat-password-error">Паролите трябва да съвпадат.</p>
  </div>
  <button id="register-button" type="submit">Регистрирай се</button>
</form>

</body>
</html>
