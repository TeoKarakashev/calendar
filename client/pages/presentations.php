<!DOCTYPE html>
<html lang="bg">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Презентации</title>
    <script src="../scripts/utilities.js"></script>
    <script src="../scripts/presentations.js"></script>
    <script src="../scripts/logout.js"></script>
    <script defer src="../scripts/navbar.js"></script>
    <link rel="stylesheet" href="../styles/presentations.css">
    <link rel="stylesheet" href="../styles/navbar.css"/>
</head>
<body onload="loadPresentations()">
  <?php include '../components/navbar.php'; ?>

    <h1>Презентации</h1>

    <label for="all">Tеми за презентации</label>
    <p id="current">Текуща избрана презентация: </p>

    <input type="text" id="search-field" class="search-field" placeholder="Search">

    <div class="card" id="presentations" name="presentations" tabindex="0">
      <div class="details">
        <div id="name">Name: </div>
        <div id="interests"></div>
        <div id="presenter">Presenter: </div>
        <div>Date: </div>
        <div><button class="assign-button" id="update-btn" type="submit">Assign</button></div>
      </div>
    </div>
</body>
</html>
