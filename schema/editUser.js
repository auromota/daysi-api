var createSchema = require('json-gate').createSchema;

var schema = createSchema({
    type: 'object',
    properties: {
        email: {
            type: 'string',
            required: false,
            format: 'email'
       },
       password: {
           type: 'string',
           required: false,
           minLength: 6
       },
       oldPassword: {
           type: 'string',
           required: false,
           minLength: 6
       },
       name: {
           type: 'string',
           required: false,
           minLength: 1,
           maxLength: 80
       },
       gender: {
           type: 'integer',
           required: false,
           maximum: 1
       },
       photo: {
           type: 'string',
           required: false
       },
       photoPrivacy: {
           type: 'integer',
           maximum: 1,
           required: false
       },
       namePrivacy: {
           type: 'integer',
           maximum: 1,
           required: false
       },
       emailPrivacy: {
           type: 'integer',
           maximum: 1,
           required: false
       }
   },
   additionalProperties: false
});

module.exports = schema;
