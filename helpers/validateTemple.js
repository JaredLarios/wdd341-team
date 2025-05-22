const { body, query, param } = require('express-validator');

const templeValidationRules = () => {
    return [
        body('temple_id')
            .isInt().withMessage('Temple ID must be a number.'),
        
        body('name')
            .isString()
            .withMessage('Temple name must be a string')
            .isLength({ min: 5, max: 50 })
            .withMessage('Temple name must be greater than 5 characteres and less than 50'),

        body('location')
            .isString()
            .withMessage('Temple location must be a string')
            .isLength({ min: 5, max: 50 })
            .withMessage('Temple loaction must be greater than 5 characteres and less than 50'),

        body('dedicated')
            .isString()
            .withMessage('Temple dedicated must be a string')
            .isLength({ min: 5, max: 30 })
            .withMessage('Temple dedicated must be greater than 5 characteres and less than 50'),

        body('additionalInfo')
            .isBoolean().withMessage('Temple dedicated must be a bolean'),
    ]
}

const templeParamValidation = () => {
    return [
        param('temple_id')
            .isInt().withMessage('Temple ID must be a number.'),
    ]
}

module.exports = {
    templeValidationRules,
    templeParamValidation
}