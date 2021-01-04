const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'us-west-1', apiVersion: '2012-08-10'});

exports.main = async function(event, context) {
  b = JSON.parse(event.body);
  console.log(b);
  try {
    const params = {
      Item: {
          "UserId": { S: "user_" + Math.random() },
          "Age":    { N: b.age },
          "Height": { N: b.height },
          "Income": { N: b.income }
      },
      TableName: "compare-yourself"
  };
  console.log(params);
  
  dynamodb.putItem(params, function(err, data) {
    console.log(data);
    console.log(err);
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
        body: data
      }
    }
  });

  } catch(error) {
    var body = error.stack || JSON.stringify(error, null, 2);
    console.log(body);
    return {
      statusCode: 400,
        headers: {},
        body: JSON.stringify(body)
    }
  }
}
