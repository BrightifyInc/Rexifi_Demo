import express from 'express'
import { connectToDatabase } from '../lib/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/register', async (req, res) => {
    const {username, email, password} = req.body;

    try {
        const db = await connectToDatabase()
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email])
        if(rows.length > 0) {
            return res.status(409).json({message : "User already exist"})
        }

        const hashPassword = await bcrypt.hash(password, 10)
        await db.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, hashPassword]
        )

        res.status(201).json({message: "User created successfully"})
    } catch (error) {
        res.status(500).json(error.message)
    }
    // console.log(username)
})


router.post('/login', async (req, res) => {
    const { email, password} = req.body;

    try {
        const db = await connectToDatabase()
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email])
        if(rows.length === 0) {
            return res.status(404).json({message : "User not exist"})
        }

        const isMatch = await bcrypt.compare(password, rows[0].password)
        if(!isMatch) {
            return res.status(401).json({message : "Incorrect password"})
        }

        const token = jwt.sign({id: rows[0].id}, process.env.JWT_KEY, {expiresIn: '3h'})

        res.status(201).json({token: token})
    } catch (error) {
        res.status(500).json(error.message)
    }
})


const verifyToken = async (req, res, next) => {
    try {
        const token =req.headers['authorization'].split(' ')[1];
        if(!token) {
            return res.status(403).json({message : "No Token Provided."})
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.userId = decoded.id;
        next()
    } catch (err) {
        return res.status(500).json({message : "Server error!"})
    }
}


router.get('/', verifyToken, async (req, res) => {
    try {
        const db = await connectToDatabase()
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.userId])
        if(rows.length === 0) {
            return res.status(404).json({message : "User not exist"})
        }

        return res.status(201).json({user: rows[0]})
    } catch (err) {
        return res.status(500).json({message : "Server Error"})
    }
})


// Add this to your auth routes
router.get('/user', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const db = await connectToDatabase();
    
    const [rows] = await db.query(
      'SELECT id, username, email, FROM users WHERE id = ?', 
      [decoded.userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user: rows[0] });
  } catch (error) {
    console.error('User fetch error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});


export default router