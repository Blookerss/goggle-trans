const path = require('path');
const fastify = require('fastify').default({ logger: true });
fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'build')
});

fastify.get('/', async(request, reply) => {
    return reply.sendFile('index.html');
});

fastify.listen(
    process.env.PORT || 3000,
    process.env.HOST || '0.0.0.0'
);