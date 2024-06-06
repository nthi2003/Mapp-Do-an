import Pin from '../models/Pin.js';
import tryCatch from './utils/tryCatch.js';


export const createPin = tryCatch(async (req, res) => {
  const { id: uid, name: uName, photoURL: uPhoto } = req.user;
  const newPin = new Pin({ ...req.body, uid, uName, uPhoto });
  await newPin.save();
  res.status(201).json({ success: true, result: newPin });
});

export const getPins = tryCatch(async (req, res) => {
  const pins = await Pin.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: pins });
});

export const deletePin = tryCatch(async (req, res) => {
  const { _id } = await Pin.findByIdAndDelete(req.params.pinId);
  res.status(200).json({ success: true, result: { _id } });
});

export const updatePin = tryCatch(async (req, res) => {
  const updatedPin = await Pin.findByIdAndUpdate(
    req.params.pinId,
    req.body,
    { new: true }
  );
  res.status(200).json({ success: true, result: updatedPin });
});
