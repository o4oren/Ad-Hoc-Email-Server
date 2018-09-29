import { PrivacyModule } from './privacy.module';

describe('PrivacyModule', () => {
  let privacyModule: PrivacyModule;

  beforeEach(() => {
    privacyModule = new PrivacyModule();
  });

  it('should create an instance', () => {
    expect(privacyModule).toBeTruthy();
  });
});
