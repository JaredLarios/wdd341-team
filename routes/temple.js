const routes = require('express').Router();
const temples = require('../controllers/temple');
const validate = require('../helpers/validate');
const { templeValidationRules, templeParamValidation } = require('../helpers/validateTemple.js');

routes.get('/', temples.findAll);
routes.get('/:temple_id', templeParamValidation(), validate, temples.findOne);

routes.post('/', templeValidationRules(), validate, temples.create);

routes.put("/:temple_id", templeParamValidation(), templeValidationRules(), validate, temples.update);

routes.delete("/:temple_id", templeParamValidation(), validate, temples.delete);
routes.delete("/", temples.deleteAll);

module.exports = routes;
