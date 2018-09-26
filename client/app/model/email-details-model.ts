

export interface EmailDetails {
  '_id':  string;
  'timestamp':  Number;
  'attachments':  Array<any>;
  'headers':  any;
  'html':  string;
  'text': string,
  'textAsHtml': string;
  'subject': string;
  'date': string;
  'to':  {
    'value':  Array<EmailAddress>;
    'html': string;
    'text': string;
  };
  'from': {
    'value': Array<EmailAddress>;
    'html': string;
    'text': string;
  };
  'cc': {
    'value': Array<EmailAddress>;
    'html': string;
    'text': string;
  };
  'messageId': string;
}


export interface EmailAddress {
    'address': string;
    'name': string;
}



