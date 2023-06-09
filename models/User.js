import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
        require: true
    },
    createdAt: {
        type: Number,
    },
    updatedAt: {
        type: Number,
    }
},
{
    timestamps: {
        currentTime: () => Math.floor(Date.now() / 1000)
    }
})

export default mongoose.model('User', Schema)
