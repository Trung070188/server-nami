export const QUERY = {
    CREATE_ADDRESS: 'INSERT INTO address(country) VALUES (?);',
    DELETE_ADDRESS: 'DELETE FROM users WHERE id = ?',
    GET_COUNT_ADDRESS: 'SELECT COUNT(*) AS count From address WHERE country = ?'
};
