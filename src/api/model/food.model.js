import fs from 'fs';
import path from 'path';
import { validateFoodData } from '../validations/food.validations.js';

const DB_PATH = path.resolve('db/foods.db.json');

export class Food {
    #id;
    #name;
    #calories;
    #carbohydrates;
    #proteins;
    #fats;
    #fiber;

    static #escapeRegex(string) {
        return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    constructor(name, calories, carbohydrates, proteins, fats, fiber, id) {
        const data = { name, calories, carbohydrates, proteins, fats, fiber, id };
        validateFoodData(data);

        this.#name = name;
        this.#calories = calories;
        this.#carbohydrates = carbohydrates;
        this.#proteins = proteins;
        this.#fats = fats;
        this.#fiber = fiber;
        this.#id = id;
    }

    static async #loadFromFile() {
        try {
            const foodsData = await fs.promises.readFile(DB_PATH, 'utf-8');
            const foods = JSON.parse(foodsData) || [];

            return foods;
        } catch (error) {
            console.error('erro ao carregar arquivo:', error);
            return [];
        }
    }

    static #fromJSON(foodData) {
        const food = new Food(
            foodData.name,
            foodData.calories,
            foodData.carbohydrates,
            foodData.proteins,
            foodData.fats,
            foodData.fiber,
            foodData.id
        );

        return food;
    }

    #toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            calories: this.#calories,
            carbohydrates: this.#carbohydrates,
            proteins: this.#proteins,
            fats: this.#fats,
            fiber: this.#fiber,
        };
    }

    
    static async getAllFoods() {
        try {
            const foodsData = await this.#loadFromFile();

            return foodsData.map(foodData => (this.#fromJSON(foodData)));
        } catch (error) {
            throw new Error('erro ao carregar alimentos');
        }
    }

    static async getFoodById(id) {
        try {
            const foods = await this.getAllFoods();
            const food = foods.find(f => f.id === parseInt(id));

            if (!food) {
                throw new Error(`alimento com ID ${id} não encontrado`);
            }

            return food.#toJSON();
        } catch (error) {
            throw new Error(`erro ao buscar alimento por ID: ${error.message}`);
        }
    }

    static async getFoodsByName(name) {
        try {
            const foods = await this.getAllFoods();
            const searchName= name.toLowerCase();
            const regex = new RegExp(`(^|\\s)${this.#escapeRegex(searchName)}`, 'i');

            const results = foods.filter(food => 
                regex.test(food.name.toLowerCase())
            );
    
            if (results.length === 0) {
                throw new Error('nenhum alimento encontrado');
            }
    
            return results;
        } catch (error) {
            throw new Error(`erro ao buscar alimentos: ${error.message}`);
        }
    }

    get id() { return this.#id; }
    get name() { return this.#name; }
    get calories() { return this.#calories; }
    get carbohydrates() { return this.#carbohydrates; }
    get proteins() { return this.#proteins; }
    get fats() { return this.#fats; }
    get fiber() { return this.#fiber; }
}