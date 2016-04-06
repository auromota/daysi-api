var createSchema = require('json-gate').createSchema;

var schema = createSchema({
    type: 'object',
    properties: {
        email: {
            type: 'string',
            required: true,
            format: 'email'
       },
       password: {
           type: 'string',
           required: true,
           minLength: 6
       },
       name: {
           type: 'string',
           required: true,
           minLength: 1,
           maxLength: 80
       },
       gender: {
           type: 'integer',
           required: true,
           maximum: 1
       },
       photo: {
           type: 'string',
           required: false
       },
       username: {
           type: 'string',
           required: true,
           minLength: 6,
           maxLength: 30
       },
       photoPrivacy: {
           type: 'integer',
           required: true,
           maximum: 1
       },
       namePrivacy: {
           type: 'integer',
           required: true,
           maximum: 1
       }
    }
});

module.exports = schema;
