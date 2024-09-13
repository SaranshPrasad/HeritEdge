const PORT = 5000
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const pool = require('./db');

const app = express();
const SECRET_KEY = 'sadhgduwielbxio2h3e3nshe28';

// Cors Configuration 
app.use(cors({
    origin: 'http://localhost:3000', // url of react app
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body Parser Configuration
app.use(bodyParser.json());

// Sign Up page handler
app.post('/signup', async (req, res) => {
    const { username , address , phone_no , email , password} = req.body;

    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (user.rows.length > 0) {
            return res.status(400).json({ success: false, message: 'User already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            'INSERT INTO users (username , address , phone_no , email , password) VALUES ($1, $2, $3, $4 , $5) RETURNING *',
            [username, address, phone_no , email , hashedPassword]
        );

        const token = jwt.sign({ id: newUser.rows[0].id }, SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({ success: true, message: 'User registered successfully!', token, user:newUser, username:newUser.rows[0].username , user_id:newUser.rows[0].user_id});
    } catch (err) {
        console.error('Database query error', err);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

// User Login Handler 

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required.' });
        }

        
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (user.rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        const existingUser = user.rows[0];

        const isMatch = await bcrypt.compare(password, existingUser.password_hash);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }
        const token = jwt.sign({ id: existingUser.user_id }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ success: true, message: 'Login successful!', user: existingUser, userId: existingUser.user_id, token });
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});


//  Vendor Auth 
app.post('/vendor/signup', async (req, res) => {
    const { name, email, password, address, photo_url , vendor_bio , phone_no} = req.body;

    try {
        const vendor = await pool.query('SELECT * FROM vendor WHERE v_email = $1', [email]);

        if (vendor.rows.length > 0) {
            return res.status(400).json({ success: false, message: 'Vendor already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newVendor = await pool.query(
            'INSERT INTO vendor (v_name, v_email, v_password, v_address , v_photo , v_bio , v_phone_no) VALUES ($1, $2, $3, $4, $5, $6 , $7) RETURNING *',
            [name, email, hashedPassword, address, photo_url , vendor_bio , phone_no]
        );

        const token = jwt.sign({ id: newVendor.rows[0].id }, SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({ success: true, message: 'Vendor registered successfully!', token, vendor: newVendor });
    } catch (err) {
        console.error('Database query error', err);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

// Vendor Login Handler 
app.post('/vendor/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required.' });
        }

        
        const vendor = await pool.query('SELECT * FROM vendor WHERE v_email = $1', [email]);

        if (vendor.rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        const existingVendor = vendor.rows[0];

        const isMatch = await bcrypt.compare(password, existingVendor.v_password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }
        const token = jwt.sign({ id: existingVendor.v_id }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ success: true, message: 'Login successful!', vendor: existingVendor, v_name: existingVendor.v_name, v_id:existingVendor.v_id, token});
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});


app.listen(PORT , (req, res) => {
    console.log(`Server is listening on ${PORT}`);
})
