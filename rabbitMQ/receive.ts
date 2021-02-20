// docker run --rm -it --hostname my-rabbit -p 15672:15672 -p 5672:5672 rabbitmq:3-management
import amqplib from "amqplib";

const queueName = "wdj";

const getMessage = async () => {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, { durable: false });
  console.log(`Waiting for messages in queue: ${queueName}`);
  channel.consume(
    queueName,
    (message) => {
      console.log(`[X] Received: ${message?.content.toString()}`);
    },
    { noAck: true }
  );
};

getMessage();
