# Security
The platform uses the security specifications OAuth 2.0 and OpenID Connect. 

## Clients
For the usage of the platform API you need a registered client. This client can be created [hier](/clients/add).
For the registration you have to set a client name, the redirect URLs of your application where a user gets redirected after he successfully authenticated and the necessary host names for the "Access-Control-Allow-Origin" Header.

## Tokens 
If you have an registered client, you can generate access tokens which are needed to access the API. OAuth 2.0 defines multiple flows to generate them. Depending on the flow, the access token has a different lifetime. Normally the token expires after one hour. Only if you use the Implicit Flow it will be expire after 15 minutes.
After the generation you have to append the token to every request as an Authorization Bearer header.
You will also get an id token with the generation of the access token which will contain basis informations of the user profile.

## Flows
The client in the following examples will have the id "client" and will run under "http://localhost:3000". The user will have the username "username" and the password "password" 

### Authorization Code Flow
The graphic describes the authorization code flow. To implement this flow, you have to redirect the user to https://auth.sepl.infai.org/auth/realms/master/protocol/openid-connect/auth. There you have to set the query parameters "client_id", "response_type", "redirect_uri" and "scope".  
The parameter "client_id" has to be set with the client id from the client registration. The parameter "redirect_uri" is used to redirect the user after he successfully authenticated and to submit the authorization code to the client. The parameter "scope" includes the the permissions, that the clients want to have. Additionaly the scope parameter should have the value "oidc" to generate the id token. The parameter "response_type" has to be set with "code" to use the authorization code flow.
    
``` shell
curl -X GET 'https://auth.sepl.infai.org/auth/realms/master/protocol/openid-connect/auth?response_type=code&client_id=client&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=openid'
```
    
Next, the user loggs in, authorizes the requested permissions and gets redirected to the redirect URL specified in the client registration. 
After the client got the code, he can exchange it to an access token. 
``` shell
  curl -X GET 'https://auth.sepl.infai.org/auth/realms/master/protocol/openid-connect/token?code=code&client_id=client'
```
![Authorization Code Flow](assets/img/code_flow.png)

### Ressource Owner Password Flow
The Ressource Owner Password Flow is the simplest way to generate an access token. With this flow the client needs the credentials of the user and gets the access token.
![Authorization Code Flow](assets/img/password_flow.png)