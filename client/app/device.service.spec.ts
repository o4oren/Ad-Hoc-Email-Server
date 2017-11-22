import { TestBed, inject } from '@angular/core/testing';

import { DeviceServiceService } from './device-service.service';

describe('DeviceServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceServiceService]
    });
  });

  it('should be created', inject([DeviceServiceService], (service: DeviceServiceService) => {
    expect(service).toBeTruthy();
  }));
});
