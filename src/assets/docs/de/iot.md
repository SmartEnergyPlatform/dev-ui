# IoT Repository
Das Iot Repository ist für die Verwaltung von Gerätetypen, Gateways und Geräteinstanzen zuständig.

## Konzept
Ein Gerät kann über mehrere Wege an die Platform angeschlossen werden. Dafür können die Protokolle HTTPS, MQTT und CoAP verwendet werden. Ebenso ist eine Integration von bereits installierten Geräte in OpenHAB möglich.
Das Gerät kann entweder alleine oder über ein Gateway mit der Platform verbunden werden. Das Gateway kann dabei zur Verwaltung eines Netzwerks mit mehreren Geräte oder zur Integration von nicht unterstützten Protokollen verwendet werden.
In der Platform wird das Geräte anschließend als Instanz eines Gerätentyps dargestellt. Der Typ definiert die Services, die von der Geräteinstanz schließlich angeboten werden. Die Input und Output Parameter definieren die Eingangswerte und Ausgangswerte eines Gerätetyps. 

## Über die UI
### Gerätetypen erstellen
Über die [UI](https://ui.sepl.infai.org/#!/iotrepository/wizard) kann ein Gerätetyp angelegt werden. Ein Gerätetyp besteht neben Metainformationen aus Services, welche definieren, wie die Geräteinstanzen angesprochen werden können. Ein Service wiederum kann Input und Outputparameter besitzen. Ein Inputparameter für Aktuatoren wird verwendet, um Befehle zu einer Geräteinstanz zu senden. Outputparamter können dann das Format der Antwort oder der Messdaten von Sensoren darstellen.
Um einen Temperatursensortypen hinzuzufügen, müsste man zunächst den Typen anlegen und den Namen, einen Beschreibung, die Geräte Art und den Hersteller angeben. Anschließend kann ein Service mit dem Namen "Temperatur" angelegt werden. Dieser benötigt einen Outputparameter, zum Beispiel "temp_value". Dieser soll die Werte des Sensors im JSON Format darstellen. Dieses Format muss vorher als [Datentyp](https://ui.sepl.infai.org/#!/iotrepository/valuetypes/list) erstellt werden und kann dann unter "Format" ausgewählt werden.
``` json
{
    "value": 20,
    "unit": "celsius",
    "time": "2018-01-01"
}
```

### Geräte hinzufügen
Über den Gerätetypen kann direkt auch eine Geräteinstanz erstellt werden. 

## Über HTTPS und WebSockets
## API
## Python Connector Client
Für die Nutzung mit HTTPS und WebSockets kann der [Python Connector Client](https://gitlab.wifa.uni-leipzig.de/fg-seits/connector-client) verwendet werden. Er kümmert sich um den Verbindungsaufbau mit der Platform sowie das Erstellen des Gateways und die Weiterleitung von Daten.

#### Gateways erstellen
Zunächst muss eine Konfigurationsdatei erstellt mit dem folgenden Inhalt erstellt werden:
``` shell
[CONNECTOR]
protocol = wss
host = connector.sepl.infai.org
port = < websocket port >
user = <username>
password = <password>

[LOGGER]
level = < debug / info / warning / error / critical >
rotating_log = < yes / no >
rotating_log_backup_count = < number of backup copies to keep >
```

Anschließend kann das Gateway erstellt werden. Dazu muss eine Gerätemanager ausgewählt werden. Es können der In-Memory Gerätemanager "DevicePool" oder der persistente Gerätemanager verwendet werden.
``` shell
from connector.client import Client
from modules.device_pool import DevicePool

connector_client = Client(DevicePool)
```

#### Gerätetypen erstellen
Für die Nutzung mit dem Python Connector wird vorausgesetzt, dass der benötigte Gerätetyp bereits erstellt wurde. Über die [UI](https://ui.sepl.infai.org/#!/iotrepository/wizard) kann dieser Gerätetyp angelegt werden. 

#### Geräte hinzufügen
Ein Gerät kann einfach über die Device Klasse erstellt werden. Der Connector meldet es automatisch bei der Platform als verbunden an. Dazu wird mindestens eine ID, ein Name sowie die ID des zugehörigen Gerätetypens benötigt. 


``` shell
from connector.device import Device
device_type_id = 'iot#d66ec9bc-e37f-4f35-a788-027301aad6c2'
device_instance_name = 'Dummy Device'
device_id = "id"
device = Device(device_id, device_type_id, device_instance_name)
device.addTag('type', 'Dummy')
DevicePool.add(device)
```

## Über MQTT


## OpenHAB Integration
Der [OpenHAB Connector](https://gitlab.wifa.uni-leipzig.de/fg-seits/openhabconnector) kann verwendet werden, um eine OpenHAB Instanz mit der Platform zu verbinden. Dieser erkennt automatisch neue Geräte und erstellt die entsprechenden Gerätetypen.

