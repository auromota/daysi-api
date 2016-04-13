var createSchema = require('json-gate').createSchema;

var schema = createSchema({
    type: 'object',
    properties: {
        user_id: {
            type: 'integer',
            required: true
        }
    },
    additionalProperties: false
});

module.exports = schema;
