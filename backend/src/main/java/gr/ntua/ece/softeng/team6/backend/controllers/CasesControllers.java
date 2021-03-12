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

}

/*@GetMapping("/SessionsPerPoint/{stationID}/{pointID}/{yyyymmdd_from}/{yyyymmdd_to}")
   List<Session> specsfirst(@PathVariable Integer stationID, @PathVariable Integer pointID, @PathVariable String yyyymmdd_from, @PathVariable String yyyymmdd_to){
        List<Session> result = new LinkedList<Session>();
                try{
                        DateFormat df = new SimpleDateFormat("yyyyMMdd");
                        DateFormat df2 = new SimpleDateFormat("yyyy-MM-dd");
                        Date start = df.parse(yyyymmdd_from);
                        Date end = df.parse(yyyymmdd_to);

                        List<Session> list = repository.findAll();
                        for(Session s : list){
                                if(s.getStart_date() == null || s.getStart_date().isEmpty())
                                        continue;
                                Date current = df2.parse(s.getStart_date());
                                if(current.after(start) && current.before(end)  && s.getSession_id().getCharger().getCharger_id().getStation().getId() == stationID && s.getSession_id().getCharger().getCharger_id().getId() == pointID)
                                        result.add(s);
                        }
                }catch(ParseException e){
                        e.printStackTrace();
                }

        return result;

   }*/


/*private class SessionsSummary {
SessionsSummary(){
}
public Integer PointID;
public Integer PointSessions;
public Float EnergyDelivered;


}

private class SessionsPerStation {

SessionsPerStation(){
}
SessionsPerStation(int t){
        NumberOfChargingSessions = t;
}
public Integer StationID;
public String Operator;
public String RequestTimestamp;
public String PeriodFrom;
public String PeriodTo;
public Float TotalEnergyDelivered;
public Integer NumberOfChargingSessions;
public Integer NumberOfActivePoints;


public List<SessionsSummary> SessionsSummaryList;


}

@GetMapping("/SessionsPerStation/{stationid}/{yyyymmdd_from}/{yyyymmdd_to}")
SessionsPerStation sesperstation(@PathVariable Integer stationid, @PathVariable String yyyymmdd_from,@PathVariable String yyyymmdd_to){

        String startdate = yyyymmdd_from;
        String enddate = yyyymmdd_to;

        List<NameOnly> nameonly = repository.perStation(stationid, startdate, enddate);
        if(nameonly.size()==0) {
                return new SessionsPerStation(0);
        }

        //List<Integer> allpoints = new ArrayList<Integer>();

        Float totalenergy = 0f;

        //<Integer> diffpoints = new HashSet<Integer>(allpoints);
        int differentPoints = chargerRepository.countofchargers(stationid);


        Station station = stationRepository.findById(stationid).get();


        List<SessionsSummary> sessionssummarylist = new ArrayList<SessionsSummary>();
        for (int i = 0; i < differentPoints; i++) {
                SessionsSummary emptySessionsSummary = new SessionsSummary();
                emptySessionsSummary.PointID = i+1;
                emptySessionsSummary.PointSessions = 0;
                emptySessionsSummary.EnergyDelivered = 0f;
                sessionssummarylist.add(emptySessionsSummary);
        }

        Map<Integer, Integer> pointtoindex = new HashMap<Integer, Integer>();
        Set<Integer> visited = new HashSet<Integer>();

        SessionsPerStation sessionsperstation = new SessionsPerStation();
        sessionsperstation.StationID = nameonly.get(0).getCharger_station_id();
        sessionsperstation.PeriodFrom = startdate;
        sessionsperstation.PeriodTo = enddate;
        sessionsperstation.NumberOfChargingSessions = nameonly.size();
        sessionsperstation.Operator = station.getOperator();
        sessionsperstation.RequestTimestamp = new Timestamp(System.currentTimeMillis()) + "";
        //sessionsperstation.NumberOfActivePoints = station.getOperational_chargers();


        for(int i=0; i<nameonly.size(); i++) {
                if(!visited.contains(nameonly.get(i).getCharger_id())){
                        pointtoindex.put(nameonly.get(i).getCharger_id(),pointtoindex.size());
                        visited.add(nameonly.get(i).getCharger_id());
                        sessionssummarylist.get(pointtoindex.get(nameonly.get(i).getCharger_id())).PointID = nameonly.get(i).getCharger_id();


                }


                totalenergy += nameonly.get(i).getEnergy_delivered();
                sessionssummarylist.get(pointtoindex.get(nameonly.get(i).getCharger_id())).PointSessions += 1;
                sessionssummarylist.get(pointtoindex.get(nameonly.get(i).getCharger_id())).EnergyDelivered += nameonly.get(i).getEnergy_delivered();

        }
        sessionsperstation.SessionsSummaryList = sessionssummarylist;
        sessionsperstation.TotalEnergyDelivered = totalenergy;
        sessionsperstation.NumberOfActivePoints = pointtoindex.size();


        return sessionsperstation;

}

/*@GetMapping("/SessionsPerStation/{stationID}/{yyyymmdd_from}/{yyyymmdd_to}")
   List<Session> specsecond(@PathVariable Integer stationID,@PathVariable String yyyymmdd_from, @PathVariable String yyyymmdd_to){
        List<Session> result = new LinkedList<Session>();
                try{
                        DateFormat df = new SimpleDateFormat("yyyyMMdd");
                        DateFormat df2 = new SimpleDateFormat("yyyy-MM-dd");
                        Date start = df.parse(yyyymmdd_from);
                        Date end = df.parse(yyyymmdd_to);

                        List<Session> list = repository.findAll();
                        for(Session s : list){
                                if(s.getStart_date() == null || s.getStart_date().isEmpty())
                                        continue;
                                Date current = df2.parse(s.getStart_date());
                                if(current.after(start) && current.before(end)  && s.getSession_id().getCharger().getCharger_id().getStation().getId() == stationID)
                                        result.add(s);
                        }
                }catch(ParseException e){
                        e.printStackTrace();
                }

        return result;

   }*/
