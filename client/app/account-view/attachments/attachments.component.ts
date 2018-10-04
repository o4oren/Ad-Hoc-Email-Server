import {Component, Input, OnInit} from '@angular/core';
import {EmailDetails} from '../../model/email-details-model';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})
export class AttachmentsComponent implements OnInit {

  @Input() emailDetails: EmailDetails;
  @Input() account: string;
  @Input() emailId: string;

  constructor() {
  }

  ngOnInit() {
  }

  getIconName(filename: string): string {
    const ext = (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : '';

    switch (ext[0]) {
      case 'zip':
      case 'tar':
      case 'gz':
      case '7z': {
        return 'file-archive';
      }
      case 'xlsx':
      case 'xls': {
        return 'file-excel';
      }
      case 'ppt':
      case 'pptx': {
        return 'file-powerpoint';
      }
      case 'doc':
      case 'docx': {
        return 'file-word';
      }
      case 'csv':
      case 'txt': {
        return 'file-text';
      }
      case 'pdf': {
        return 'file-pdf';
      }
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'bmp':
      case 'gif': {
        return 'file-image';
      }
      case 'mp4':
      case 'flac':
      case 'mov':
      case 'flv':
      case 'mpeg':
      case 'avi': {
        return 'file-video';
      }
      case 'mp3':
      case 'ogg':
      case 'wav': {
        return 'file-audio';
      }
      default: {
        return 'file';
      }
    }
  }

}
