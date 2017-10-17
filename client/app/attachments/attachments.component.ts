import {Component, Input, OnInit} from '@angular/core';
import {EmailDetails} from "../model/email-details-model";

@Component({
  selector: 'attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})
export class AttachmentsComponent implements OnInit {

  @Input() emailDetails: EmailDetails;
  @Input() account: string;
  @Input() timestamp: string;

  constructor() {
  }

  ngOnInit() {
  }

  getIconName(filename: string): string {
    let ext = (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;

    switch (ext) {
      case 'zip': {
        return 'fa-file-zip-o';
      }
      case 'xlsx':
      case 'xls': {
        return 'fa-file-excel-o';
      }
      case 'ppt':
      case 'pptx': {
        return 'fa-file-powerpoint-o';
      }
      case 'doc':
      case 'docx': {
        return 'fa-file-word-o';
      }
      case 'csv':
      case 'txt': {
        return 'fa-file-text-o';
      }
      case 'pdf': {
        return 'fa-file-pdf-o';
      }
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'bmp':
      case 'gif': {
        return 'fa-file-image-o';
      }
      case 'mp4':
      case 'flac':
      case 'mov':
      case 'flv':
      case 'mpeg':
      case 'avi': {
        return 'fa-file-video-o';
      }
      case 'mp3':
      case 'ogg':
      case 'wav': {
        return 'fa-file-audio-o';
      }
      default: {
        return 'fa-file-o';
      }
    }
  }

}