/*
   private class VehicleChargingSessions {
   VehicleChargingSessions(){
   }
   public Integer SessionIndex;
   public Integer SessionID;
   public String EnergyProvider;
   public String StartedOn;
   public String FinishedOn;
   public Float EnergyDelivered;
   public Integer PricePolicyRef;
   //public Integer Protocol;
   public Float CostPerKWh;
   public Float SessionCost;



   }

   private class SessionsPerEV {

   SessionsPerEV(){
   }
   SessionsPerEV(int t){
           NumberOfVehicleChargingSessions = t;
   }
   public String VehicleID;
   public String RequestTimestamp;
   public String PeriodFrom;
   public String PeriodTo;
   public Float TotalEnergyConsumed;
   public Integer NumberOfVisitedPoints;
   public Integer NumberOfVehicleChargingSessions;

   public List<VehicleChargingSessions> VehicleChargingSessionsList;


   }

   @GetMapping("/SessionsPerEV/{vehicleid}/{yyyymmdd_from}/{yyyymmdd_to}")
   SessionsPerEV sesperev(@PathVariable String vehicleid, @PathVariable String yyyymmdd_from,@PathVariable String yyyymmdd_to){
           /*String startdate = "0000-00-00";
              String enddate = "0000-00-00";
              try{
                   DateFormat df = new SimpleDateFormat("yyyyMMdd");
                   Date start = df.parse(yyyymmdd_from);
                   Date end = df.parse(yyyymmdd_to);
                   startdate = df.format(start);
                   enddate = df.format(end);
              }catch(ParseException e) {
                   e.printStackTrace();
              }*/
        /*   String startdate = yyyymmdd_from;
           String enddate = yyyymmdd_to;

           Float totalenergy = 0f;

           List<NameOnly> nameonly = repository.perEV(vehicleid, startdate, enddate);
           if(nameonly.size()==0) {
                   return new SessionsPerEV(0);
           }
           SessionsPerEV sessionsperev = new SessionsPerEV();

           sessionsperev.VehicleID = nameonly.get(0).getVehicle_license_plate();
           sessionsperev.RequestTimestamp = new Timestamp(System.currentTimeMillis()) + "";
           sessionsperev.PeriodFrom = startdate;
           sessionsperev.PeriodTo = enddate;
           sessionsperev.NumberOfVehicleChargingSessions = nameonly.size();

           Set<Pair<Integer,Integer>> visitedpoints = new HashSet<Pair<Integer, Integer>>();





           List<VehicleChargingSessions> vehiclechargingsessionslist = new ArrayList<VehicleChargingSessions>();
           for(int i=0; i<nameonly.size(); i++) {

                   Pair<Integer,Integer> pair = new Pair<Integer,Integer>(nameonly.get(i).getCharger_station_id(),nameonly.get(i).getCharger_id());
                   visitedpoints.add(pair);

                   totalenergy += nameonly.get(i).getEnergy_delivered();

                   VehicleChargingSessions vehiclechargingsession = new VehicleChargingSessions();


                   vehiclechargingsession.SessionIndex = i;
                   vehiclechargingsession.SessionID = nameonly.get(i).getId();
                   vehiclechargingsession.StartedOn = nameonly.get(i).getStart_date() + " " +nameonly.get(i).getStart_time();
                   vehiclechargingsession.FinishedOn = nameonly.get(i).getEnd_date() + " " +nameonly.get(i).getEnd_time();
                   //vehiclechargingsession.Protocol = nameonly.get(i).getProtocol();
                   vehiclechargingsession.EnergyDelivered = nameonly.get(i).getEnergy_delivered();
                   vehiclechargingsession.PricePolicyRef = nameonly.get(i).getPrice_policy();
                   vehiclechargingsession.CostPerKWh = nameonly.get(i).getCost_per_kwh();
                   vehiclechargingsession.SessionCost = nameonly.get(i).getTotal_cost();


                   Station station = stationRepository.findById(nameonly.get(i).getCharger_station_id()).get();
                   vehiclechargingsession.EnergyProvider = station.getEnergy_provider();




                   vehiclechargingsessionslist.add(vehiclechargingsession);

           }
           sessionsperev.TotalEnergyConsumed = totalenergy;
           sessionsperev.NumberOfVisitedPoints = visitedpoints.size();
           sessionsperev.VehicleChargingSessionsList = vehiclechargingsessionslist;

           return sessionsperev;

   }


/*@GetMapping("/SessionsPerEV/{vehicleid}/{yyyymmdd_from}/{yyyymmdd_to}")
List<Session> specsthird(@PathVariable String vehicleID,@PathVariable String yyyymmdd_from, @PathVariable String yyyymmdd_to){
        List<Session> result = new LinkedList<Session>();
        /*  try{
                DateFormat df = new SimpleDateFormat("yyyyMMdd");
                DateFormat df2 = new SimpleDateFormat("yyyy-MM-dd");
                Date start = df.parse(yyyymmdd_from);
                Date end = df.parse(yyyymmdd_to);

                List<Session> list = repository.findAll();
                for(Session s : list){
                        if(s.getStart_date() == null || s.getStart_date().isEmpty())
                                continue;
                        Date current = df2.parse(s.getStart_date());
                        if(s.getVehicle().getLicense_plate() == null || s.getVehicle().getLicense_plate().isEmpty())
                                continue;
                        if(current.after(start) && current.before(end)  && s.getVehicle().getLicense_plate().equals(vehicleID))
                                result.add(s);
                }
           }catch(ParseException e){
                e.printStackTrace();
           }

        return result;

}*/

