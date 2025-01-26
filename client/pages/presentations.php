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

    <!-- Recommended Presentations Dropdown -->
    <label for="recommended">Tеми за презентации</label>
    <select id="presentations" name="presentations">
    </select>
    <button id="update-btn" type="submit">Update</button>
    <p id="current">Текуща избрана презентация: </p>
</body>
</html>
