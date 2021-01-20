import { key } from '../utils/constants'
const axios = require('axios');



async function validateAuth(req, res, next) {
    let apiKey;
    
    try {
        const authToken = await getTokenFromKey(key);
        if (!authToken || !authToken.auth) {
            return next(new AuthError('AUTH_ERROR'));
        }
        
        const { bearer } = req.headers
        res.locals.token = authToken.token ? authToken.token: null;
        if(!bearer) {
            return next(new AuthError('AUTH_ERROR'));
        }
        if(bearer !== authToken.token) {
            return next(new AuthError('AUTH_ERROR'));
        }
        
    } catch (e) {
        return next(new AuthError('UNKNOWN', e));
    }

    return next();
}




async function getTokenFromKey(keyId) {
    const token = await axios.get()
    try {
        const tokenResponse = await axios.get(
            'http://interview.agileengine.com/auth',
            {
                data: {
                    apiKey: keyId
                }
              
            });
        return tokenResponse
    } catch(e) {
        console.log(e);
    }
    return null;
    
}

module.exports = {
    validateAuth
}