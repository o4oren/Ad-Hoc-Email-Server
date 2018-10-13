import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Meta, Title} from '@angular/platform-browser';
import {ConfigService} from '../../core/services/config.service';

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
      uriPath: ConfigService.properties.serverBaseUri + '/api/account/autocomplete',
      headers: [],
      parameters: '{ "prefix":[string] }',
      description: 'Returns a list of accounts starting with the prefix'
    },
    {
      httpMethod: 'GET',
      uriPath: ConfigService.properties.serverBaseUri + '/api/properties',
      headers: [],
      parameters: '',
      description: 'Returns various server properties and settings'},
    {
      httpMethod: 'GET',
      uriPath: ConfigService.properties.serverBaseUri + '/api/account/{account}',
      headers: [],
      parameters: '',
      description: 'returns a list of the email objects in the account'
    },
    {
      httpMethod: 'DELETE',
      uriPath: ConfigService.properties.serverBaseUri + '/api/account/{account}',
      headers: [],
      parameters: '',
      description: 'Deletes a whole account'},
    {
      httpMethod: 'GET',
      uriPath: ConfigService.properties.serverBaseUri + '/api/account/{account}/{emailId}',
      headers: [],
      parameters: '',
      description: 'Returns the contents of a specific email'
    },
    {
      httpMethod: 'DELETE',
      uriPath: ConfigService.properties.serverBaseUri + '/api/account/{account}/{emailId}',
      headers: [],
      parameters: '',
      description: 'Delete an emails'},
    {
      httpMethod: 'PATCH',
      uriPath: ConfigService.properties.serverBaseUri + '/api/account/{acount}/{emailId}',
      headers: [],
      parameters: '{"isRead" : [boolean]}',
      description: 'Updates the emailInfo object (representation of the email meta data in the user\'s account.'
      + ' Currently, only the isRead field is supported.'
    },
    {
      httpMethod: 'GET',
      uriPath: ConfigService.properties.serverBaseUri + '/api/account/{account}/{emailId}/attachments/{filename}',
      headers: [],
      parameters: '',
      description: 'Downloads a specific attachment on an email'
    }
  ];

  constructor(titleService: Title, metaService: Meta) {
    titleService.setTitle('AHEM - API Documentation');
    metaService.updateTag({name: 'description', content: 'AHEM - Ad-Hoc Email - API Documentation. '});
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

