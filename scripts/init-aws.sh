#!/bin/bash

read -p "Enter the ngrok HTTPS URL (e.g., https://56f5-72-19-158-172.ngrok-free.app): " sns_endpoint_url

echo "Creating SNS Topic 'nest-js-test'..."
topic_arn=$(aws sns create-topic \
    --name nest-js-test \
    --query 'TopicArn' \
    --output text
)

if [ $? -ne 0 ]; then
  echo "Failed to create SNS Topic. Please check your AWS CLI configuration."
  exit 1
fi
echo "SNS Topic created successfully: $topic_arn"

echo "Subscribing the URL $sns_endpoint_url to the topic..."
aws sns subscribe \
    --topic-arn "$topic_arn" \
    --protocol https \
    --notification-endpoint "$sns_endpoint_url"/sns

if [ $? -eq 0 ]; then
  echo "Successfully subscribed $sns_endpoint_url to the SNS Topic 'nest-js-test'."
else
  echo "Failed to subscribe the URL. Please check your AWS CLI configuration."
  exit 1
fi
