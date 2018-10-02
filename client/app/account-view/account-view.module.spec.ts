import { AccountViewModule } from './account-view.module';

describe('AccountViewModule', () => {
  let accountViewModule: AccountViewModule;

  beforeEach(() => {
    accountViewModule = new AccountViewModule();
  });

  it('should create an instance', () => {
    expect(accountViewModule).toBeTruthy();
  });
});
