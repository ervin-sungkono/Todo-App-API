import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createConnection({
    multipleStatements: true,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) throw err;

    const values = ['user','todo'];

    const createTable = `
        CREATE TABLE IF NOT EXISTS ??(
            user_id CHAR(36) NOT NULL PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            token TEXT NOT NULL,
            created_at DATE
        );
    
        CREATE TABLE IF NOT EXISTS ??(
            id INTEGER AUTO_INCREMENT PRIMARY KEY,
            user_id CHAR(36) NOT NULL,
            title VARCHAR(255) NOT NULL,
            completed TINYINT(1) NOT NULL DEFAULT 0,
            due_date DATE,
            created_at DATE,
            updated_at DATE,
            FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
        );`;
  
    db.query(createTable, values, (err, result) => {
        if (err) throw err;
    });
});

export default db.promise();