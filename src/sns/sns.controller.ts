import {
  Controller,
  Body,
  Headers,
  HttpCode,
  Post,
  Req,
  Request
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

interface SNSMessage {
  Type?: String,
  MessageId?: String,
  Token?: String,
  TopicArn?: String,
  Message?: String,
  SubscribeURL?: string,
  Timestamp?: Date,
  SignatureVersion?: String,
  Signature?: String,
  SigningCertURL?: String,
  UnsubscribeURL?: String
}

@Controller('sns')
export class SnsController {

  constructor(private readonly httpService: HttpService) {}

  @Post()
  @HttpCode(200)
  async handleSnsNotification(
    @Req() request: Request,
    @Body() body: SNSMessage,
    @Headers('x-amz-sns-message-type') type: string
  ) {
    console.log('SNS Notification Received:', body);
    
    if (type === 'SubscriptionConfirmation') {
      await this.confirmSubscription(body);
    } else {
      console.log('Received SNS Message', body);
    }
  }

  async confirmSubscription(msg: any) {
    const url = msg.SubscribeURL;
    console.log('Subscribe URL:', url);
    try {
      await this.httpService.get(url);
    } catch (err) {
      console.log('Failed to confirm subscription', err)
    }
  }
}
