/**
 * Created by ogeva on 7/6/2017.
 */

export interface EmailDetails {
  "attachments": Array<any>,
  "headers": any,
  "html": string,
  "text":string,
  "textAsHtml":string,
  "subject":string,
  "date":string,
  "to": {
    "value": Array<Recipient>,
    "html":string,
    "text":string
  },
  "from":{
    "value":Array<Sender>,
    "html":string,
    "text":string
  },
  "messageId":"<731871427.46.1499261090686.JavaMail.watchdox@localhost.localdom>"
}


export interface Recipient
  {
    "address":string,
    "name":string
  }

export interface Sender
{
  "address":string,
  "name":string
}

