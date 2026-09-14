const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

app.use(express.json());

const dbconnect = require('./dbconnect.js');
const PersonModel = require('./person_schema.js');

const JWT_SECRETE = process.env.JWT_SECRETE;


// localhost:5000/auth/login
// {
//   "email": "singmey@gmail.com",
//   "password": "abc",
//   "role": "user"
// }

app.post("/login", async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // STEP 1: Find user by email
        const user = await PersonModel.findOne({ email: email });
        if (!user) {
        return res.status(400).send("Invalid email or password");
        }

        // STEP 2: Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(400).send("Invalid email or password");
        }

        // STEP 3: Check role matches
        if (user.role !== role) {
        return res.status(403).send("Invalid role");
        }

        // STEP 4: Sign JWT
        const token = jwt.sign(
        { email: user.email, role: user.role },
        JWT_SECRETE,
        { expiresIn: '24h' }
        );

        return res.json({ token });

    } catch (err) {
        res.status(500).send({ message: err.message || 'Error logging in' });
    }
});

app.listen(5002, () => {
    console.log('Authentication Service Server is running on PORT NO: 5002')
})