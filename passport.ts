import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET, // Define this in your .env file
};

passport.use(new JwtStrategy(options, (jwt_payload, done) => {
  // Here, you would find your user based on the JWT payload
  // For example, User.findById(jwt_payload.sub)...
  // If user is found and verified:
  done(null, user);
  // Otherwise:
  done(null, false);
  // You can also add more checks and error handling
}));

export default passport;
