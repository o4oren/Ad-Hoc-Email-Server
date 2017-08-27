import { HtmlSanitizerPipe } from './html-sanitizer.pipe';

describe('HtmlSanitizerPipe', () => {
  it('create an instance', () => {
    const pipe = new HtmlSanitizerPipe();
    expect(pipe).toBeTruthy();
  });
});
