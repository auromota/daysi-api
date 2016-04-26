var createSchema = require('json-gate').createSchema;

var schema = createSchema({
    type: 'object',
    properties: {
        groupId: {
            type: 'string',
            required: true,
            pattern: '^[0-9]*$'
        },
        username: {
            type: 'string',
            required: true,
            minLength: 3,
            maxLength: 30,
            pattern: '^[a-zA-Z0-9._]*$'
        }
    },
    additionalProperties: false
});

module.exports = schema;