/*private class SessionsPerProvider {

SessionsPerProvider(){
}

public String ProviderName;
public Integer StationID;
public Integer SessionID;
public String VehicleID;
public String StartedOn;
public String FinishedOn;
public Float EnergyDelivered;
public Integer PricePolicyRef;
//public Integer Protocol;
public Float CostPerKWh;
public Float TotalCost;


}

@GetMapping("/SessionsPerProvider/{providerid}/{yyyymmdd_from}/{yyyymmdd_to}")
List<SessionsPerProvider> sesperprovider(@PathVariable String providerid,@PathVariable String yyyymmdd_from, @PathVariable String yyyymmdd_to){

        List<SessionsPerProvider> result = new LinkedList<SessionsPerProvider>();

        try{
                DateFormat df = new SimpleDateFormat("yyyyMMdd");
                DateFormat df2 = new SimpleDateFormat("yyyy-MM-dd");
                Date start = df.parse(yyyymmdd_from);
                Date end = df.parse(yyyymmdd_to);

                List<Session> list = repository.findAll();
                for(Session s : list) {
                        if(s.getStart_date() == null || s.getStart_date() == null)
                                continue;
                        Date current = s.getStart_date();
                        if(s.getSession_id().getCharger().getCharger_id().getStation().getEnergy_provider() == null || s.getSession_id().getCharger().getCharger_id().getStation().getEnergy_provider().isEmpty())
                                continue;
                        if(current.after(start) && current.before(end)  && s.getSession_id().getCharger().getCharger_id().getStation().getEnergy_provider().equals(providerid)){
                                SessionsPerProvider sessionsperprovider = new SessionsPerProvider();
                                sessionsperprovider.ProviderName = providerid;
                                sessionsperprovider.StationID = s.getSession_id().getCharger().getCharger_id().getStation().getId();
                                sessionsperprovider.SessionID = s.getSession_id().getId();
                                sessionsperprovider.VehicleID = s.getVehicle().getLicense_plate();
                                sessionsperprovider.StartedOn = s.getStart_date() + " " + s.getStart_time();
                                sessionsperprovider.FinishedOn = s.getEnd_date() + " " + s.getEnd_time();
                                sessionsperprovider.EnergyDelivered = s.getEnergy_delivered();
                                sessionsperprovider.PricePolicyRef = s.getPrice_policy();
                                //sessionsperprovider.Protocol = s.getProtocol();
                                sessionsperprovider.CostPerKWh = s.getCost_per_kwh();
                                sessionsperprovider.TotalCost = s.getTotal_cost();
                                result.add(sessionsperprovider);
                        }
                }
        }catch(ParseException e) {
                e.printStackTrace();
        }

        return result;

}


}*/
