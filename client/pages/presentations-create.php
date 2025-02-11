<!DOCTYPE html>
<html lang="bg">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Презентации</title>
    <script src="../scripts/utilities.js"></script>
    <script src="../scripts/presentations-create.js"></script>
    <script src="../scripts/logout.js"></script>
    <script defer src="../scripts/navbar.js"></script>
    <link rel="stylesheet" href="../styles/presentations-create.css">
    <link rel="stylesheet" href="../styles/navbar.css"/>
</head>
<body>
  <?php include '../components/navbar.php'; ?>

    <h1>Добави презентация</h1>

    <div id="presentation-title-field">
        <input type="text" id="presentation-title" class="presentation-title">
        <button class="create-presentation-btn" id="create-presentation-btn" type="submit"></button>
    </div>
</body>
</html>
