CREATE TABLE users (
  username VARCHAR(255) UNIQUE NOT NULL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL 
);

CREATE TABLE interests (
    name VARCHAR(255) UNIQUE NOT NULL PRIMARY KEY
);

CREATE TABLE user_interests (
    username VARCHAR(255) NOT NULL,
    interest VARCHAR(255) NOT NULL,
    PRIMARY KEY (username, interest),
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE,
    FOREIGN KEY (interest) REFERENCES interests(name) ON DELETE CASCADE
);

CREATE TABLE presentations (
  title VARCHAR(255) NOT NULL PRIMARY KEY,
  is_taken BOOLEAN NOT NULL DEFAULT FALSE,
  username VARCHAR(255) UNIQUE DEFAULT NULL, 
  FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
);

CREATE TABLE presentation_interests (
  title VARCHAR(255) NOT NULL,
  interest VARCHAR(255) NOT NULL,
  PRIMARY KEY (title, interest),
  FOREIGN KEY (title) REFERENCES presentations(title) ON DELETE CASCADE,
  FOREIGN KEY (interest) REFERENCES interests(name) ON DELETE CASCADE
);

INSERT INTO interests (name)
  VALUES 
    ('Frontend'),
    ('Backend'),
    ('Fullstack'),
    ('Дизайн'),
    ('UX/UI'),
    ('Мобилни приложения'),
    ('Web'),
    ('Game'),
    ('Данни'),
    ('AI'),
    ('Machine Learning'),
    ('Blockchain'),
    ('Киберсигурност'),
    ('Cloud Computing'),
    ('DevOps'),
    ('IoT'),
    ('Big Data'),
    ('AR/VR'),
    ('Роботика'),
    ('Quantum Computing'),
    ('5G'),
    ('Wireless');

INSERT INTO presentations (title)
  VALUES 
    ('React.js'),
    ('Web Crypto API'),
    ('Node.js'),
    ('Express.js'),
    ('Алгоритми за машинно обучение'),
    ('Въведение в биткойн'),
    ('Микро услуги'),
    ('AWS'),
    ('Нови открития в квантовите изчисления'),
    ('Създаване на скалируеми бекенд системи'),
    ('Напреднали техники с CSS'),
    ('Мобилни приложения с Flutter'),
    ('Въведение в дизайна на игри'),
    ('Наука за данни с Python'),
    ('AI за чатботове'),
    ('Смарт контракти на блокчейн'),
    ('Най-добри практики за киберсигурност'),
    ('Въведение в DevOps процесите'),
    ('IoT в интелигентните домове'),
    ('Анализ на големи данни'),
    ('AR/VR в образованието'),
    ('Създаване на автономни роботи'),
    ('5G мрежи и приложения'),
    ('Безжични комуникационни системи');

INSERT INTO presentation_interests (title, interest)
  VALUES 
    ('React.js', 'Frontend'), ('React.js', 'Дизайн'), ('React.js', 'UX/UI'),
    ('Web Crypto API', 'Frontend'), ('Web Crypto API', 'Backend'), ('Web Crypto API', 'Киберсигурност'),
    ('Node.js', 'Backend'), ('Node.js', 'Web'), ('Node.js', 'Cloud Computing'),
    ('Express.js', 'Backend'), ('Express.js', 'Web'), ('Express.js', 'Cloud Computing'),
    ('Алгоритми за машинно обучение', 'Machine Learning'), ('Алгоритми за машинно обучение', 'Данни'),
    ('Алгоритми за машинно обучение', 'AI'), ('Въведение в биткойн', 'Blockchain'),
    ('Въведение в биткойн', 'Киберсигурност'), ('Микро услуги', 'DevOps'), 
    ('Микро услуги', 'Cloud Computing'), ('Микро услуги', 'Backend'), ('AWS', 'Cloud Computing'), 
    ('AWS', 'DevOps'), ('AWS', 'Backend'), ('Нови открития в квантовите изчисления', 'Quantum Computing'), 
    ('Нови открития в квантовите изчисления', 'AI'), 
    ('Нови открития в квантовите изчисления', 'Machine Learning'),
    ('Създаване на скалируеми бекенд системи', 'Backend'), ('Създаване на скалируеми бекенд системи', 'Cloud Computing'),
    ('Напреднали техники с CSS', 'Frontend'), ('Напреднали техники с CSS', 'Дизайн'), ('Напреднали техники с CSS', 'UX/UI'),
    ('Мобилни приложения с Flutter', 'Мобилни приложения'), ('Мобилни приложения с Flutter', 'Дизайн'),
    ('Въведение в дизайна на игри', 'Game'), ('Въведение в дизайна на игри', 'Дизайн'),
    ('Наука за данни с Python', 'Данни'), ('Наука за данни с Python', 'AI'),
    ('Наука за данни с Python', 'Machine Learning'), ('AI за чатботове', 'AI'),
    ('AI за чатботове', 'Machine Learning'), ('AI за чатботове', 'Данни'),
    ('Смарт контракти на блокчейн', 'Blockchain'), ('Смарт контракти на блокчейн', 'Киберсигурност'),
    ('Най-добри практики за киберсигурност', 'Киберсигурност'), ('Най-добри практики за киберсигурност', 'Cloud Computing'),
    ('Въведение в DevOps процесите', 'DevOps'), ('Въведение в DevOps процесите', 'Cloud Computing'),
    ('IoT в интелигентните домове', 'IoT'), ('IoT в интелигентните домове', 'Wireless'),
    ('Анализ на големи данни', 'Big Data'), ('Анализ на големи данни', 'Данни'),
    ('AR/VR в образованието', 'AR/VR'), ('AR/VR в образованието', 'Дизайн'),
    ('Създаване на автономни роботи', 'Роботика'), ('Създаване на автономни роботи', 'AI'),
    ('5G мрежи и приложения', '5G'), ('5G мрежи и приложения', 'Wireless'),
    ('Безжични комуникационни системи', 'Wireless'), ('Безжични комуникационни системи', '5G');

CREATE TABLE presentation_events (
	id INT AUTO_INCREMENT PRIMARY KEY,
	presentation_title VARCHAR(255) NOT NULL,
	presenter VARCHAR(255) NOT NULL,
	date DATETIME NOT NULL
);