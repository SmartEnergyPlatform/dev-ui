# IoT Repository
The IoT repository is used for the management of device types, device instances and gateways.

## Concept
A device can be connected to the platform by multiple ways. Therefore the protocols HTTPS, WebSocket and MQTT can be used. Also an integration of the OpenHAB platform is possible.
The device can be connected by itself or over an gateway. This gateway helps to manage multiple devices in a network or to connect devices that are using not supported protocols.
Before a device can be connected, you have to check if a proper device type exists. The device type defines the service that a single device instance offers. Input and output parameter define the values that the device sends to the platform or gets from the platform. Normally a sensor has an output parameter that specifies the structure of a measurement result and an actuator has an input parameter that configurate how it will execute the task.

## Using the UI
### Create device types
You can create device type using this [wizard](https://ui.sepl.infai.org/#!/iotrepository/wizard). A device type consists of meta informations like a name and a description and services, that describe how the device work. 
A single service can be created by clicking on "add service". For example a device type "environment sensor" could have the services "temperature" and "pressure". A service consists of input and output parameters.
The service "temperature" could have the output parameter "result". The structure of the result could be a JSON object containing the measurement value and a timestamp. This format has to be declared as a [data type](https://ui.sepl.infai.org/#!/iotrepository/valuetypes/list). For example you could create a data type, called "dated_integer", to define a structure that consists of an integer and a timestamp. Then it can be easily reused later. After the data type is created, you can select it under "format".
``` json
{
    "value": 20,
    "unit": "celsius",
    "time": "2018-01-01"
}
```

### Add devices instances
[Here](https://ui.sepl.infai.org/iotrepository/devicetypes/list) you will find a list of avaiable device types. By clicking on "new instance" you can create a new device instance of this type. 

## Using HTTPS and WebSockets
## Using Python Connector Client
To use HTTPS and WebSocket you can use the [Python Connector Client](https://gitlab.wifa.uni-leipzig.de/fg-seits/connector-client). It handles the communication with the platform and helps you to create easily a gateway and to manage multiple device instances.

#### 1. Create gateways
First you have to edit the configuration file:
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

Next, you can create the gateway. Therefore you have to choose a device manager. You can use an in-memory device manager or a persistent device manager.
``` shell
from connector.client import Client
from modules.device_pool import DevicePool

connector_client = Client(DevicePool)
```

#### 2. Create device types
The needed device types have to be created before. You can create them [here](https://ui.sepl.infai.org/#!/iotrepository/wizard). 

#### 3. Create device instances
To create a device, you have to instantiate the Device class. There you need the id of the device instance, the id of the device type and a name of the device. The connector client will create the device instance on platform side automatically. 

``` shell
from connector.device import Device
device_type_id = 'iot#d66ec9bc-e37f-4f35-a788-027301aad6c2'
device_instance_name = 'Dummy Device'
device_id = "id"
device = Device(device_id, device_type_id, device_instance_name)
device.addTag('type', 'Dummy')
DevicePool.add(device)
```

## Using MQTT


## OpenHAB Integration
The [OpenHAB Connector](https://gitlab.wifa.uni-leipzig.de/fg-seits/openhabconnector) can be used, to connect an OpenHAB instance with the platform. It will detect new device types and instances and will register them automatically.


