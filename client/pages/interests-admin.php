<!DOCTYPE html>
<html lang="bg">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Интереси</title>
    <script src="../scripts/utilities.js"></script>
    <script src="../scripts/interests-admin.js"></script>
    <script src="../scripts/logout.js"></script>
    <script defer src="../scripts/navbar.js"></script>
    <link rel="stylesheet" href="../styles/interests-admin.css">
    <link rel="stylesheet" href="../styles/navbar.css"/>
</head>
<body onload="loadInterests()">
  <?php include '../components/navbar.php'; ?>

    <h1>Интереси</h1>

    <input type="text" id="search-field" class="search-field" placeholder="Търсене">
    <div><button class="button" id="create-button" type="submit">Добави интерес</button></div>

    <div id="interest-container">
        <div class="inner-container">
            <div id="interest"></div>
            <div><button class="button" id="edit-btn" type="submit">Редактирай</button></div>
            <div><button class="button" id="delete-btn" type="submit">Изтрий</button></div>
        </div>
    </div>
  
  <script src="../scripts/interests-admin.js"></script>
</body>
</html>
