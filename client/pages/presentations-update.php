<!DOCTYPE html>
<html lang="bg">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Презентации</title>
    <script src="../scripts/utilities.js"></script>
    <script src="../scripts/presentations-update.js"></script>
    <script src="../scripts/logout.js"></script>
    <script defer src="../scripts/navbar.js"></script>
    <link rel="stylesheet" href="../styles/presentations-update.css">
    <link rel="stylesheet" href="../styles/navbar.css"/>
</head>
<body onload="loadInterests()">
  <?php include '../components/navbar.php'; ?>

    <h1>Редактирай презентация</h1>

    <div id="presentation-title-field">
        <input type="text" id="presentation-title" class="presentation-title">
        <button class="update-title-btn" id="update-title-btn" type="submit"></button>
    </div>

    <div id="interest-container">
        <div class="inner-container">
            <div id="interest"></div>
            <div><button class="update-btn" id="update-btn" type="submit"></button></div>
        </div>
    </div>
</body>
</html>
