import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
const webpush = require('web-push');

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
  @Post()
  postHello(@Body() data): any {
    return data;
  }
  @Post('hello')
  postHelloHello(@Body() data): any {
    return data;
  }
  @Post('notifications')
  subscribeForNotifications(@Body() subscription: any) {
    console.log('subscribeForNotifications');

    console.log({ subscription });
    this.sendPushNotification(subscription);
    return subscription;
  }
  private sendPushNotification(subscription) {
    webpush
      .sendNotification(
        subscription,
        JSON.stringify({
          notification: {
            title: 'Our first push notification',
            body: 'Here you can add some text',
            badge:
              'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconpacks.net%2Ffree-icon%2Fnotification-bell-5743.html&psig=AOvVaw1ESRrSfLgapt9qxkTi71y0&ust=1691593366672000&source=images&cd=vfe&opi=89978449&ved=2ahUKEwiJ5Ii_qs2AAxUTkFwKHdczB2wQjRx6BAgAEAw',
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
