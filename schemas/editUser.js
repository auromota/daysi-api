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
       username: {
           type: 'string',
           required: false,
           minLength: 3,
           maxLength: 30
       },
       photo_privacy: {
           type: 'integer',
           maximum: 1,
           required: false
       },
       name_privacy: {
           type: 'integer',
           maximum: 1,
           required: false
       },
       email_privacy: {
           type: 'integer',
           maximum: 1,
           required: false
       },
       user_id: {
           type: 'integer',
           required: true
       }
    }
});

module.exports = schema;
