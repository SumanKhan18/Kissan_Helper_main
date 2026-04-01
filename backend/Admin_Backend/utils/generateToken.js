import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not configured');
  return jwt.sign({ id }, secret, { expiresIn: process.env.JWT_EXPIRES || '7d' });
};

export default generateToken;
