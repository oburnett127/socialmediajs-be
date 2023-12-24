import { Userinfo } from './app/models/userinfo.model.js';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET, // Ensure this is defined in your .env file
};

passport.use(new JwtStrategy(options, (jwt_payload, done) => {
  Userinfo.findByPk(jwt_payload.sub).then((user: Userinfo | null) => {
    if (user) {
      // If user is found:
      done(null, user);
    } else {
      // If no user is found:
      done(null, false);
    }
  }).catch((err: Error) => {
    // Error handling
    done(err, false);
  });
}));

export default passport;
