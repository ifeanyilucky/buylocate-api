// @ts-nocheck
import { SMTPClient } from 'emailjs';

interface IOptions {
  to: string;
  subject: string;
  html: string;
}

export default async function sendEmail(options: IOptions) {
  const client = new SMTPClient({
    user: process.env.MAIL_USERNAME,
    password: process.env.MAIL_PASSWORD,
    host: 'smtp',
  });

  const message = {
    from: 'Buylocate Support <buylocate@gmail.com>',
    to: options.to,
    subject: options.subject,
    attachment: [{ data: options.html, alternative: true }],
  };

  await client.sendAsync(message);
}
