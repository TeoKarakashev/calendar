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
</head>
<body onload="loadInterests()">
<?php include '../components/navbar.php'; ?>
  
  <div id="content">
  <form id="interests-form"></form>
  <button id="update-btn" type="submit">Update</button>
  </div>

  <script src="../scripts/interests.js"></script>
</body>
</html>
