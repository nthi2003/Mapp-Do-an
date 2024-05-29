import tryCatch from './utils/tryCatch.js';
import Pin from '../models/Pin.js'; 

export const createPin = tryCatch(async (req, res) => {
    try {
        const { id: uid, name: uName, photoURL: uPhoto } = req.user;
        const newPin = new Pin({ ...req.body, uid, uName, uPhoto });
        await newPin.save();
        res.status(201).json({ success: true, result: newPin });
    } catch (error) {
        console.error('Error creating pin:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});


export const getPins = tryCatch(async (req, res) => {
    const pins = await Pin.find().sort({ _id: -1 });
    res.status(200).json({ success: true, result: pins });
  });