const { DynamoDB } = require('aws-sdk');

//  Look into whether this is good practice.
const dynamodb = new DynamoDB({ region: 'us-west-1', apiVersion: '2012-08-10' });

exports.main = async (event, context) => {
  console.log(JSON.stringify(context, null, '  '));
  console.log(JSON.stringify(event, null, '  '));
  const b = JSON.parse(event.body);
  console.log(JSON.stringify(b, null, '  '));
  const params = {
    Item: {
      "UserId": { S: "user_" + Math.random() },
      "Age": { N: b.age },
      "Height": { N: b.height },
      "Income": { N: b.income }
    },
    ReturnConsumedCapacity: "TOTAL",    // so we have something besides {} body
    TableName: "compare-yourself"
  };
  console.log(params);

  try {
    const result = await dynamodb.putItem(params).promise();
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
/*   dynamodb.putItem(params, function (err, data) {
    if (err) {
      console.log(`err: ${err}`);
      return {
        statusCode: err.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: err
      };
    } else {
      console.log(`data: ${JSON.stringify(data)}`);
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/plain' },
        body: "Suck Cess"
      };
    }
  }); */
};

// How do errors propogate?
/* module.exports.index = async (event, context) => {
	const queryRes = await ddb.query(...).promise();
	const putRes = await s3.putObject(...).promise();
	return ddb.putItem(...).promise();
}

module.exports.index = async (event, context) => {
	// The two *independent* queries run concurrently
	const [query1Res, query2Res] = await Promise.all([
		ddb.query(...).promise(),
		ddb.query(...).promise()
	]);
} */
