# Analytics
## Historical Data 
To persist device or flow data, a data export has to be created. The following examples will use the export id "export" and a device that measures temperature.

### Setup
A new export can be created on the [UI](https://ui.sepl.infai.org/#!/data/export/dialog). There you can choose if you want to persist data coming direct form a sensor or data coming from an analytics flow. If you choose device data, you will have to select a device instance and a service where the data should be saved. 
Then you have to set the time path where the timestamp is set. Next, you will have to specify the data of the service that should be saved, because a sensor could measure multiple values. The value has to be set as a path which can be found in the device type.
For example you could select the device "temperatur sensor 1" and the service "temperature". The service could specify an output, called "temp_result" wich could be a JSON object containing the measured value "value", the timestamp "time", and the unit "unit".
To get the timestamp, you would put the time path "value.temp_result.time". To get the value, that should be exported, you would put "value.temp_result.value".
After the export got created, the ID and the URL to acces the data will be displayed. Diese kann wiederum über die Export API verwendet werden, um die Daten zu lesen.

### Write data
The data will be written with the first incoming data point.

### Read data
The data can be read with the export id. For example, to get all saved data, you can send the following request.
```shell
curl -X GET 'https://api.sepl.infai.org/db/measurement/export' 
```

The results can be filtered with query parameters. You can filter by time or by value. To filter by time, you can set the parameter "time.lte" to query data with timestamps less then or equal than the value or "time.gte" for greater than or equal the value. The time value has to be in the ISO 8601 format.
With the same structure, you can filter by values of the device. That means, that the saved temperature data can be used with the term "temp.lte" and "temp.gte".

```shell
curl -X GET 'https://api.sepl.infai.org/db/measurement/export?limit=10&time.gte=2018-03-22T14:37:36.707677952Z' 
```

## Realtime transformations
Incoming data can be transformed directly by using flows on the data input stream.

### Flows 
A [flow](https://ui.sepl.infai.org/#!/data/flows) can be used on the data streams, e.g. incoming sensor data. It consists at least of one operator, but multiple operators can be connected to a flow. For example you could simply calculate the difference of the incoming data point with the last data point. This could be useful, of you get the whole energy consumption data of a sensor but would like to use the current rate of consumption.

### Operators
An [operator](https://ui.sepl.infai.org/#!/data/operatorrepo) transforms one data point to a new one. For example the operator "sum" would calculate the sum of a data point with the last data point. Therefore it would have to save the last data point temporariliy. Also an operator could transform the data structure, if you want to change a JSON value or change an integer value to an float value. Beside the standard operators, you can write your own operator by using a [Java library](https://gitlab.wifa.uni-leipzig.de/fg-seits/operatorlib).

```java 
import org.project.operators.Stream;
import com.jayway.jsonpath.JsonPathException;
import org.project.operators.Helper;
import org.project.operators.OperatorInterface;

public class Operator {

    public static void main(String[] args) {
        Stream stream  = new Stream();
        ValueSum valueSum = new ValueSum();
        stream.start(valueSum);
    }
}

public class ValueSum implements OperatorInterface {

    private String inputValue;
    private String outputSum;
    private static double currentValue = 0;

    public ValueSum(){}

    public ValueSum(String inputValue, String outputSum){
        this.inputValue = inputValue;
        this.outputSum = outputSum;
    }

    public String run(String s) {
        try {
            currentValue += new Double(Helper.getStreamValue(s, getInputValue()));
            s = Helper.setAnalyticsValue(s, getOutputSum(), (Math.round(currentValue * 1000.0) / 1000.0));
        } catch (JsonPathException e) {
            System.out.println(e.getMessage());
        }
        return s;
    }

    private String getInputValue() {
        if (this.inputValue == null || inputValue.equals("")) {
            // Name Umgebungsvariable z.B. INPUT_VALUE wird definiert in der UI
            inputValue = Helper.getEnv("INPUT_VALUE", "value.reading.value");
        }
        return inputValue;
    }

    private String getOutputSum() {
        if (outputSum == null || outputSum.equals("")) {
            // Name der Umgebungsvariable z.B. OUTPUT_SUM wird definiert in der UI
            outputSum = Helper.getEnv("OUTPUT_SUM", "sum");
        }
        return outputSum;
    }
}
```
[SUM Operator Repository]()
