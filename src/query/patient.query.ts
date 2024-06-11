export const QUERY = {
    SELECT_PATIENTS: 'SELECT * FROM users ORDER BY created_at DESC LIMIT 50',
    SELECT_PATIENT: 'SELECT * FROM users WHERE id = ?',
    CREATE_PATIENT: 'INSERT INTO users(first_name, last_name, email, address, diagnosis, phone, status, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
    UPDATE_PATIENT: 'UPDATE users SET first_name = ?, last_name = ?, email = ?, address = ?, diagnosis = ?, phone = ?, status = ?, image_url = ? WHERE id = ?',
    DELETE_PATIENT: 'DELETE FROM users WHERE id = ?'
};
