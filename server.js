import  express  from "express";
import recipeRouter from "./routes/recipes.js";

export default function createServer(){
    const app = express();

    app.use(express.json());

    app.use("/recipe",recipeRouter);

    return app;
}