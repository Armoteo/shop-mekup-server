const nodemailer = require('nodemailer');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      auth: {
        pass: process.env.SMTP_PASSWORD,
        user: process.env.SMTP_USER,
      },
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
    });
  }

  async sendActivationMail(toEmail, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      html:
            `
            <div>
              <h1>Please follow the link to activate your account</h1>
              <a href="${link}">${link}</a>
              </div>
            `,
      subject: `Activate your account${process.env.API_URL}`,
      text: '',
      to: toEmail,
    });
  }
}

module.exports = new MailService();
