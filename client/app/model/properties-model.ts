export interface AhemProperties {
  serverBaseUri: string;
  emailDeleteInterval: number;
  emailDeleteAge: number;
  allowAutocomplete: boolean;
  allowedDomains: Array<string>;
  customText?: string;
}
