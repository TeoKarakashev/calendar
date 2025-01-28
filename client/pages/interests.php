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
  <script defer src="../scripts/navbar.js"></script>
  <link rel="stylesheet" href="../styles/navbar.css"/>
  <link rel="stylesheet" href="../styles/interests.css">
</head>
<body onload="loadInterests()">
<?php include '../components/navbar.php'; ?>
  
  <h1>Интереси</h1>

  <input type="text" id="search-field" class="search-field" placeholder="Search">

  <div id="interest-container">
    <div class="inner-container">
      <div id="interest"></div>
      <div><button class="update-btn" id="update-btn" type="submit"></button></div>
    </div>
  </div>
  <!-- <button id="update-btn" type="submit">Update</button> -->
  <script src="../scripts/interests.js"></script>
</body>
</html>
