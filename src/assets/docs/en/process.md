# Processes
## Design
You can design and adjust processes in the [process designer](https://ui.sepl.infai.org/#!/processes/designer).

### Structure
The process is based on the BPMN 2.0 specification. That means the process must have a start event and an end event. A task object represents an action, for example query data of an device or performing an action on an actuator. Furthermore you can use other BPMN specifications like time events or lanes.
The process is meant to be abstract. This means you have to use device types and not physically existent devices, because devices do not have to be connected all the time and also you want to be able to share processes with other people which shall use them with their own devices.
![Prozessdesign](assets/img/process1.png)

### Zeit
In order to use time conditions in your process, you can add timer events like the "Timer Intermediate Catch Event" that can be used within the process. There you have the possiblities to set a duration where the process will wait, to set a cycle where the process will loop or to set a date where the following actions will be carried out.
![Prozessdesign](assets/img/process2.png)

### Lanes
![Prozessdesign](assets/img/process3.png)

### Tasks
#### Device task
A device task can be created by using a task object and selecting a device type by clicking on the "Use IoT Device-Type" button. There you can select a device type, which can be either a sensor or an actuator. If it is an sensor, the task will only have output variables which will contain the result of this particual service. If it is an actuator, it will also have output parameters which will contain the status of the performed action and maybe input parameters which will contain the configuration of the service. 
The button "Edit Input" is used to set the values for the input parameters, which can also be overwritten in the deployment step. The button "Select Output-Variables" is used to rename the name of output variables. These are important if you want to reference the results of a task in a condition.

#### Data aggregation task
If you want to use historic data in your process, you will have to create data aggregation task by clicking on the button "Add data analysis". In the following dialog you can set the aggregation method, e.g. mean or sum, which will be used to aggregate the data. Also you can specify which data should be aggregated. For example if you set the time interval to 15 minutes, the task will aggregate the data of the past 15 minutes, beginning from the process start timestamp.
![Prozessdesign](assets/img/data_task.png)

### Conditions
![Prozessdesign](assets/img/process4.png)
To use conditions, you have to create a gateway with outgoing objects. Then you can specify the condition on the single outgoing arrows by selecting "Expression" as condition type. The expression must have the format ${condition} where the condition uses process variables and operators like "==", "<", ">", "<=", ">=", "&&", "||". For example a condition can look like "${temperature > 25}".

## Deployment 
If the process is designed and you want to run it, you will first have to deploy it, to select the device instances and maybe change the configurations within the process. 
This will happen after you click on "Deploy" in the process repository.
Under [Deployments](https://ui.sepl.infai.org/#!/processes/deployments) you will then see the processes that are ready to run. If you click on "Run" the process will get started.
![Prozessdesign](assets/img/deploy.png)

## Monitor
After the process got selected to run, you can watch his status in the [monitor](https://ui.sepl.infai.org/#!/processes/monitor).

## Example
For example if you want to design a process where the data of an sensor is used as a condition to perform an action on an actuator, you can follow these steps:

### 1. Get data from sensor
First you have to create a start event and a task to query real time data of the sensor. Then select a device type and a service by clicking on "Use IoT Device-Type". For example you would select the device type "ZWay Thermostat" and the service "temperatur". If you click on "Select Output-Variables", you can rename the variable which will contain the result of the task. This can be helpful if you want to use the results of multiple tasks in a condition. 
![Prozessdesign](assets/img/example_1.png)

### 2. Create a gateway and the conditions
Next, you have to create a gateway and the single conditions. Therefore you have to create the different routes with an empty task. Then you click on one arrow and select "Expression" as Condition Type in the sidebar. If the output variable name would be "result", you could create two routes depending on the temperatur: ${result > 25} and ${result < 25>}.
![Prozessdesign](assets/img/example_2.png)


### 3. Create the tasks depending on the condition and the end event 
Finally, you select again a device type and service of an actuator. Mostly the actuator will need input parameters that specify how the actuator will work. For example if you click on "Edit Input" you can set the input parameters. 
![Prozessdesign](assets/img/example_3.png)

### 4. Deployment
Now the process design is finished and you can deploy it. In the deployment step you have to select the device instance. You have to select it there because devices are not always online and the processes are meant to be abstract in order to share them with other people. 
Also you can change the time configuration for time events, the input parameters of the device type, if you want to change the configuration of the process design.