const core = require("@aws-cdk/core");
const apigateway = require("@aws-cdk/aws-apigateway");
const lambda = require("@aws-cdk/aws-lambda");
const dynamodb = require("@aws-cdk/aws-dynamodb");
const { EndpointType } = require("@aws-cdk/aws-apigateway");

class CyMaxService extends core.Construct {
  constructor(scope, id) {
    super(scope, id);

    // The three lambda functions that implement this service.
    const deleteHandler = new lambda.Function(this, "CyMaxDeleteHandler", {
        runtime: lambda.Runtime.NODEJS_12_X,
        code: lambda.Code.fromAsset("resources"),
        handler: "cy-max-delete-data.main"
      });
  
    const storeHandler = new lambda.Function(this, "CyMaxStoreHandler", {
        runtime: lambda.Runtime.NODEJS_12_X,
        code: lambda.Code.fromAsset("resources"),
        handler: "cy-max-store-data.main"
      });

    const getHandler = new lambda.Function(this, "CyMaxGetHandler", {
        runtime: lambda.Runtime.NODEJS_12_X,
        code: lambda.Code.fromAsset("resources"),
        handler: "cy-max-get-data.main"
    });

    // Get our existing DynamoDB table and let the lambda write to it.
    const table = dynamodb.Table.fromTableName(this, "CyTable", "compare-yourself");
    table.grantWriteData(storeHandler);
  
    // Define the API gateway for the service and wire the lambda functions
    // to the entry points.
    const api = new apigateway.RestApi(this, "cy-max-api", {
      restApiName: "CY Max Service",
      description: "CDK version of Max AWS demo app.",
      endpointConfiguration: [EndpointType.REGIONAL]
    });

    const storeIntegration = new apigateway.LambdaIntegration(storeHandler, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    });

    const deleteIntegration = new apigateway.LambdaIntegration(deleteHandler, {
        requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    });

    const getIntegration = new apigateway.LambdaIntegration(getHandler, {
        requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    });
    
    const top = api.root.addResource("compare-yourself");
    top.addMethod("POST", storeIntegration);
    top.addMethod("DELETE", deleteIntegration);

    const person = top.addResource("{type}");
    person.addMethod("GET", getIntegration);
  }
}

module.exports = { CyMaxService }
