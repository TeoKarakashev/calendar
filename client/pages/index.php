<?php
  session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Календар</title>
  <script defer src="../scripts/utilities.js"></script>
  <script defer src="../scripts/index.js"></script>
  <script defer src="../scripts/logout.js"></script>
  <link rel="stylesheet" href="../styles/calendar.css"/>
  <link rel="stylesheet" href="../styles/navbar.css"/>
  <link rel="stylesheet" href="../styles/timer.css"/>
  <script defer src="../scripts/navbar.js"></script>
  <script defer src="../scripts/timer.js"></script>
</head>
<body onload="loadSession()">
  <?php include '../components/navbar.php'; ?>

  <div id="content">
  <?php include '../components/timer.php'; ?>
  <?php include '../components/calendar.php'; ?>
  </div>
</body>
<script defer src="../scripts/calendar.js" type="module"></script>
</html>
