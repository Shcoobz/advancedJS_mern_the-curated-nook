import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendForbidden, sendUnauthorized } from '../response.js';
import { findUserByName } from './userQueries.js';

export async function comparePasswords(password, savedPassword) {
  return await bcrypt.compare(password, savedPassword);
}

export function createAccessToken(username, roles, secret) {
  return jwt.sign(
    {
      UserInfo: {
        username: username,
        roles: roles,
      },
    },
    secret,
    { expiresIn: '60s' }
  );
}

export function createRefreshToken(username, secret) {
  return jwt.sign({ username: username }, secret, { expiresIn: '7d' });
}

export function setRefreshTokenCookie(res, refreshToken) {
  const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: sevenDaysInMilliseconds,
  });
}

export async function verifyRefreshToken(refreshToken, res) {
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    // if (err) return res.status(403).json({ message: 'Forbidden' });
    if (err) return sendForbidden(res);

    // const foundUser = await User.findOne({ username: decoded.username }).exec();
    const foundUser = await findUserByName(decoded.username);

    // if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });
    if (!foundUser) return sendUnauthorized(res);

    // const accessToken = jwt.sign(
    //   {
    //     UserInfo: {
    //       username: foundUser.username,
    //       roles: foundUser.roles,
    //     },
    //   },
    //   process.env.ACCESS_TOKEN_SECRET,
    //   { expiresIn: '15m' }
    // );
    const accessToken = createAccessToken(
      foundUser.username,
      foundUser.roles,
      process.env.ACCESS_TOKEN_SECRET
    );

    return res.json({ accessToken });
  });
}

export function clearJWT(res) {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });
}
