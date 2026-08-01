const pool = require('../db/index.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginUser = async (req, res, next) => {
    if(!req.body.email){
        const err = new Error("Email Required")
        err.status = 400
        return next(err)
    }
    if(!req.body.password){
        const err = new Error("Password Required")
        err.status = 400
        return next(err)
    }
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [req.body.email])
        if(!result.rows[0]){
            const err = new Error("Invalid Email or Password")
            err.status = 401
            return next(err)
        }
        const password_check = await bcrypt.compare(req.body.password, result.rows[0].password_hash)
        if(!password_check){
            const err = new Error("Invalid Email or Password")
            err.status = 401
            return next(err)
        }
        const token = jwt.sign(
            {
                id: result.rows[0].id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        )
        return res.json({token})

    } catch (error) {
        return next(error)
    }
}

const registerUser = async (req, res, next) =>{
let password_hash;
    if(!req.body.email){
        const err = new Error("Email Required")
        err.status = 400
        return next(err)
    }
    try {
        const email = req.body.email
        const existing = await pool.query('SELECT id FROM users WHERE users.email = $1', [email])
        if(existing.rows.length >0){
            const err = new Error("Email Already Registered")
            err.status = 409
            return next(err)
        }
    } catch (error) {
        return next(error)
    }
    if(!req.body.password){
        const err = new Error("Password Required")
        err.status = 400
        return next(err)
    } else {
        password_hash = await bcrypt.hash(req.body.password, 10)
    }
    try {
        const result = await pool.query('INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email', [req.body.email, password_hash])
        return res.status(201).json(result.rows[0])
    } catch (error) {
        next(error)
    }
}

module.exports = {registerUser, loginUser}