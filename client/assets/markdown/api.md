HTTP Method | URI Path | Parameters | Descritpion
--- | --- | --- | ---
POST | /account/autocomplete | { "prefix":"value" } | Returns a partial list of accounts
GET | /api/properties | |returns the properties.json content
GET | /api/account/{account} | |returns a list of the email objects in the account
GET | /api/account/{account}/{emailId} | |Gets the contents of a specific email
PATCH | /api/account/{acount}/{emailId} | {"isRead" : true} |Updates the emailInfo object (representation of the email meta data in the user's account. Currently, only the isRead field is supported.
GET | /api/account/{account}/{emailId}/attachments/{filename} | |Downloads a specific attachment form an email
DELETE | /api/account/{account}/{emailId} | |Deletes a specific email
DELETE | /api/account/{account} | | Deletes a whole account
DELETE | /api/dataDir | | Empty the data folder