import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-api-documentation',
  templateUrl: './api-documentation.component.html',
  styleUrls: ['./api-documentation.component.css']
})
export class ApiDocumentationComponent implements OnInit {
  h1 = 'AHEM - Ad-Hoc Temporary Email Server API Documentation';
  h2 = '';
  displayedColumns = ['httpMethod', 'uriPath', 'parameters', 'description'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);


  constructor(titleService: Title, metaService: Meta) {
    titleService.setTitle('AHEM - API Documentation');
    metaService.updateTag({ name: 'description', content: 'AHEM - an Ad-Hoc Disposable Temporary Email Service - API Documentation. '});
   }

  ngOnInit() {
  }

}

export interface Element {
  httpMethod: string;
  uriPath: string;
  parameters: string;
  description: string;
}

const ELEMENT_DATA: Element[] = [
  {httpMethod: 'POST', uriPath: '/api/account/autocomplete', parameters: '{ "prefix":[string] }',
    description: 'Returns a list of accounts starting with the prefix'},
  {httpMethod: 'GET', uriPath: '/api/properties', parameters: '', description: 'Returns various server properties and settings'},
  {httpMethod: 'GET', uriPath: '/api/account/{account}', parameters: '', description: 'returns a list of the email objects in the account'},
  {httpMethod: 'DELETE', uriPath: '/api/account/{account}', parameters: '', description: 'Deletes a whole account'},
  {httpMethod: 'GET', uriPath: '/api/account/{account}/{emailId}', parameters: '', description: 'Returns the contents of a specific email'},
  {httpMethod: 'DELETE', uriPath: '/api/account/{account}/{emailId}', parameters: '', description: 'Delete an emails'},
  {httpMethod: 'PATCH', uriPath: '/api/account/{acount}/{emailId}', parameters: '{"isRead" : [boolean]}',
    description: 'Updates the emailInfo object (representation of the email meta data in the user\'s account.'
    + ' Currently, only the isRead field is supported.'},
  {httpMethod: 'GET', uriPath: '/api/account/{account}/{emailId}/attachments/{filename}',
    parameters: '', description: 'Downloads a specific attachment on an email'}
];
