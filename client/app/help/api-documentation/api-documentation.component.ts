import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../../core/services/config.service';
import {SeoService} from '../../core/services/seo.service';

@Component({
  selector: 'app-api-documentation',
  templateUrl: './api-documentation.component.html',
  styleUrls: ['./api-documentation.component.css']
})
export class ApiDocumentationComponent implements OnInit {
  h1 = 'AHEM - Ad-Hoc Temporary Email Server API Documentation';
  h2 = '';

  apiCalls: ApiCall[] = [
    {
      httpMethod: 'POST',
      uriPath: ConfigService.properties.serverBaseUri + '/auth/authenticate',
      headers: [],
      parameters: '{}',
      description: 'Returns an access token associated with the requesting IP address.'
    },
    {
      httpMethod: 'POST',
      uriPath: ConfigService.properties.serverBaseUri + '/api/mailbox/autocomplete',
      headers: [],
      parameters: '{ "prefix":[string] }',
      description: 'Returns a list of mailboxes starting with the prefix'
    },
    {
      httpMethod: 'GET',
      uriPath: ConfigService.properties.serverBaseUri + '/api/properties',
      headers: [],
      parameters: '',
      description: 'Returns various server properties and settings'},
    {
      httpMethod: 'GET',
      uriPath: ConfigService.properties.serverBaseUri + '/api/mailbox/{mailbox}',
      headers: [],
      parameters: '',
      description: 'returns a list of the email objects in the mailbox'
    },
    {
      httpMethod: 'DELETE',
      uriPath: ConfigService.properties.serverBaseUri + '/api/mailbox/{mailbox}',
      headers: [],
      parameters: '',
      description: 'Deletes a whole mailbox'},
    {
      httpMethod: 'GET',
      uriPath: ConfigService.properties.serverBaseUri + '/api/mailbox/{mailbox}/{emailId}',
      headers: [],
      parameters: '',
      description: 'Returns the contents of a specific email'
    },
    {
      httpMethod: 'DELETE',
      uriPath: ConfigService.properties.serverBaseUri + '/api/mailbox/{mailbox}/{emailId}',
      headers: [],
      parameters: '',
      description: 'Delete an emails'},
    {
      httpMethod: 'PATCH',
      uriPath: ConfigService.properties.serverBaseUri + '/api/mailbox/{acount}/{emailId}',
      headers: [],
      parameters: '{"isRead" : [boolean]}',
      description: 'Updates the emailInfo object (representation of the email meta data in the user\'s mailbox.'
      + ' Currently, only the isRead field is supported.'
    },
    {
      httpMethod: 'GET',
      uriPath: ConfigService.properties.serverBaseUri + '/api/mailbox/{mailbox}/{emailId}/attachments/{filename}',
      headers: [],
      parameters: '',
      description: 'Downloads a specific attachment on an email'
    }
  ];

  constructor(seoService: SeoService) {
    seoService.setTitle('AHEM - API Documentation');
    seoService.updateMetaTag({name: 'description', content: 'AHEM - Ad-Hoc Email - API Documentation. '});
  }

  ngOnInit() {
  }

}

export class ApiCall {
  httpMethod: string;
  uriPath: string;
  headers: Array<string>;
  parameters: string;
  description: string;
}

