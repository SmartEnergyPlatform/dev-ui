# Analytics
## Historische Daten 
Um Sensordaten persistent zu speichern, muss ein Export eingerichtet werden. Die folgenden Beispiele verwenden dafür den Export mit der ID "123" und ein Gerät, welches Temperaturdaten misst.

### Export einrichten
Über die [UI](https://ui.sepl.infai.org/#!/data/export/dialog) kann ein neuer Export angelegt werden. Dazu müssen zunächst ein Gerät und ein Service ausgewählt werden. Zum Beispiel wird das Gerät "Temperatursensor_1" und der Service "temperature" ausgewählt. Danach wird festgelegt, welche Daten gespeichert werden sollen. Die Werte werde über die Pfade festgelegt, welche in den entsprechenden Gerätentypen definiert sind. Der Gerätetyp "Temperatursensor" definiert zum Beispiel in seinem Service "temperature" den Output "temp", in welchem die Daten "value", "time" und "unit" im JSON Format angegeben sind. Um die Temperaturwerte über die Eigenschaft "value" zu exportieren, wird im Exportdialog als Zeitleiste der Pfad "value.temp.time" und als Wert der Pfad "value.temp.value" angegeben. 
Nachdem der Export angelegt ist, wird die Export ID angezeigt. Diese kann wiederum über die Export API verwendet werden, um die Daten zu lesen.

### Daten schreiben
Die Daten werden automatisch beim erstmaligen Senden von Sensordaten in der Datenbank gespeichert. 

### Daten lesen
Über die ID können die Daten anschließend ausgelesen werden. Um zum Beipsiel die gesamten Daten aus dem Export mit der ID "123" auszugeben kann der folgende Request verwendet werden.
```shell
curl -X GET 'https://api.sepl.infai.org/db/measurement/123' 
```

Über Query Parameter kann die Ergebnismenge zusätzlich eingeschränkt werden. Dabei kann man den Zeitstempel der Daten als auch die jeweiligen Werten des Sensors verwenden. 
Für den Zeitstempel können die Parameter "time.lte" und "time.gte" verwendet, welche jeweils nach Werten mit einem Zeitstempel kleiner gleich oder größer gleich filtern.
Der Zeitstempel wird dafür im ISO 8601 Format angegeben. Um nach Sensordaten zu filtern, wird dieselbe Struktur verwendet. Das heißt auf den anfangs festgelegten Spaltenname "value" folgt entweder ".lte" oder ".gte".

```shell
curl -X GET 'https://api.sepl.infai.org/db/measurement/123?limit=10&time.gte=2018-03-22T14:37:36.707677952Z' 
```

## Echtzeitanalysen
Eingehende Sensordaten können direkt transformiert und analysiert werden. Dafür können Flows auf den Eingangsdaten angwewendet werden.

### Flows 
Ein [Flow](https://ui.sepl.infai.org/#!/data/flows) kann auf eingehende Datenströme, zum Beispiel Sensordaten, angewendet werden und besteht aus mindestens einem oder mehreren Operatoren. 

### Operatoren
Ein [Operator](https://ui.sepl.infai.org/#!/data/operatorrepo) transformiert eingehende Daten und gibt neue Daten wieder aus. Zum Beispiel berechnet der "SUM" Operator die Summe eines eingehenden Wertes mit der letzten Summe. Neben den voreingestellten Operatoren können auch eigene Operatoren mit Hilfe einer [Java Bibliothek](https://gitlab.wifa.uni-leipzig.de/fg-seits/operatorlib) geschrieben werden.

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
