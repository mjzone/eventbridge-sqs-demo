const EventBridge = require("aws-sdk/clients/eventbridge");
const eventBridge = new EventBridge();
const eventBusName = process.env.eventBusName;

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  let entries = [];

  body.forEach((entry) => {
    entries.push({
      Source: "patient-app",
      DetailType: "patient-absent",
      Detail: JSON.stringify({
        name: entry.name,
        age: entry.age,
      }),
      EventBusName: eventBusName,
    });
  });

  let result = await eventBridge.putEvents({ Entries: entries }).promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify({ result }),
  };

  return response;
};
