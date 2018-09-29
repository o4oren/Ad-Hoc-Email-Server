import { CoreRoutingModule } from './core-routing.module';

describe('CoreRoutingModule', () => {
  let appRoutingModule: CoreRoutingModule;

  beforeEach(() => {
    appRoutingModule = new CoreRoutingModule();
  });

  it('should create an instance', () => {
    expect(appRoutingModule).toBeTruthy();
  });
});
