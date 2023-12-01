import jwt from 'jsonwebtoken';

export const makeTokens = ({ user_id, user_name, user_email }) => {
    const user = { user_id, user_name, user_email };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1hr'});
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'});
    return { accessToken, refreshToken };
}