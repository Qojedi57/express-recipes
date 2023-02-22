import express from "express";
import prisma from "../db/index.js";

export default function setupRecipeRouter(passport) {
  const router = express.Router();

  router.get("/user",  passport.authenticate("jwt", { session: false }),async function (request, response){
    const allRecipes = await prisma.recipe.findMany({
      where: {
        userId: 1,
      },
      include: {
        user: true,
      },
    });

    response.status(200).json({
      success: true,
      recipes: allRecipes,
    });
  });
  router.post("/", async function (request, response) {
    const newRecipe = await prisma.recipe.create({
      data: {
        name: request.body.name,
        description: request.body.description,
        userId: 1,
      },
    });

    console.log(newRecipe);

    response.status(201).json({
      success: true,
    });
  });

  router.get("/:recipeId", async function (request, response) {
    const recipeId = parseInt(request.params.recipeId);

    const currentrecipe = await prisma.recipe.findFirst({
      where: {
        id: recipeId,
      },
    });

    response.status(200).json({
      success: true,
      recipe: currentrecipe,
    });
  });

  router.delete("/:recipeId", async function (request, response) {
    const recipeId = parseInt(request.params.recipeId);
    try {
      await prisma.recipe.delete({
        where: {
          id: recipeId,
        },
      });

      response.status(200).json({
        success: true,
      });
    } catch (e) {
      console.log(e);
      if (e.code == "P2025") {
        response.status(404).json({
          success: false,
        });
      } else {
        response.status(500).json({
          success: false,
        });
      }
    }
  });

  router.put("/:recipeId", async function (request, response) {
    const recipeId = parseInt(request.params.recipeId);
    try {
      await prisma.recipe.update({
        where: {
          id: recipeId,
        },
        data: {
          ...request.body,
        },
      });

      response.status(200).json({
        success: true,
      });
    } catch (e) {
      console.log(e);
      if (e.code == "P2025") {
        response.status(404).json({
          success: false,
        });
      } else {
        response.status(500).json({
          success: false,
        });
      }
    }
  });

  return router;
}
