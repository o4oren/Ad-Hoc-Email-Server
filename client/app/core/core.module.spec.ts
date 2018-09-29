import { CoreModule } from './core.module';

describe('CoreModule', () => {
  let footerModule: CoreModule;

  beforeEach(() => {
    footerModule = new CoreModule();
  });

  it('should create an instance', () => {
    expect(footerModule).toBeTruthy();
  });
});
