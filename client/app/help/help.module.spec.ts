import { HelpModule } from './help.module';

describe('HelpModule', () => {
  let helpModule: HelpModule;

  beforeEach(() => {
    helpModule = new HelpModule();
  });

  it('should create an instance', () => {
    expect(helpModule).toBeTruthy();
  });
});
