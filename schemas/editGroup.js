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
            type: 'integer',
            required: false,
            maximum: 1
        },
        groupId: {
            type: 'integer',
            required: true
        }
    },
    additionalProperties: false
});

module.exports = schema;
