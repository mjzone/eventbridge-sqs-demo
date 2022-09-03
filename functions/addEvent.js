const EventBridge = require("aws-sdk/clients/eventbridge");
const eventBridge = new EventBridge();
const eventBusName = process.env.eventBusName;

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  await eventBridge
    .putEvents({
      Entries: [
        {
          Source: "patient-app",
          DetailType: "patient-absent",
          Detail: JSON.stringify({
            id: body.id,
            name: body.name,
            age: body.age,
          }),
          EventBusName: eventBusName,
        },
      ],
    })
    .promise();
  const response = {
    statusCode: 200,
    body: JSON.stringify({ name: body.name, age: body.age }),
  };

  return response;
};
