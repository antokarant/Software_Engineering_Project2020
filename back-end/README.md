## Συστατικά Εφαρμογής back-end
* Java, με το framework `Java-spring`
* Το package `JDBC connector`
* Apache Tomcat server
* Gradle

## Βήματα Εγκατάστασης
Σε γραμμή εντολών στην διεύθυνση του φακέλου back-end, με τις εξής εντολές:
1. `gradle clean build`
2. `./gradlew bootRun`

_Τα tests για το backend ήταν απολύτως επιτυχή. Επειδή όμως τα δεδομένα της εκάστοτε βάσης δεν είναι πάντοτε τα ίδια, έχουν συμπεριληφθεί στο source code ως σχόλια, για να λειτουργεί σωστά το εργαλείο build, και να ξεκινά η εφαρμογή. Oρισμένα ενδεικτικά αποτελέσματά τους είναι διαθέσιμα στον φάκελο [testing-results](https://github.com/antokarant/Software_Engineering_Project2020/tree/main/testing-results)._
