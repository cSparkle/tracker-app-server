const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tracking-app',
    password: 'apollo',
    port: 5432
});


const getUsers = (req, res) => {
    pool.query('SELECT * FROM public."Users" ORDER BY id ASC', (err, result) => {
        if (err) {
            throw new Error(err);
        }

        res.status(200).json(result.rows)
    })
}

const getUserById = (req, res) => {
    const id = req.params.id;

    pool.query('SELECT * FROM public."Users" WHERE id = $1', [id], (err, result) => {
        if (err) {
            throw new Error(err);
        }

        res.status(200).json(result.rows)
    })
}

const createUser = (req, res) => {
    const { email, password } = req.body;

    pool.query('INSERT INTO public."Users" (email, password) VALUES ($1, $2) RETURNING *', [email, password], (err, result) => {
        if (err) {
            throw new Error(err);
        }

        res.status(201).send(`User added with ID: ${result.rows[0].id}`)
    })
}

const updateUser = (req, res) => {
    const id = req.params.id;
    const { email, password } = req.body;

    pool.query('UPDATE public."Users" SET email = $1, password = $2 WHERE id = $3', [email, password, id], (err, result) => {
        if (err) {
            throw new Error(err);
        }

        res.status(200).send(`User modified with ID: ${id}`);
    })
}

const deleteUser = (req, res) => {
    const id = req.params.id;

    pool.query('DELETE FROM public."Users" WHERE id = $1', [id], (err, result) => {
        if (err) {
            throw new Error(err);
        }

        res.status(200).send(`User deleted with ID: ${id}`);
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}