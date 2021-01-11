const AWS = require('aws-sdk');

//  Look into whether this is good practice.
const dynamodb = new AWS.DynamoDB({ region: 'us-west-1', apiVersion: '2012-08-10' });


exports.main = async function (event, context) {
  b = JSON.parse(event.body);
  const params = {
    Item: {
      "UserId": { S: "user_" + Math.random() },
      "Age": { N: b.age },
      "Height": { N: b.height },
      "Income": { N: b.income }
    },
    TableName: "compare-yourself"
  };
  console.log(params);

  return await dynamodb.putItem(params, function (err, data) {
    console.log(JSON.stringify(data));
    console.log(JSON.stringify(err));
    if (err) {
      return {
        statusCode: 400,
        headers: {},
        body: "Boned DB put!"
      }
    } else {
      return {
        statusCode: 200,
        headers: {},
        body: "DB success!"
      }
    }
  }).promise();
}
