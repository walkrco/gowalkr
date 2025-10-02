import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({ region: 'eu-west-2' }); // London region

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const headers = {
    'Access-Control-Allow-Origin': 'https://gowalkr.com',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.requestContext.http.method === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { name, email, subject, message }: ContactFormData = JSON.parse(event.body || '{}');

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'All fields are required' })
      };
    }

    // Determine recipient based on subject
    const toEmail = 'walkrco@outlook.com'; // Default
    let subjectPrefix = '[WALKR Contact]';

    switch (subject) {
      case 'business':
        subjectPrefix = '[WALKR Business]';
        break;
      case 'feedback':
        subjectPrefix = '[WALKR Feedback]';
        break;
      case 'bug':
        subjectPrefix = '[WALKR Bug Report]';
        break;
      case 'feature':
        subjectPrefix = '[WALKR Feature Request]';
        break;
      default:
        subjectPrefix = '[WALKR General]';
    }

    const emailParams = {
      Source: 'walkrco@outlook.com', // Using verified email
      Destination: {
        ToAddresses: [toEmail]
      },
      Message: {
        Subject: {
          Data: `${subjectPrefix} Message from ${name}`
        },
        Body: {
          Text: {
            Data: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Sent from WALKR Contact Form
            `.trim()
          },
          Html: {
            Data: `
              <h3>New Contact Form Submission</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <br>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p>
              <br>
              <hr>
              <p><em>Sent from WALKR Contact Form</em></p>
            `
          }
        }
      },
      ReplyToAddresses: [email]
    };

    await sesClient.send(new SendEmailCommand(emailParams));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Message sent successfully'
      })
    };

  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Event:', JSON.stringify(event, null, 2));
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to send message. Please try emailing us directly.',
        debug: (error as Error).message
      })
    };
  }
}