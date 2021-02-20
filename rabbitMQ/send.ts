import amqplib from "amqplib";

const queueName = "Hello";
const message = "Hello World";

const sendMessage = async () => {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, { durable: false });
  channel.sendToQueue(queueName, Buffer.from(message));
  console.log("sent: ", message);
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
};

sendMessage();
