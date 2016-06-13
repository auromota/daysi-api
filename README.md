# About this
The API is being developed in NodeJS with Express Framework, using Neo4j as database. It is still being developed.

## Synopsys
Daysi is an interactive time planning tool which allows a single user or a whole team to manage time and keep schedule up to date. It can send real time notifications and generate reports so managers can have an ideal overview about how people spend time.

## How to run
After downloading or cloning the repository, you must install its dependencies:

```bash
npm install
```

You also must have a running instance of the Neo4j HTTP-API. If you are not familiar with it, visit [Neo4j Get Started](http://neo4j.com/developer/get-started/) for further information.

Then you must set some environment variables:

| Variable       | Description   |
|:--------------:| ------------- |
| NEO4J_URL      | url of your Neo4j HTTP-API |
| NEO4J_ENDPOINT | endpoint of your Neo4j HTTP-API |
| NEO4J_USER     | user of your Neo4j instance |
| NEO4J_PASSWORD | password of your Neo4j instance|
| JWT_PASS       | secret password to be used by JWT |

To make it easier, you can just create a file named `.env` in the root of the project and add the attributes. [Dotenv](https://github.com/motdotla/dotenv) will take care of that:

```
NEO4J_URL=http://localhost:7474
NEO4J_ENDPOINT=/db/data
NEO4J_USER=neo4j
NEO4J_PASS=password
JWT_PASS=jwtpassword
```

Now we are ready to go! Just use:

```bash
npm start
```

## Contributors
Auro Mota <auro@blueorc.com>

## License
The software is released under the MIT license.
