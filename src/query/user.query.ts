export const QUERY = {
   SELECT_USERS: `
        SELECT u.device_uid, u.score, u.address
        FROM users u
        ORDER BY u.created_at DESC
        LIMIT 50
    `,
    SELECT_USER: 'SELECT * FROM users WHERE id = ?',
    
    CREATE_USER: 'INSERT INTO users(address, device_uid, score, status, created_at) VALUES (?, ?, ?, ?);',
    UPDATE_USER: 'UPDATE users SET address = ?, device_uid = ?, status = ?, score = ? WHERE id = ?',
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
    `,
    GET_RANK_USER: ` WITH ranked_users AS (
      SELECT 
        u.id,
        u.device_uid,
        u.score,
        u.address,
        RANK() OVER (PARTITION BY u.address ORDER BY u.score DESC, u.created_at ASC) AS rank,
        RANK() OVER (ORDER BY u.score DESC, u.created_at ASC) AS overall_rank
      FROM users u
    )
    SELECT *
    FROM ranked_users
    WHERE id = ?;
  `,
  GET_RANK_ADDRESS_USER: `
    WITH ranked_users AS (
    SELECT 
        u.id,
        u.device_uid,
        u.score,
        u.address,
        ROW_NUMBER() OVER (PARTITION BY u.address ORDER BY u.score DESC, u.created_at ASC) AS rank
    FROM users u
    WHERE u.address = ?
    )
    SELECT *
    FROM ranked_users
    WHERE rank <= 50
    ORDER BY rank;
  `,
  GET_RANK_ALL: `
  WITH ranked_users AS (
      SELECT 
        u.id,
        u.device_uid,
        u.score,
        u.address,
        RANK() OVER (ORDER BY u.score DESC, u.created_at ASC) AS overall_rank
      FROM users u
    )
    SELECT *
    FROM ranked_users
    ORDER BY overall_rank
    LIMIT 50;
  `,
  RANK_ADDRESS: `
    SELECT 
      u.address, 
      AVG(u.score) AS average_score
  FROM users u
  GROUP BY u.address
  ORDER BY average_score DESC
  LIMIT 100;
  `
  
};
