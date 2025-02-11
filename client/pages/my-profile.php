<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Профил</title>
  <script src="../scripts/utilities.js"></script>
  <script src="../scripts/index.js"></script>
  <script src="../scripts/logout.js"></script>
  <script src="../scripts/my-profile.js"></script>
  <script defer src="../scripts/navbar.js"></script>
  <link rel="stylesheet" href="../styles/navbar.css"/>
  <link rel="stylesheet" href="../styles/my-profile.css"/>
</head>
<body onload="loadSessionMyProfile()">
    <?php include '../components/navbar.php'; ?>

    <div id="content">
      <div id="profile">
        <div id="profile-info">
          <p id="name"></p>
          <p id="username"></p>
          <p id="interests"></p>
          <p id="presentation"></p>
        </div>
      </div>
</body>
</html>
