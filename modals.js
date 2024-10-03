import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Guest name is mandatory
        trim: true
    },
    designation: {
        type: String,
        required: true, // Designation is mandatory
        trim: true
    },
    email: {
        type: String,
        required: true, // Email is mandatory
        unique: true, // Email should be unique for each guest
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'] // Email validation
    },
    roomNumber: {
        type: String,
        required: true // Room number is mandatory
    },
    roomPhoto: {
        type: String,
        default: 'default-room-photo.jpg' // Default room photo if none provided
    },
    roomAddress: {
        type: String,
        required: true // Room address is mandatory
    },
    stayDuration: {
        type: Number,
        required: true, // Duration of stay is mandatory
        min: [1, 'Stay duration must be at least 1 day'] // Minimum stay duration is 1 day
    },
    candidate: {
        name: {
            type: String,
            required: true, // Candidate name is mandatory
            trim: true
        },
        study: {
            type: String,
            required: true, // Candidate study details are mandatory
            trim: true
        },
        address: {
            type: String,
            required: true, // Candidate address is mandatory
            trim: true
        },
        contactNumber: {
            type: String,
            required: true, // Candidate contact number is mandatory
            match: [/^\d{10}$/, 'Invalid contact number format'] // Basic contact number validation
        },
        photo: {
            type: String,
            default: 'default-candidate-photo.jpg' // Default candidate photo if none provided
        }
    }
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

export const Guest = mongoose.model('Guest', guestSchema);
