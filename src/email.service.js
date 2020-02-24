
const AWS = require('aws-sdk');
const awsConfig = require('./awsConfig');

AWS.config.update({
  accessKeyId: awsConfig.key,
  secretAccessKey: awsConfig.secret,
  region: awsConfig.ses.region
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

module.exports = {
  /**
   * @method sendMail
   * @param {Array} to array of mails to send content to
   * @param {String} subject Subject of mail to be sent
   * @param {String} message content of message in html template format
   * @param {String} from not required: mail to send email from
   * @returns {*} void
   */
  sendMail(to, subject, message, from) {
    const params = {
      Destination: {
        ToAddresses: to
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: message
          },
          /* replace Html attribute with the following if you want to send plain text emails.
              Text: {
                  Charset: "UTF-8",
                  Data: message
              }
           */
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject
        }
      },
      ReturnPath: from || awsConfig.ses.from.default,
      Source: from || awsConfig.ses.from.default
    };
    return new Promise((resolve, reject) => {
      ses.sendEmail(params, (err, data) => {
        if (err) {
          reject(err, err.stack);
        } else {
          resolve(data);
        }
      });
    });
  }
};
