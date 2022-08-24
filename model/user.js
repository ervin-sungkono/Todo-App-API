import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import db from '../dbConnect.js';

class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    create() {
        const d = new Date();
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const createdAt = `${year}-${month}-${day}`;

        const user_id = uuidv4();

        const token = jwt.sign(
            {user_id: user_id, username: this.username, email: this.email},
            process.env.JWT_SECRET,
            {
                expiresIn: "3h",
            }
        );

        const sqlQuery = 
            `INSERT INTO user (user_id,username,password,email,token,created_at)
            VALUES(
                '${user_id}',
                ${db.escape(this.username)},
                ${db.escape(this.password)},
                ${db.escape(this.email)},
                '${token}',
                '${createdAt}'
                )`;
        return db.execute(sqlQuery);
    }

    static findUser(username) {
        const sqlQuery = 
            `SELECT * FROM user WHERE username = ${db.escape(username)}`;
        return db.execute(sqlQuery);
    }

    static updateToken(user_id, username, email){
        const token = jwt.sign(
            { user_id: user_id, username: username, email: email },
            process.env.JWT_SECRET,
            {
              expiresIn: "3h",
            }
        );

        const sqlQuery =
        `UPDATE user
        SET token = '${token}'
        WHERE username = ${db.escape(username)}`;

        db.execute(sqlQuery);
        return token;
    }
}

export default User;