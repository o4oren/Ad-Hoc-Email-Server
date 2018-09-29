import { HeaderModule } from './header.module';

describe('HeaderModule', () => {
  let headerModule: HeaderModule;

  beforeEach(() => {
    headerModule = new HeaderModule();
  });

  it('should create an instance', () => {
    expect(headerModule).toBeTruthy();
  });
});
