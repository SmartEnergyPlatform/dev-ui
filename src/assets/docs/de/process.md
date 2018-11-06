# Prozesse
## Design
Im [Designer](https://ui.sepl.infai.org/#!/processes/designer) können Prozesse modelliert und angepasst werden.

### Aufbau
Ein Prozess muss immer aus einem "Startevent" und einem "Endevent" bestehen. Eine Aktion wird über ein "Task" Objekt ausgeführt. Innerhalb der Aktion muss ein Gerätetyp und einer seiner Services ausgewählt werden. Das physische Gerät, welches die Aktion ausführen soll, wird in der Prozessbereitstellung ausgewählt.

![Prozessdesign](assets/img/process1.png)

### Zeit
Über ein "Timer" Event kann der Prozess zeitlich gesteuert werden. Dabei kann ausgewählt werden, ob der Prozess an der Stelle des Events ein bestimmtes Zeitintervall warten soll (Duration), an einem bestimmten Datum ausgeführt (Date) oder über ein Zeitintervall wiederholt werden soll (Cycle).
![Prozessdesign](assets/img/process2.png)

### Lanes
![Prozessdesign](assets/img/process3.png)

### Bedingungen
![Prozessdesign](assets/img/process4.png)

## Bereitstellung und Ausführung
Um den Prozess auszuführen muss er zunächst im Prozessverzeichnis bereitgestellt werden. In diesem Schritt werden die Geräteinstanzen der ausgewählten Gerätetypen ausgewählt. Dabei können nur Geräte, welche online sind, ausgewählt werden. Falls ein ausführender Service eines Aktuators verwendet wurde, müssen anschließend noch die Inputparameter eingetragen werden.
Unter [Ausführung](https://ui.sepl.infai.org/#!/processes/deployments) kann der Prozess anschließend durchgeführt werden.

## Überwachung
Nachdem der Prozess ausgeführt wurde, wird sein Status unter ["Überwachung"](https://ui.sepl.infai.org/#!/processes/monitor) angezeigt.
