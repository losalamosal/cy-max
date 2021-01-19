const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({ region: 'us-west-1', apiVersion: '2012-08-10' });

exports.main = async function (event) {
  console.log(event);
  // This doesn't appear to be getting passed in.
  // const type = event.type;
  const type = event.path.split('/').pop();
  console.log(`type: ${type}`);
  if (type === 'all') {
    const params = { TableName: "compare-yourself" };
    try {
      const result = await dynamodb.scan(params).promise();
      console.log(result);
      const items = result.Items.map((dataField) => {
        return { age: +dataField.Age.N, height: +dataField.Height.N, income: +dataField.Income.N };
      });
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/plain' },   // return CORS headers here?
        body: JSON.stringify(items, null, '  ')
      };
    } catch(err) {
      console.log(`scan error: ${err}`);
      return {
        statusCode: err.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },   // return CORS headers here?
        body: JSON.stringify(err)
      };
    }
  } else if (type === 'single') {
    const params = {
      Key: { "UserId": { S: "user_0.2216432297420794" } },
      TableName: "compare-yourself"
    };
    try {
      const result = await dynamodb.getItem(params).promise();
      console.log(result);
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/plain' },   // return CORS headers here?
        body: JSON.stringify(result, null, '  ')
      };
    } catch(err) {
      return {
        statusCode: err.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },   // return CORS headers here?
        body: err
      };
    }
  } else {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },   // return CORS headers here?
      body: 'Malformed query'
    };
  }
};
