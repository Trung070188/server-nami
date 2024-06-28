export const QUERY = {
   SELECT_PATIENTS: `
        SELECT u.device_uid, u.score, a.country 
        FROM users u
        JOIN address a ON u.address_id = a.id
        ORDER BY u.created_at DESC
        LIMIT 50
    `,
    SELECT_PATIENT: 'SELECT * FROM users WHERE id = ?',
    CREATE_PATIENT: 'INSERT INTO users(address, device_uid, score, status) VALUES (?, ?, ?, ?);',
    UPDATE_PATIENT: 'UPDATE users SET address_id = ?, device_uid = ?, status = ?, score = ? WHERE id = ?',
    DELETE_PATIENT: 'DELETE FROM users WHERE id = ?',
    INSERT_PATIENTS: `
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
