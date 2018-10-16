import { MailboxModule } from './mailbox.module';

describe('MailboxRoutingModule', () => {
  let mailboxViewModule: MailboxModule;

  beforeEach(() => {
    mailboxViewModule = new MailboxModule();
  });

  it('should create an instance', () => {
    expect(mailboxViewModule).toBeTruthy();
  });
});
