import { Food } from '../model/food.model.js';

export class FoodController {
    
    static async getFoods(req, res) {
        try {
            const offset = Math.max(0, parseInt(req.query.offset) || 0); 
            const limit = Math.max(1, parseInt(req.query.limit) || 20);
            
            const allFoods = await Food.getAllFoods();
            const totalItems = allFoods.length;
            
            const paginatedFoods = allFoods.slice(offset, offset + limit);
            const hasNext = offset + limit < totalItems;
            
            const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
            
            const buildUrl = (newOffset, newLimit = limit) => 
                `${baseUrl}?offset=${newOffset}&limit=${newLimit}`;
            
            const nextLink = hasNext ? buildUrl(offset + limit) : null;
            const previousLink = offset > 0 ? buildUrl(Math.max(0, offset - limit)) : null;
            
            return res.status(200).json({
                count: allFoods.length,
                next: nextLink,
                previous: previousLink,
                results: paginatedFoods.map(food => ({
                    id: food.id,
                    name: food.name,
                    details: `${baseUrl}/${food.id}`
                }))
            });
            
        } catch (error) {
            console.error('Error in getFoods:', error);
            return res.status(500).json({ 
                error: 'Erro ao listar alimentos',
                details: error.message,
                solution: 'Use os parâmetros offset e limit (ex: ?offset=30&limit=30)'
            });
        }
    }

    static async getFoodById(req, res) {
        try {
            const food = await Food.getFoodById(req.params.id);
            
            return res.status(200).json(food);
        } catch (error) {
            if (error.message.includes('não encontrado')) {
                return res.status(404).json({ 
                    error: 'alimento não encontrado',
                    details: error.message,
                    suggestion: 'verifique o ID e tente novamente'
                });
            }
            return res.status(500).json({
                error: 'erro ao buscar alimento',
                details: error.message
            });
        }
    }

    static async getFoodsByName(req, res) {
        try {
            const name = req.query.q;
            if (!name) {
                return res.status(400).json({
                    error: 'nome para busca necessário',
                    example: '/food/search?q=banana'
                });
            }
    
            const results = await Food.getFoodsByName(name);
            return res.json({
                count: results.length,
                results : results.map(food => ({
                    id: food.id,
                    name: food.name,
                    details: `${req.protocol}://${req.get('host')}${req.baseUrl}/food/${food.id}`
                }))
            });
    
        } catch (error) {
            if (error.message.includes('nenhum alimento encontrado')) {
                return res.status(404).json({
                    error: error.message,
                    suggestion: 'tente outro nome'
                });
            }
            return res.status(500).json({
                error: 'erro na pesquisa',
                details: error.message
            });
        }
    }
}