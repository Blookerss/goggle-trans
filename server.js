const fastify = require('fastify').default({ logger: true });
fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'src-tauri/src/'),
    prefix: '/'
});

fastify.get('/', async(request, reply) => {
    return reply.sendFile('index.html');
});

fastify.listen(3000);