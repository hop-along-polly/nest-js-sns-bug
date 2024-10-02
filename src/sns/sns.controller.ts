import { Controller, Post, Body } from '@nestjs/common';

@Controller('sns')
export class SnsController {
  @Post()
  handleSnsNotification(@Body() payload: any) {
    console.log('SNS Notification Received:', payload);
    return { message: 'SNS Notification received', payload };
  }
}
