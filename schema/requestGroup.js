var createSchema = require('json-gate').createSchema;

var schema = createSchema({
    type: 'object',
    properties: {
        groupId: {
            type: 'string',
            required: true,
            pattern: '^[0-9]*$'
        }
    },
    additionalProperties: false
});

module.exports = schema;
