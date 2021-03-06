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
        groupId: {
            type: 'string',
            required: true,
            pattern: '^[0-9]*$'
        }
    },
    additionalProperties: false
});

module.exports = schema;
