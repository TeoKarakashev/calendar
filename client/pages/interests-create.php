<!DOCTYPE html>
<html lang="bg">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Интереси</title>
    <script src="../scripts/utilities.js"></script>
    <script src="../scripts/interests-create.js"></script>
    <script src="../scripts/logout.js"></script>
    <script defer src="../scripts/navbar.js"></script>
    <link rel="stylesheet" href="../styles/interests-create.css">
    <link rel="stylesheet" href="../styles/navbar.css"/>
</head>
<body>
  <?php include '../components/navbar.php'; ?>

    <h1>Създай интерес</h1>

    <div id="interest-name-field">
        <input type="text" id="interest-name" class="interest-name">
        <button class="create-interest-btn" id="create-interest-btn" type="submit"></button>
    </div>
</body>
</html>
