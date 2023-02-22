import { Strategy, ExtractJwt } from "passport-jwt";

export default function setupJWTStrategy(passport) {
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "thisIsASecretKey",
      },
      function (payload, done) {
        try {
          return done(null, { username: payload, id: payload.id });
        } catch (e) {
          return done(e, null);
        }
      }
    )
  );
}