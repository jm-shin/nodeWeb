import express from 'express';

const userRouter = express.Router();

userRouter.get('/', handleUser);
userRouter.get('/edit', handleEdit);
userRouter.get('/password', handlePassword);

export default userRouter;
