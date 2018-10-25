# Getting Started
## Herstellerübergreifende Integration smarter Geräte
Auf Basis der Smart Energy Platform ist es möglich weit mehr als 3500 unterschiedliche smarte Geräte, wie z. B. intelligente Messsysteme, Lichtsteuerung und Heizungsthermostate, die mit Sensoren und Aktoren ausgestattet sind, herstellerübergreifend zu integrieren und deren Dienste kombiniert zu nutzen. Für die Datenübertragung zwischen smarten Geräten und der Plattform werden weitverbreitete Kommunikationsprotokolle, wie z. B. HTTP, WebSockets, MQTT und CoAP, unterstützt. Durch die Bereitstellung leichtgewichtiger und flexibel einsetzbarer Konnektoren können ganze Netzwerke, bspw. Smart Home Hubs auf Basis von ZigBee oder Z-Wave, bestehende Smart-Home-Plattformen (z. B. openHAB), einzelne Geräte (z. B. Smartphone) oder auch Maker-Projekte auf Grundlage von Raspberry Pi oder Arduino Mikrocontrollern angebunden und virtuell abgebildet werden. Dabei besteht, je nach verwendetem Kommunikationsprotokoll, die Möglichkeit, neue smarte Geräte innerhalb von Netzwerken automatisiert zu finden und auf der Smart Energy Platform zu registrieren, sodass der Konfigurations- bzw. Administrationsaufwand möglichst gering gehalten wird. Ein komfortables Gerätemanagement sorgt darüber hinaus dafür, dass Sie den Überblick über Ihre smarten Geräte behalten, d.h. diese organisieren und verwalten können, um z. B. Geräte zu Räumen oder anderen logischen Einheiten zuzuordnen.

## Daten historisch und in Echtzeit analysieren
Smarte Geräte können in kurzer Zeit eine große Menge an Daten erfassen und übertragen. Doch wie lassen sich diese Daten in Form von Informationen sowohl für Anwender als auch für Unternehmen nutzbar machen? Die Smart Energy Plattform bietet hierfür eine leistungsfähige und erweiterbare Analyseumgebung, die sowohl Auswertungen großer Datenmengen in Echtzeit als auch auf Basis historischer Daten, z. B. für Aggregationen, ermöglicht. Darüber hinaus lassen sich Daten aus unterschiedlichen Quellen miteinander vernetzen, um bspw. Korrelationsanalysen durchzuführen. In diesem Kontext können des Weiteren Regeln zur Erkennung von Ereignissen definiert und auf Datenströmen angewendet werden, wodurch sich veränderte Umgebungsbedingungen detektieren lassen. All diese Aspekte tragen dazu bei, dass die Smart Energy Plattform dem Nutzer nicht nur isolierte Informationen bereitstellt, sondern Rückschlüsse auf ganze Kontexte zulässt.

## Smarte Geräte und Daten miteinander vernetzen
Um das volle Potenzial der kombinierten Nutzung smarter Geräte auszuschöpfen, bietet die Smart Energy Platform die Möglichkeit diese mittels Prozessen miteinander zu vernetzen und regelbasiert zu steuern. Unter Prozessen sind Verkettungen von Ereignissen, Regeln, Entscheidungen und Diensten zu verstehen, deren Ausführung zur Erreichung eines bestimmten Ziels dient (z. B. Heimautomatisierung). Hierfür wird ein graphisches Werkzeug bereitgestellt, welches es ohne erforderliche Programmierkenntnisse per „Drag & Drop“ erlaubt, einfache oder auch komplexere automatisierte Abläufe zu entwerfen. Somit ist es z. B. möglich erfasste Sensordaten auszuwerten, die daraus gewonnen Informationen zur Ablaufsteuerung eines Prozesses zu nutzen und auf dieser Basis Aktionen (bspw. Licht und Heizung an-/abschalten) auszulösen.

## Aufbau
![Aufbau](assets/img/aufbau.png)

### Prozesse
Geräte werden standardisiert über das BPMN Modell gesteuert. 

### Analytics
Die Gerätedaten können entweder in Echtzeit oder historisch analysiert werden. Zum Beipsiel können im Dashboard die Echtzeitwerte angezeigt werden oder über die Storage API historische Werte ausgelesen werden. 

### IoT Repository
Geräte werden im IoT Respository verwaltet und können über verschiedene Wege mit der Platform verbunden werden.
