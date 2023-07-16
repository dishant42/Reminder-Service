const amqplib = require("amqplib");
const { MESSAGE_BROKER_URL, EXCHANGE_NAME } = require('../Config/ServerConfig');


const createChannel = async () => {
    try {
        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, 'direct', false);
        return channel;
    } catch (error) {
        throw error
    }
}

const subscribeMessage = async (channel, service, binding_key) => {
    try {
        const application_queue = await channel.assertQueue("queue-name");

        channel.bindQueue(application_queue.queue, EXCHANGE_NAME, binding_key);

        channel.consume(application_queue.queue, message => {
            if (message !== null) {

                console.log('Received message:');
                const payload = JSON.parse(message.content.toString());
                service(payload);
                channel.ack(message);
            }

        })
    } catch (error) {
        throw error
    }
}

const publishMessage = async (channel, routing_key, message) => {
    try {

        await channel.assertQueue('queue-name');
        await channel.publish(EXCHANGE_NAME, routing_key, Buffer.from(message));

        console.log('Message published:', message);

    } catch (error) {
        throw error
    }
}


module.exports = {
    createChannel,
    publishMessage,
    subscribeMessage
}