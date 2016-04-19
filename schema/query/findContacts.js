var createSchema = require('json-gate').createSchema;

var schema = createSchema({
    type: 'object',
    properties: {
        query: {
            type: 'string',
            default: ''
        },
        page: {
            type: 'string',
            minLength: 1,
            pattern: '^[0-9]*$',
            default: '0'
        },
        size: {
            type: 'string',
            minLength: 1,
            pattern: '^[0-9]*$',
            default: '10'
        }
    }
});

module.exports = schema;
