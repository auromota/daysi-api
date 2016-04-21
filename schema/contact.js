var createSchema = require('json-gate').createSchema;

var schema = createSchema({
    type: 'object',
    properties: {
        userId: {
            type: 'integer',
            required: true
        }
    },
    additionalProperties: false
});

module.exports = schema;
