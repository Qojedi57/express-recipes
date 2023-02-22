import  express  from "express";
import recipeRouter from "./routes/recipes.js";
import passport from "passport";
import setupJWTStrategy from "./auth/index.js";
import authRouter from "./routes/auth.js";

export default function createServer(){
    const app = express();

    app.use(express.json());

    setupJWTStrategy(passport);

    app.use("/auth", authRouter);

    app.use("/recipe",recipeRouter(passport));

    return app;
}