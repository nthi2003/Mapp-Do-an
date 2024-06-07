import Pin from '../../../models/Pin.js';


const checkOwner = async (req) => {
  try {
    const pin = await Pin.findOne({
      _id: req.params.pinId,
      uid: req.user.id,
    });
    if (pin) return true;
    return false;
  } catch (error) {
    console.log(error);
    return 'error';
  }
};

export default checkOwner;