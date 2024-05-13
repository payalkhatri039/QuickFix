import nodemailer from 'nodemailer';
import { IUserSchema } from '../../types/user';

/**
 * @module EmailModule
 */
class EmailModule {
  to: Array<string> | string;
  transporter: any;
  testAccount: any;
  /**
   *
   * @param to email id of the receiver
   */
  constructor(to: string | Array<string>) {
    this.to = to;
  }

  /**
   * Initalizes the nodemailer with user ans password from env variables
   */
  async initialize() {
    this.testAccount = await nodemailer.createTestAccount();
    this.transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });
  }

  /**
   * Sends the signup mail
   */

  async sendSignUpMail() {
    if (this.testAccount == null) {
      await this.initialize();
    }
    try {
      const info = await this.transporter.sendMail({
        from: '"Quick Fix Team" <quickfixteam@outlook.com>',
        to: this.to,
        subject: 'Welcome to QuickFix',
        text: 'Welcome to quickfix',
        html: '<strong>Welcome to quickfix!!</strong>',
        headers: { 'x-myheader': 'test header' }
      });
    } catch (err) {
      console.log('Error', err);
    }
  }

  /**
   *
   * @param {string} token
   *
   * Sends the forgot password mail with token in the link
   */

  async sendForgotPasswordMail(token: string) {
    if (this.testAccount == null) {
      await this.initialize();
    }
    const body = `<p>Please use the following link to update your password</p>
    <p>http://localhost:3000/forgotpassword/${token}</p>
    `;
    try {
      const info = await this.transporter.sendMail({
        from: '"Quick Fix Team" <quickfixteam@outlook.com>',
        to: this.to,
        subject: 'Reset your password',
        text: 'Reset your password',
        html: body,
        headers: { 'x-myheader': 'test header' }
      });
    } catch (err) {
      console.log('Error', err);
    }
  }

  /**
   *
   * @param {string} courseId
   * Notifies all the student in the course that TAs
   * have posted new slots
   */

  async sendNewSlotsMail(courseId: string) {
    if (this.testAccount == null) {
      await this.initialize();
    }
    const body = `<div>
      <h3>Your TA just added new slots</h3>
      <p>Click <a href="http://localhost:3000/courses/${courseId}/bookslot">here</a> to book a slot</p>
    </div>`;
    if (Array.isArray(this.to)) {
      for (let i = 0; i < this.to.length; i++) {
        try {
          const info = await this.transporter.sendMail({
            from: '"Quick Fix Team" <quickfixteam@outlook.com>',
            to: this.to[i],
            subject: 'New TA Slots Available',
            text: 'New TA Slots Available',
            html: body,
            headers: { 'x-myheader': 'test header' }
          });
        } catch (err) {
          console.log('Error', err);
        }
      }
    }
  }

  /**
   *
   * @param param0
   * @description
   * sends the booking confirmation mail to student
   */

  async sendBookingMail({
    student,
    ta
  }: {
    student: IUserSchema;
    ta: IUserSchema;
  }) {
    if (this.testAccount == null) {
      await this.initialize();
    }
    const {
      firstName: studentFirstName,
      lastName: studentLastName,
      email: studentEmail
    } = student;
    const { firstName: taFirstName, lastName: taLastName, email: taEmail } = ta;
    const studentBody = `<div>
    <p>Hi ${studentFirstName} ${studentLastName},</p>
    <br/>
    <p>A new event has been scheduled.</p>
    <br/>
    <p>Event Type:</p>
    <p>15 Minute Meeting</p>
    <br/>
    <p>Invitee:</p>
    <p>${taFirstName} ${taLastName}</p>
    <br/>
    <p>Invitee Email:</p>
    <p><b>${taEmail}</b></p>
    </div>`;
    try {
      const info = await this.transporter.sendMail({
        from: '"Quick Fix Team" <quickfixteam@outlook.com>',
        to: studentEmail,
        subject: 'Booking Confirmed',
        text: 'New Booking Confirmed',
        html: studentBody,
        headers: { 'x-myheader': 'test header' }
      });
    } catch (err) {
      console.log('Error', err);
    }
    /*
      Hi Harsh Agarwal,

      A new event has been scheduled.

      Event Type: 
      30 Minute Meeting

      Invitee: 
      TA Name

      Invitee Email: 
      harshmagarwal@gmail.com
    */
  }
}

export default EmailModule;
