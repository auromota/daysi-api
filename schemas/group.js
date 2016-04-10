var createSchema = require('json-gate').createSchema;

var schema = createSchema({
    type: 'object',
    properties: {
        name: {
            type: 'string',
            required: true,
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
           required: true
       }
   }
});

module.exports = schema;
