export const QUERY = {
   SELECT_USERS: `
        SELECT u.device_uid, u.score, u.address
        FROM users u
        ORDER BY u.created_at DESC
        LIMIT 50
    `,
    SELECT_USER: 'SELECT * FROM users WHERE id = ?',
    
    CREATE_USER: 'INSERT INTO users(address, device_uid, score, status) VALUES (?, ?, ?, ?);',
    UPDATE_USER: 'UPDATE users SET address_id = ?, device_uid = ?, status = ?, score = ? WHERE id = ?',
    DELETE_USER: 'DELETE FROM users WHERE id = ?',
    INSERT_USERS: `
        INSERT INTO users(address, device_uid, score, status) 
        VALUES 
        (?, ?, ?, ?),
        (?, ?, ?, ?),
        (?, ?, ?, ?),
        (?, ?, ?, ?),
        (?, ?, ?, ?),
        (?, ?, ?, ?),
        (?, ?, ?, ?),
        (?, ?, ?, ?),
        (?, ?, ?, ?),
        (?, ?, ?, ?),
        (?, ?, ?, ?),
        (?, ?, ?, ?),
        (?, ?, ?, ?),
        (?, ?, ?, ?),
        (?, ?, ?, ?),
        (?, ?, ?, ?),
        (?, ?, ?, ?),
        (?, ?, ?, ?),
        (?, ?, ?, ?),
        (?, ?, ?, ?);
    `
};
