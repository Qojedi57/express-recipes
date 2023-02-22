import express from "express";
import prisma from "../db/index.js";

export default function setupRecipeRouter(passport) {
  const router = express.Router();

 router.get("/", async (request, response) => {

const allRecipes = await prisma.recipe.findMany({
  select: {
    id: true,
    name: true,
    description: true,
  },
});
response.status(200).json({
  success: true,
  allRecipes,
});
});

router.get("/:recipeId", async(request,response) =>{ 
const currentRecipe = await prisma.recipe.findUnique({
  where: {
    id: request.params.recipeId,
  },
})
response.status(200).json({
  success: true,
  currentRecipe,
});
})
  return router;
}
