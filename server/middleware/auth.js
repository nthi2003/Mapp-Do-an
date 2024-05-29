import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const { id, name, photoURL } = decodedToken;
      req.user = { id, name, photoURL };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: 'Something is wrong with your authorization!',
    });
  }
};

export default auth;
