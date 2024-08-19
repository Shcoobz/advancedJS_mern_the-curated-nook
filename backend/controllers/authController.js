import { sendAllFieldsRequired, sendNoContent } from './utils/response.js';
import { findUserByName } from './utils/queries/userQueries.js';
import {
  clearJWT,
  comparePasswords,
  createAccessToken,
  createRefreshToken,
  setRefreshTokenCookie,
  verifyRefreshToken,
} from './utils/queries/authQueries.js';

// @desc Login
// @route POST /auth
// @access Public
export async function login(req, res) {
  const { username, password } = req.body;

  // if (!username || !password) {
  //   return res.status(400).json({ message: 'All fields are required' });
  // }
  if (!username || !password) return sendAllFieldsRequired(res, ENTITY.USER);

  // const foundUser = await User.findOne({ username }).exec();
  const foundUser = await findUserByName(username);

  // if (!foundUser || !foundUser.active) {
  //   return res.status(401).json({ message: 'Unauthorized' });
  // }
  if (!foundUser || !foundUser.active) return sendUnauthorized(res);

  // const match = await bcrypt.compare(password, foundUser.password);
  const match = await comparePasswords(password, foundUser.password);

  // if (!match) return res.status(401).json({ message: 'Unauthorized' });
  if (!match) return sendUnauthorized(res);

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

  // const refreshToken = jwt.sign(
  //   { username: foundUser.username },
  //   process.env.REFRESH_TOKEN_SECRET,
  //   { expiresIn: '7d' }
  // );
  const refreshToken = createRefreshToken(
    foundUser.username,
    process.env.REFRESH_TOKEN_SECRET
  );

  // res.cookie('jwt', refreshToken, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: 'None',
  //   maxAge: 7 * 24 * 60 * 60 * 1000,
  // });
  setRefreshTokenCookie(res, refreshToken);

  res.json({ accessToken });
}

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
export async function refresh(req, res) {
  const cookies = req.cookies;

  // if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });
  if (!cookies?.jwt) return sendUnauthorized(res);

  const refreshToken = cookies.jwt;

  // jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
  //   // if (err) return res.status(403).json({ message: 'Forbidden' });
  //   if (err) return sendForbidden(res);

  //   // const foundUser = await User.findOne({ username: decoded.username }).exec();
  //   const foundUser = await findUserByName(decoded.username);

  //   // if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });
  //   if (!foundUser) return sendUnauthorized(res);

  //   // const accessToken = jwt.sign(
  //   //   {
  //   //     UserInfo: {
  //   //       username: foundUser.username,
  //   //       roles: foundUser.roles,
  //   //     },
  //   //   },
  //   //   process.env.ACCESS_TOKEN_SECRET,
  //   //   { expiresIn: '15m' }
  //   // );
  //   const accessToken = createAccessToken(
  //     foundUser.username,
  //     foundUser.roles,
  //     process.env.ACCESS_TOKEN_SECRET
  //   );

  //   res.json({ accessToken });
  // });

  verifyRefreshToken(refreshToken, res);
}

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
export function logout(req, res) {
  const cookies = req.cookies;

  if (!cookies?.jwt) return sendNoContent(res);

  // res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  clearJWT(res);
  res.json({ message: 'Cookie cleared' });
}
