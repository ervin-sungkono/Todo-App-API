import db from '../dbConnect.js';

class Todo{
    constructor(title, due_date, user_id){
        this.title = title;
        this.due_date = due_date;
        this.user_id = user_id;
    }

    create(){
        const d = new Date();
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const createdAt = `${year}-${month}-${day}`;

        const updatedAt = createdAt;

        const sqlQuery = 
            `INSERT INTO todo (id,user_id,title,completed,due_date,created_at,updated_at)
            VALUES(
                NULL,
                ${db.escape(this.user_id)},
                ${db.escape(this.title)},
                DEFAULT,
                ${db.escape(this.due_date)},
                '${createdAt}',
                '${updatedAt}'
                )`;
        return db.execute(sqlQuery);
    }

    static findByUser(user_id){
        const sqlQuery = 
            `SELECT * FROM todo WHERE user_id = ${db.escape(user_id)}`;
        return db.execute(sqlQuery);
    }

    static findById(id){
        const sqlQuery = 
            `SELECT * FROM todo WHERE id = ${db.escape(id)}`;
        return db.execute(sqlQuery);
    }

    static update(id, title, completed, due_date){
        const d = new Date();
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const updatedAt = `${year}-${month}-${day}`;

        const sqlQuery =
            `UPDATE todo
            SET title = ${db.escape(title)},
            completed = ${db.escape(completed)},
            due_date = ${db.escape(due_date)},
            updated_at = '${updatedAt}'
            WHERE id = ${db.escape(id)}`;
        return db.execute(sqlQuery);
    }

    static delete(id){
        const sqlQuery =
            `DELETE FROM todo WHERE id = ${db.escape(id)}`;
        return db.execute(sqlQuery);
    }
}

export default Todo;