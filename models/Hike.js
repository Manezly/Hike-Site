import { Schema, models, model } from 'mongoose';

const HikeSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: [
        {
            type: String,
            required: true
        }
    ],
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    location: {
        area: {
            type: String,
            required: true
        },
        county: {
            type: String,
            required: true
        },
        latitude: {
            type: String,
            required: true
        },
        longitude: {
            type: String,
            required: true
        }
    },
    elevation_gain: {
        type: String,
        required: true
    },
    length: {
        type: String,
        required: true
    },
    average_time: {
        type: String,
        required: true
    },
    trail_type: {
        type: String,
        enum: ['Point-to-Point', 'Circular'],
        required: true
    },
    text_body: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
    isFeatured: {
        type: Boolean,
        default: false
    },
    
}, {
    timestamps: true
});

const Hike = models.Hike || model('Hike', HikeSchema);

export default Hike;