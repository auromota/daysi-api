var createSchema = require('json-gate').createSchema;

var schema = createSchema({
    type: 'object',
    properties: {
        userId: {
            type: 'string',
            minLength: 1,
            pattern: '^[0-9]*$',
            required: true
        }
    }
});

module.exports = schema;
