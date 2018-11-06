# Security
Die Platform nutzt die Spezifikationen OAuth 2.0 und OpenID Connect. 

## Clients
Für die Verwendung der Platform API ist mindestens ein registrierter Client notwendig. Dieser kann [hier](/clients/add) erstellt werden. Dazu müssen der Name des Clients, die URIs, zu welchen der Nutzer nach erfolgreicher Authentifizierung zurück geleitet wird und die benötigten Hostnamen für den "Access-Control-Allow-Origin" Header. 

## Tokens 
Um die API verwenden zu können, wird ein Access Token benötigt. Dieser kann gemäß OAuth 2.0 über verschiedene Flows erstellt werden und hat eine Lebensdauer von einer Stunde bzw. 15 Minuten, falls der Implicit Flow verwendet wird. Der Token muss im "Authorization" Header als Bearer Token angehangen werden. 
Der ID Token kann verwendet werden, um Informationen über den Nutzer, zum Beispiel den Benutzernamen, auszulesen.

## Flows
Der Beispiel Client in den Code Beispielen hat die ID "client" und läuft auf "http://localhost:3000". Der Nutzer besitzt den Benutzernamen "username" und das Passwort "password".

### Authorization Code Flow
Die Grafik beschreibt den groben Ablauf des Authorization Code Flows. Um diesen Flow zu implementieren, muss der Nutzer zunächst auf https://auth.sepl.infai.org/auth/realms/master/protocol/openid-connect/auth weitergeleitet werden. Dabei werden die Query Parameter "client_id", "response_type", "redirect_uri" und "scope" benötigt. Der Parameter "client_id" wird mit der Client ID aus der Client Registrierung gesetzt. Die "redirect_uri" wird verwendet, um den Nutzer wieder zum Client zurück zu leiten und den Authorization Code zu übergeben. Der Parameter "scope" beinhaltete die Berechtigung, die der Client haben möchte. Zusätzlich muss als Scope der Wert "oidc" gesetzt, um den ID Token zu generieren. Der Parameter "response_type" muss mit mit "code gesetzt" sein, um den Code Flow zu verwenden.
    
``` shell
curl -X GET 'https://auth.sepl.infai.org/auth/realms/master/protocol/openid-connect/auth?response_type=code&client_id=client&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=openid'
```
    
Anschließend meldet sich der Nutzer an, erteilt die erfragten Berechtigungen und wird zur Redirect URI weitergeleitet. Nachdem der Client den Code erhalten hat, kann er ihn in die entsprechenden Tokens umwandeln.
``` shell
  curl -X GET 'https://auth.sepl.infai.org/auth/realms/master/protocol/openid-connect/token?code=code&client_id=client'
```
![Authorization Code Flow](assets/img/code_flow.png)

### Ressource Owner Password Flow
Der Ressource Owner Password Flow ist die einfachste Art, um einen Access Token zu generieren. Dafür verlangt der Client den Benutzernamen und das Passwort vom Nutzer und erhält mit diesen den Access Token.
![Authorization Code Flow](assets/img/password_flow.png)
