import express from "express";
import jwt, { verify } from "jsonwebtoken";
import argon2 from "argon2";
import prisma from "../db/index.js";

const router = express.Router();

// /auth/signup
router.post("/signup", async (request, response) => {
  const user = await prisma.user.findFirst({
    where: {
      username: request.body.username,
    },
  });

  if (user) {
    response.status(401).json({
      success: false,
      message: "User already exists",
    });
  } else {
    const hashedPassword = await argon2.hash(request.body.password);

    const newUser = await prisma.user.create({
      data: {
        username: request.body.username,
        password: hashedPassword,
      },
    });

    if (newUser) {
      response.status(201).json({
        success: true,
        message: "User successfully created",
      });
    } else {
      response.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }
});
// /auth/login
router.post("/login", async (request, response) => {
    try{
        const user = await prisma.user.findFirstOrThrow({
            where: {
                username: request.body.username
            }
        });

        const verifiedPassword = await argon2.verify(user.
            password,request.body.password);

            if(verifiedPassword){
                const token = jwt.sign({user:user.username, id:
                user.id}, "thisIsASecretKey");

                    response.status(200).json({
                        success:true,
                        token
                    });
                } else{
                    response.status(401).json({
                        success: false,
                        message: "Incorrect Username and/or password"
            });
        }
    } catch (e) {
            response.status(401).json({
                success: false,
                message: "Incorrect Username and/or password"
    });
}
});

export default router;


