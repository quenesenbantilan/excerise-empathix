import * as AWS_SDK from 'aws-sdk';


/**
 * IMPORTANT! Use this AWS instead of direct 'aws-sdk' library to get xray tracing
 * configured in your lambda and all its downstream services
 *
 * Configures AWS Xray to capture trace for all AWS service clients and only when ONLINE
 */
export const AWS = AWS_SDK
