<!DOCTYPE html>
<html lang="bg">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Презентации</title>
    <script src="../scripts/utilities.js"></script>
    <script src="../scripts/presentations-admin.js"></script>
    <script src="../scripts/logout.js"></script>
    <script defer src="../scripts/navbar.js"></script>
    <link rel="stylesheet" href="../styles/presentations-admin.css">
    <link rel="stylesheet" href="../styles/navbar.css"/>
</head>
<body onload="loadPresentations()">
  <?php include '../components/navbar.php'; ?>

    <h1>Презентации</h1>

    <input type="text" id="search-field" class="search-field" placeholder="Търсене">
    <div><button class="button" id="create-button" type="submit">Добави презентация</button></div>

    <div class="card" id="presentations" name="presentations" tabindex="0">
      <div class="details">
        <div id="name"></div>
        <div id="interests"></div>
        <div><button class="button" id="edit-btn" type="submit">Редактирай</button></div>
        <div><button class="button" id="delete-btn" type="submit">Изтрий</button></div>
      </div>
    </div>
</body>
</html>
