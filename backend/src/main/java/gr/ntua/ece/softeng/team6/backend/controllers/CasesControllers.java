package gr.ntua.ece.softeng.team6.backend.controllers;

import org.springframework.web.bind.annotation.*;

import gr.ntua.ece.softeng.team6.backend.models.*;

import java.util.*;

import java.text.SimpleDateFormat;

import java.text.DateFormat;

import java.text.ParseException;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.sql.Timestamp;
import java.util.Date;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
class CasesController {

private final SessionRepository repository;
private final VehicleRepository vehicleRepository;
private final Vehicle_typeRepository vehicle_typeRepository;
private final StationRepository stationRepository;
private final ChargerRepository chargerRepository;


CasesController(SessionRepository repository, VehicleRepository vehicleRepository, Vehicle_typeRepository vehicle_typeRepository, StationRepository stationRepository, ChargerRepository chargerRepository){
        this.vehicleRepository = vehicleRepository;
        this.vehicle_typeRepository = vehicle_typeRepository;
        this.repository = repository;
        this.stationRepository = stationRepository;
        this.chargerRepository = chargerRepository;

}

private class StationsNear {
StationsNear(){
}
public Integer station_id;
public String location;
public String working_hours;
public String phone;
public Float average_rating;
public String operator;
public Integer operational_chargers;
public Integer cars_waiting;
public Float average_charging_time;
public Float wait_time_estimation;


}


@GetMapping("/StationsNear/{stateTarget}")
List<StationsNear> stationsNear(@PathVariable String stateTarget){

        List<Station> allstations = stationRepository.findAll();
        List<StationsNear> result = new LinkedList<StationsNear>();



        for(int i=0; i<allstations.size(); i++) {

                Station currentStation = allstations.get(i);
                String state = "";
                String location = currentStation.getLocation();
                char[] ch = location.toCharArray();
                for(int j=0;j<ch.length;j++){
                        if(!(ch[j] == ','))
                                continue;
                        else{
                                state = ch[j+2] +""+ ch[j+3];
                                break;
                        }
                }
                if(!(state.equals(stateTarget)))
                        continue;

                StationsNear newStation = new StationsNear();

                newStation.station_id = currentStation.getId();
                newStation.location = currentStation.getLocation();
                newStation.working_hours = currentStation.getWorking_hours();
                newStation.phone = currentStation.getPhone();
                newStation.average_rating = currentStation.getAverage_rating();
                newStation.operator = currentStation.getOperator();
                newStation.operational_chargers = currentStation.getOperational_chargers();
                newStation.cars_waiting = currentStation.getCars_waiting();
                newStation.average_charging_time = currentStation.getAverage_charging_time();
                newStation.wait_time_estimation = (currentStation.getCars_waiting() * currentStation.getAverage_charging_time()) / currentStation.getOperational_chargers();

                result.add(newStation);


        }
        if(result.size() == 0)
                return null;

        return result;

}

private class DayResults{
DayResults(){}
        public String date;
        public Integer sessions;
        public Float income;
        public Float energy;


}

@GetMapping("/ChargesStation/{station}/{datefrom}/{dateto}")
List<DayResults> chargesStation(@PathVariable Integer station, @PathVariable String datefrom,@PathVariable String dateto){

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate start = LocalDate.parse(datefrom, formatter2);
        LocalDate end = LocalDate.parse(dateto, formatter2);
        List<NameOnly> nameonly = repository.perStation(station,datefrom,dateto);

        List<DayResults> result = new LinkedList<DayResults>();

        for(int i=0; i<(ChronoUnit.DAYS.between(start, end)+1);i++){
                DayResults dayresults = new DayResults();
                dayresults.date = start.plusDays(i) + "";
                dayresults.sessions = 0;
                dayresults.energy = 0f;
                dayresults.income = 0f;
                result.add(dayresults);

        }


        for(int i=0; i<nameonly.size(); i++) {
                String helpdate = nameonly.get(i).getStart_date();
                LocalDate sesDate = LocalDate.parse(helpdate, formatter2);
                result.get((int) ChronoUnit.DAYS.between(start, sesDate) ).energy += nameonly.get(i).getEnergy_delivered();
                result.get((int) ChronoUnit.DAYS.between(start, sesDate) ).sessions ++;
                result.get((int) ChronoUnit.DAYS.between(start, sesDate) ).income += nameonly.get(i).getTotal_cost();



        }

        return result;

}

@GetMapping("/VehicleStation/{station}/{vehicle}/{datefrom}/{dateto}")
String vehicleStation(@PathVariable Integer station, @PathVariable String vehicle, @PathVariable String datefrom,@PathVariable String dateto){

        List<NameOnly> nameonly = repository.vehicleStation(station,vehicle,datefrom,dateto);
        Integer transactions = nameonly.size();
        Float expense = 0f;
        Float energy = 0f;




        for(int i=0; i<nameonly.size(); i++) {
                energy += nameonly.get(i).getEnergy_delivered();
                expense += nameonly.get(i).getTotal_cost();
        }

        return "{\"energy\" : " + energy + ", \"expense\" : "+ expense + ", \"transactions\": " + transactions + "}";

}

@GetMapping("/ReportStation/{station}/{datefrom}/{dateto}")
String reportStation(@PathVariable Integer station, @PathVariable String datefrom,@PathVariable String dateto){

        List<NameOnly> nameonly = repository.perStation(station,datefrom,dateto);
        Integer transactions = nameonly.size();
        Float income = 0f;
        Float energy = 0f;




        for(int i=0; i<nameonly.size(); i++) {
                energy += nameonly.get(i).getEnergy_delivered();
                income += nameonly.get(i).getTotal_cost();
        }

        return "{\"energy\" : " + energy + ", \"income\" : "+ income + ", \"transactions\": " + transactions + "}";

}



@PostMapping("/ChargeEV")
Session chargeEV(@RequestBody ChargingHelp chargingHelp){

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("HH:mm:ss");
        SimpleDateFormat formatter3 = new SimpleDateFormat("HH:mm:ss");

        Integer count = repository.stationPointSessionCount(chargingHelp.charger_station_id,chargingHelp.charger_id) + 1;

        Session newSession = new Session();
        SessionId session_id = new SessionId();

        session_id.setId(count);

        Charger charger = new Charger();
        ChargerId charger_id = new ChargerId();
        charger_id.setId(chargingHelp.charger_id);
        Station station = new Station();
        station.setId(chargingHelp.charger_station_id);
        charger_id.setStation(station);
        charger.setCharger_id(charger_id);

        session_id.setCharger(charger);

        newSession.setSession_id(session_id);

        newSession.setRating(chargingHelp.rating);

        newSession.setCost_per_kwh(chargingHelp.cost_per_kwh);

        Vehicle newVehicle = new Vehicle();
        newVehicle.setLicense_plate(chargingHelp.license_plate);
        newSession.setVehicle(newVehicle);

        newSession.setTotal_cost(chargingHelp.total_cost);

        newSession.setStart_date(java.sql.Date.valueOf(formatter.format(LocalDate.now())));

        newSession.setStart_time(java.sql.Time.valueOf(formatter2.format(LocalTime.now())));

        newSession.setEnd_date(java.sql.Date.valueOf(formatter.format(LocalDate.now())));

        Calendar cal = Calendar.getInstance();
        cal.setTime(java.sql.Time.valueOf(formatter2.format(LocalTime.now())));
        cal.add(Calendar.MINUTE, 30);

        newSession.setEnd_time(java.sql.Time.valueOf(formatter3.format(cal.getTime())));

        newSession.setEnergy_delivered(chargingHelp.energy_delivered);

        newSession.setProtocol(chargingHelp.protocol);

        newSession.setPayment_method(chargingHelp.payment_method);

        newSession.setPrice_policy(chargingHelp.price_policy);

        return  repository.save(newSession);

        //return "Session complete thank you";

}

}
class ChargingHelp{

public Float rating;
public Float cost_per_kwh;
public Float total_cost;
public String payment_method;
public Float energy_delivered;
public Integer protocol;
public Integer price_policy;
public Integer charger_id;
public Integer charger_station_id;
public String license_plate;


public Float getRating() {
        return rating;
}


public void setRating(Float rating) {
        this.rating = rating;
}


public Float getCost_per_kwh() {
        return cost_per_kwh;
}


public void setCost_per_kwh(Float cost_per_kwh) {
        this.cost_per_kwh = cost_per_kwh;
}


public Float getTotal_cost() {
        return total_cost;
}


public void setTotal_cost(Float total_cost) {
        this.total_cost = total_cost;
}


public String getPayment_method() {
        return payment_method;
}


public void setPayment_method(String payment_method) {
        this.payment_method = payment_method;
}


public Float getEnergy_delivered() {
        return energy_delivered;
}


public void setEnergy_delivered(Float energy_delivered) {
        this.energy_delivered = energy_delivered;
}


public Integer getProtocol() {
        return protocol;
}


public void setProtocol(Integer protocol) {
        this.protocol = protocol;
}


public Integer getPrice_policy() {
        return price_policy;
}


public void setPrice_policy(Integer price_policy) {
        this.price_policy = price_policy;
}


public Integer getCharger_id() {
        return charger_id;
}


public void setCharger_id(Integer charger_id) {
        this.charger_id = charger_id;
}


public Integer getCharger_station_id() {
        return charger_station_id;
}


public void setCharger_station_id(Integer charger_station_id) {
        this.charger_station_id = charger_station_id;
}


public String getLicense_plate() {
        return license_plate;
}


public void setLicense_plate(String license_plate) {
        this.license_plate = license_plate;
}

}
