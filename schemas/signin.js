var createSchema = require('json-gate').createSchema;

var schema = createSchema({
    type: 'object',
    properties: {
        username: {
            type: 'string',
            required: true,
            minLength: 3,
            maxLength: 30
        },
       password: {
           type: 'string',
           required: true,
           minLength: 6
       }
    }
});

module.exports = schema;
