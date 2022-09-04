module.exports.handler = async (event) => {
  let batchItemFailures = [];
  let records = event.Records;
  if (records.length) {
    for (const record of records) {
      const parsedBody = JSON.parse(record.body);
      try {
        if (typeof parsedBody.detail.age !== "number") {
          console.log("Age is not a number: " + parsedBody.detail.age);
          throw new Error("Age must be a number");
        }
        // Add record processing logic here...
        console.log("Successfully processed: " + record.messageId);
      } catch (err) {
        batchItemFailures.push({ itemIdentifier: record.messageId });
      }
    }
  }
  return { batchItemFailures };
};
