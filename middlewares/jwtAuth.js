import JsonWebToken from 'jsonwebtoken'
import dotenv from 'dotenv'

const env = dotenv.config().parsed

const jwtAuth = () => {
    return async (req, res, next) => {
        try {
            if(!req.headers.authorization) throw { code: 401, message: 'UNAUTHORIZED' }

            const token = req.headers.authorization.split(' ')[1] // Bearer <token>
            const verify = JsonWebToken.verify(token, env.JWT_SECRET)
            req.jwt = verify // sekarang kita punya req.jwt dari data user login

            next() // Continue to next another middleware/controller
        } catch (error) {
            const errorJWT = ['jwt expired', 'invalid signature', 'jwt malformed', 'jwt must be provided', 'invalid token']

            if(error.message === 'jwt expired') {
                error.message = 'ACCESS_TOKEN_EXPIRED'
            } else if (errorJWT.includes(error.message)) {
                error.message = 'INVALID_ACCESS_TOKEN'
            }
            return res.status(error.code || 500).json({
                status: false,
                message: error.message
            })
        }
    }
}

export default jwtAuth