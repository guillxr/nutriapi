export const validateNumberField = (value, fieldName) => {
    if (typeof value !== 'number' || isNaN(value)) {
        throw new Error(`${fieldName} deve ser um número válido`);
    }
    if (value < 0) {
        throw new Error(`${fieldName} deve ser positivo`);
    }
};

export const validateFoodData = (data) => {
    const errors = [];

    const requiredFields = {
        calories: 'calorias',
        carbohydrates: 'carboidratos',
        proteins: 'proteínas',
        fats: 'gorduras',
        fiber: 'fibras'
    };

    for (const [field, name] of Object.entries(requiredFields)) {
        if (!(field in data)) {
            errors.push(`${name} é obrigatório`);
            continue;
        }

        try {
            validateNumberField(data[field], name);
        } catch (error) {
            errors.push(error.message);
        }
    }

    if ('name' in data && !data.name.trim()) {
        errors.push('nome não pode ser vazio');
    }

    if (errors.length > 0) {
        throw new Error(`dados inválidos:\n- ${errors.join('\n- ')}`);
    }
};