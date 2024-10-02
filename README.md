# Nest JS SNS Bug Example

  A Simple Nest.js application to demonstrate a bug in which a Nest.js POST endpoint drops the message body from SNS notifications

## Prerequisites

- Local dev creds setup for an AWS Account

## Steps to Reproduce

1. Run `pnpm start` to start the Nest.js App
2. Follow the [Ngrok Quickstart](https://ngrok.com/docs/getting-started/) guide to setup an HTTPS proxy to the locally running Nest.js App. When starting the Ngrok proxy use `ngrok http http://localhost:3000`

**NOTE: The free trial is enough to reproduce the error.**

3. Run `./scripts/init-aws.sh` to create the SNS Topic and Subscribe the Ngrok HTTPS endpoint as an HTTPS Subscriber to that Topic.

4. Observe an event is received at the `/sns` endpoint but the message body logged is `{}` instead of something similar to
```json
{
  "Type": "SubscriptionConfirmation",
  "MessageId": "8e5fc642-62da-4ea5-b33a-245e4a2fe5c3",
  "Token": "an-annoyingly-long-cryptographic-token",
  "TopicArn": "arn:aws:sns:us-east-1:000000000000:derek-test",
  "Message": "You have chosen to subscribe to the topic arn:aws:sns:us-east-1:000000000000:derek-test.\nTo confirm the subscription, visit the SubscribeURL included in this message.",
  "SubscribeURL": "https://sns.us-east-1.amazonaws.com/?Action=ConfirmSubscription&TopicArn=arn:aws:sns:us-east-1:000000000000:derek-test&Token=an-annoyingly-long-cryptographic-token",
  "Timestamp": "2024-10-01T21:22:02.189Z",
  "SignatureVersion": "1",
  "Signature": "a-really-long-ssl-signature",
  "SigningCertURL": "https://sns.us-east-1.amazonaws.com/SimpleNotificationService-60eadc530605d63b8e62a523676ef735.pem"}
```
