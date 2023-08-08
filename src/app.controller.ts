import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
const webpush = require('web-push');

import { setVapidDetails, sendNotification } from 'web-push';

const vapidKeys = {
  publicKey:
    'BCucKI9WG2aEbOhigJ6y_3Z28GIe0jp9QjaZtXXUABjGoUMup6IoYUrTSMh72MxP3t6eVoV6cZ1doEGMm9cRJ2Q',
  privateKey: 'OQazMChcws-F21vMTt81rlpRr4eZsWkR9yQlZAf0lW0',
};

const options = {
  vapidDetails: {
    subject: 'mailto:example_email@example.com',
    publicKey: vapidKeys.publicKey,
    privateKey: vapidKeys.privateKey,
  },
  TTL: 60,
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    return { test: 'test' };
  }
  @Post('notifications')
  subscribeForNotifications(@Body() subscription: any) {
    console.log('subscribeForNotifications');

    console.log({ subscription });
    this.sendPushNotification(subscription);
    return subscription;
  }
  private sendPushNotification(subscription) {
    sendNotification(
      subscription,
      JSON.stringify({
        notification: {
          title: 'Our first push notification',
          body: 'Here you can add some text',
        },
      }),
      options,
    )
      .then((log) => {
        console.log('Push notification sent.');
        console.log(log);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
