const AWS = require('aws-sdk');

exports.main = async function(event, context) {
  try {
    return {
      statusCode: 200,
      headers: {},
      body: "Made it to cy-max-delete-data (DELETE)"
    };
  } catch(error) {
    var body = error.stack || JSON.stringify(error, null, 2);
    return {
      statusCode: 400,
        headers: {},
        body: JSON.stringify(body)
    }
  }
}
