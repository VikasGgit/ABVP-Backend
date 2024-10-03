import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import bodyParser from "body-parser"
import {Guest} from "./modals.js"
import cors from "cors"

dotenv.config(); // Load environment variables

const app = express();
app.use(cors())
// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests

// MongoDB Connection
mongoose.connect(process.env.mongoUrl, {
    
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) =>{
    return res.send("Hello World!");
});

app.post('/api/add-guest', async (req, res) => {
    // Convert the email in req.body to lowercase
    if (req.body.email) {
        req.body.email = req.body.email.toLowerCase();
    }

    const newGuest = new Guest(req.body);
    
    try {
        const savedGuest = await newGuest.save();
        res.status(201).json(savedGuest); // Respond with the created guest data
    } catch (error) {
        res.status(400).json({ message: 'Error saving guest', error });
    }
});


app.post('/api/guest-details', async (req, res) => {
    const { email } = req.body;
    try {
        const guest = await Guest.findOne({ email });
        if (guest) {
            res.json(guest);
        } else {
            res.status(404).json({ message: 'Guest not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
