// rabbitmq/rabbitTemplate.ts
import amqp, { Channel, Connection } from 'amqplib';
import { rabbitmqConfig } from '../config/rabbitmqconfig';

class RabbitTemplate {
    private connection: Connection | null = null;
    private channel: Channel | null = null;

    async connect() {
        try {
            this.connection = await amqp.connect(rabbitmqConfig);
            this.channel = await this.connection.createChannel();
            console.log('Connected to RabbitMQ');
        } catch (error) {
            console.error('Failed to connect to RabbitMQ', error);
            throw error;
        }
    }

    async convertAndSend(exchange: string, routingKey: string, message: any) {
        if (!this.channel) {
            throw new Error('RabbitMQ channel is not initialized. Call connect() first.');
        }

        const messageBuffer = Buffer.isBuffer(message) ? message : Buffer.from(JSON.stringify(message));

        await this.channel.assertExchange(exchange, 'direct', { durable: true });
        this.channel.publish(exchange, routingKey, messageBuffer);

        console.log(`Message published to exchange ${exchange} with routing key ${routingKey}: ${message}`);
    }

    async sendToQueue(queue: string, message: string) {
        if (!this.channel) {
            throw new Error('RabbitMQ channel is not initialized. Call connect() first.');
        }
        await this.channel.assertQueue(queue, { durable: true });
        this.channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
        console.log(`Message sent to queue ${queue}: ${message}`);
    }

    async publishToExchange(exchange: string, routingKey: string, message: string) {
        if (!this.channel) {
            throw new Error('RabbitMQ channel is not initialized. Call connect() first.');
        }
        await this.channel.assertExchange(exchange, 'direct', { durable: true });
        this.channel.publish(exchange, routingKey, Buffer.from(message));
        console.log(`Message published to exchange ${exchange} with routing key ${routingKey}: ${message}`);
    }

    async closeConnection() {
        if (this.channel) {
            await this.channel.close();
        }
        if (this.connection) {
            await this.connection.close();
        }
    }
}

export const rabbitTemplate = new RabbitTemplate();
