import {
  sendAllFieldsRequired,
  sendNoContent,
  sendUnauthorized,
} from './utils/response.js';
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
  if (!username || !password) return sendAllFieldsRequired(res, ENTITY.USER);

  const foundUser = await findUserByName(username);
  if (!foundUser || !foundUser.active) return sendUnauthorized(res);

  const match = await comparePasswords(password, foundUser.password);
  if (!match) return sendUnauthorized(res);

  const accessToken = createAccessToken(
    foundUser.username,
    foundUser.roles,
    process.env.ACCESS_TOKEN_SECRET
  );

  const refreshToken = createRefreshToken(
    foundUser.username,
    process.env.REFRESH_TOKEN_SECRET
  );

  setRefreshTokenCookie(res, refreshToken);

  res.json({ accessToken });
}

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
export async function refresh(req, res) {
  const cookies = req.cookies;
  if (!cookies?.jwt) return sendUnauthorized(res);

  const refreshToken = cookies.jwt;

  verifyRefreshToken(refreshToken, res);
}

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
export function logout(req, res) {
  const cookies = req.cookies;
  if (!cookies?.jwt) return sendNoContent(res);

  clearJWT(res);
  res.json({ message: 'Cookie cleared' });
}
