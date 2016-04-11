var createSchema = require('json-gate').createSchema;

var schema = createSchema({
    type: 'object',
    properties: {
        name: {
            type: 'string',
            required: false,
            minLength: 3,
            maxLength: 50
        },
        description: {
            type: 'string',
            required: false,
            maxLength: 256
        },
        privacy: {
            type: 'boolean',
            required: false
        },
        group_id: {
            type: 'integer',
            required: true
        }
    }
});

module.exports = schema;
