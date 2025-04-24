import { Router } from 'express';
import { FoodController } from '../controller/food.controller.js';

const food = Router();

food.get('/food', FoodController.getFoods);
food.get('/food/search', FoodController.getFoodsByName)
food.get('/food/:id', FoodController.getFoodById);

export default food;