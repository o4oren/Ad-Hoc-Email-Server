export interface AhemProperties {
  serverBaseUri: string;
  emailDeleteInterval: Number;
  emailDeleteAge: Number;
  allowAutocomplete: boolean;
  allowedDomains: Array<string>;
  customText?: string;
}
