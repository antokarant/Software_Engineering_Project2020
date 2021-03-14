package gr.ntua.ece.softeng.team6.backend.controllers;

import org.springframework.web.bind.annotation.*;

import gr.ntua.ece.softeng.team6.backend.models.*;

import java.util.*;

import java.text.SimpleDateFormat;

import java.text.DateFormat;

import java.text.ParseException;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.fasterxml.jackson.dataformat.csv.CsvMapper;

import com.fasterxml.jackson.dataformat.csv.CsvSchema;

import java.sql.Timestamp;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
class SpecsController {

private final SessionRepository repository;
private final VehicleRepository vehicleRepository;
private final Vehicle_typeRepository vehicle_typeRepository;
private final StationRepository stationRepository;
private final ChargerRepository chargerRepository;


SpecsController(SessionRepository repository, VehicleRepository vehicleRepository, Vehicle_typeRepository vehicle_typeRepository, StationRepository stationRepository, ChargerRepository chargerRepository){
        this.vehicleRepository = vehicleRepository;
        this.vehicle_typeRepository = vehicle_typeRepository;
        this.repository = repository;
        this.stationRepository = stationRepository;
        this.chargerRepository = chargerRepository;

}

private class ChargingSessions {
ChargingSessions(){
}
public Integer SessionIndex;
public Integer SessionID;
public String StartedOn;
public String FinishedOn;
public Integer Protocol;
public Float EnergyDelivered;
public String Payment;
public String VehicleType;

public String toString(){//overriding the toString() method
  return SessionIndex+" "+SessionID+" "+StartedOn+" "+FinishedOn+" "+Protocol+" "+EnergyDelivered+" "+Payment+" "+VehicleType;
 }

}

private class SessionsPerPoint {

SessionsPerPoint(){
}
SessionsPerPoint(int t){
        NumberOfChargingSessions = t;
}
public Integer Station;
public Integer Point;
public String PointOperator;
public String RequestTimestamp;
public String PeriodFrom;
public String PeriodTo;
public Integer NumberOfChargingSessions;


public List<ChargingSessions> ChargingSessionsList;

}

private class SessionsPerPointcsv {

SessionsPerPointcsv(){
}
SessionsPerPointcsv(int t){
        NumberOfChargingSessions = t;
}
public Integer Station;
public Integer Point;
public String PointOperator;
public String RequestTimestamp;
public String PeriodFrom;
public String PeriodTo;
public Integer NumberOfChargingSessions;


public String ChargingSessionsList;


}

@GetMapping("/SessionsPerPoint/{stationid}/{pointid}/{yyyymmdd_from}/{yyyymmdd_to}")
String sesperpoint(@PathVariable Integer stationid,@PathVariable Integer pointid, @PathVariable String yyyymmdd_from,@PathVariable String yyyymmdd_to,@RequestParam(required = false) String format){

        String startdate = yyyymmdd_from;
        String enddate = yyyymmdd_to;

        List<NameOnly> nameonly = repository.perPoint(stationid, pointid, startdate, enddate);
        if(nameonly.size()==0) {
                return null;
        }
        SessionsPerPoint sessionsperpoint = new SessionsPerPoint();
        sessionsperpoint.Point = nameonly.get(0).getCharger_id();
        sessionsperpoint.Station = nameonly.get(0).getCharger_station_id();
        sessionsperpoint.PeriodFrom = startdate;
        sessionsperpoint.PeriodTo = enddate;
        sessionsperpoint.NumberOfChargingSessions = nameonly.size();
        Station station = stationRepository.findById(stationid).get();
        sessionsperpoint.PointOperator = station.getOperator();
        sessionsperpoint.RequestTimestamp = new Timestamp(System.currentTimeMillis()) + "";
        List<ChargingSessions> chargingsessionslist = new ArrayList<ChargingSessions>();
        for(int i=0; i<nameonly.size(); i++) {
                ChargingSessions chargingsession = new ChargingSessions();
                chargingsession.SessionIndex = i;
                chargingsession.SessionID = nameonly.get(i).getId();
                chargingsession.StartedOn = nameonly.get(i).getStart_date() + " " +nameonly.get(i).getStart_time();
                chargingsession.FinishedOn = nameonly.get(i).getEnd_date() + " " +nameonly.get(i).getEnd_time();
                chargingsession.Protocol = nameonly.get(i).getProtocol();
                chargingsession.EnergyDelivered = nameonly.get(i).getEnergy_delivered();
                chargingsession.Payment = nameonly.get(i).getPayment_method();

                String license_plate = nameonly.get(i).getVehicle_license_plate();
                Vehicle vehicle = vehicleRepository.findById(license_plate).get();
                Vehicle_type vehicle_type = vehicle_typeRepository.findById(vehicle.getVehicle_type().getId()).get();

                chargingsession.VehicleType = vehicle_type.getBrand() + " " + vehicle_type.getModel();

                chargingsessionslist.add(chargingsession);

        }
        sessionsperpoint.ChargingSessionsList = chargingsessionslist;


        String jsonResult;
        try{
                ObjectMapper objectMapper = new ObjectMapper();
                jsonResult = objectMapper.writeValueAsString(sessionsperpoint);
        }catch(Exception e){
                return null;
        }

        if(format == null || format.equals("json")){
                return jsonResult;

        }
        else if(format.equals("csv")){
                SessionsPerPointcsv sessionscsv = new SessionsPerPointcsv();
                ;

                sessionscsv.Station = sessionsperpoint.Station;
                sessionscsv.Point = sessionsperpoint.Point;
                sessionscsv.PointOperator = sessionsperpoint.PointOperator;
                sessionscsv.RequestTimestamp = sessionsperpoint.RequestTimestamp;
                sessionscsv.PeriodFrom = sessionsperpoint.PeriodFrom;
                sessionscsv.PeriodTo = sessionsperpoint.PeriodTo;
                sessionscsv.NumberOfChargingSessions = sessionsperpoint.NumberOfChargingSessions;
                sessionscsv.ChargingSessionsList =sessionsperpoint.ChargingSessionsList.toString();


                CsvMapper csvMapper = new CsvMapper();
                String csvResult;
                CsvSchema schema = csvMapper.schemaFor(SessionsPerPoint.class);
                try{
                csvResult = csvMapper.writer(schema.withUseHeader(true)).writeValueAsString(sessionscsv);
                        return csvResult;
                }catch(Exception e){
                        e.printStackTrace();
                        return null;
                }

        }
        else
                return null;

        //return sessionsperpoint;


}



private class SessionsSummary {
SessionsSummary(){
}
public Integer PointID;
public Integer PointSessions;
public Float EnergyDelivered;
public String toString(){//overriding the toString() method
  return PointID+" "+PointSessions+" "+EnergyDelivered;
 }


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
private class SessionsPerStationcsv {

SessionsPerStationcsv(){
}
SessionsPerStationcsv(int t){
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


public String SessionsSummaryList;


}


@GetMapping("/SessionsPerStation/{stationid}/{yyyymmdd_from}/{yyyymmdd_to}")
String sesperstation(@PathVariable Integer stationid, @PathVariable String yyyymmdd_from,@PathVariable String yyyymmdd_to,@RequestParam(required = false) String format){

        String startdate = yyyymmdd_from;
        String enddate = yyyymmdd_to;

        List<NameOnly> nameonly = repository.perStation(stationid, startdate, enddate);
        if(nameonly.size()==0) {
                //return new SessionsPerStation(0);
                return null;
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

        String jsonResult;
        try{
                ObjectMapper objectMapper = new ObjectMapper();
                jsonResult = objectMapper.writeValueAsString(sessionsperstation);
        }catch(Exception e){
                return null;
        }

        if(format == null || format.equals("json")){
                return jsonResult;

        }
        else if(format.equals("csv")){
                SessionsPerStationcsv sessionscsv = new SessionsPerStationcsv();
                ;

                sessionscsv.StationID = sessionsperstation.StationID;
                sessionscsv.Operator = sessionsperstation.Operator;
                sessionscsv.RequestTimestamp = sessionsperstation.RequestTimestamp;
                sessionscsv.PeriodFrom = sessionsperstation.PeriodFrom;
                sessionscsv.PeriodTo = sessionsperstation.PeriodTo;
                sessionscsv.TotalEnergyDelivered = sessionsperstation.TotalEnergyDelivered;
                sessionscsv.NumberOfChargingSessions = sessionsperstation.NumberOfChargingSessions;
                sessionscsv.NumberOfActivePoints = sessionsperstation.NumberOfActivePoints;
                sessionscsv.SessionsSummaryList =sessionsperstation.SessionsSummaryList.toString();


                CsvMapper csvMapper = new CsvMapper();
                String csvResult;
                CsvSchema schema = csvMapper.schemaFor(SessionsPerStation.class);
                try{
                csvResult = csvMapper.writer(schema.withUseHeader(true)).writeValueAsString(sessionscsv);
                        return csvResult;
                }catch(Exception e){
                        e.printStackTrace();
                        return null;
                }

        }
        else
                return null;
        //return sessionsperstation;

}


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

   public String toString(){//overriding the toString() method
     return SessionIndex+" "+SessionID+" "+EnergyProvider+" "+StartedOn+" "+FinishedOn+" "+EnergyDelivered+" "+PricePolicyRef+" "+CostPerKWh+" "+SessionCost;
    }

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

   private class SessionsPerEVcsv{
   SessionsPerEVcsv(){
   }
   SessionsPerEVcsv(int t){
           NumberOfVehicleChargingSessions = t;
   }
   public String VehicleID;
   public String RequestTimestamp;
   public String PeriodFrom;
   public String PeriodTo;
   public Float TotalEnergyConsumed;
   public Integer NumberOfVisitedPoints;
   public Integer NumberOfVehicleChargingSessions;

   public String VehicleChargingSessionsList;

   }

   @GetMapping("/SessionsPerEV/{vehicleid}/{yyyymmdd_from}/{yyyymmdd_to}")
   String sesperev(@PathVariable String vehicleid, @PathVariable String yyyymmdd_from,@PathVariable String yyyymmdd_to,@RequestParam(required = false) String format){

           String startdate = yyyymmdd_from;
           String enddate = yyyymmdd_to;

           Float totalenergy = 0f;

           List<NameOnly> nameonly = repository.perEV(vehicleid, startdate, enddate);
           if(nameonly.size()==0) {
                   return null;
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


           String jsonResult;
           try{
                   ObjectMapper objectMapper = new ObjectMapper();
                   jsonResult = objectMapper.writeValueAsString(sessionsperev);
           }catch(Exception e){
                   return null;
           }

           if(format == null || format.equals("json")){
                   return jsonResult;

           }
           else if(format.equals("csv")){
                   SessionsPerEVcsv sessionscsv = new SessionsPerEVcsv();
                   ;

                   sessionscsv.VehicleID = sessionsperev.VehicleID;
                   sessionscsv.RequestTimestamp = sessionsperev.RequestTimestamp;
                   sessionscsv.PeriodFrom = sessionsperev.PeriodFrom;
                   sessionscsv.PeriodTo = sessionsperev.PeriodTo;
                   sessionscsv.TotalEnergyConsumed = sessionsperev.TotalEnergyConsumed;
                   sessionscsv.NumberOfVisitedPoints = sessionsperev.NumberOfVisitedPoints;
                   sessionscsv.NumberOfVehicleChargingSessions = sessionsperev.NumberOfVehicleChargingSessions;
                   sessionscsv.VehicleChargingSessionsList =sessionsperev.VehicleChargingSessionsList.toString();


                   CsvMapper csvMapper = new CsvMapper();
                   String csvResult;
                   CsvSchema schema = csvMapper.schemaFor(SessionsPerEV.class);
                   try{
                   csvResult = csvMapper.writer(schema.withUseHeader(true)).writeValueAsString(sessionscsv);
                           return csvResult;
                   }catch(Exception e){
                           e.printStackTrace();
                           return null;
                   }

           }
           else
                   return null;

          // return sessionsperev;

   }



private class SessionsPerProvider {

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

public String toString(){//overriding the toString() method
  return ProviderName+","+StationID+","+SessionID+","+VehicleID+","+StartedOn+","+FinishedOn+","+EnergyDelivered+","+PricePolicyRef+","+CostPerKWh+","+TotalCost;
 }


}

@GetMapping("/SessionsPerProvider/{providerid}/{yyyymmdd_from}/{yyyymmdd_to}")
String sesperprovider(@PathVariable String providerid,@PathVariable String yyyymmdd_from, @PathVariable String yyyymmdd_to,@RequestParam(required = false) String format){

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

        if(result.size() == 0)
                return null;

        String jsonResult;
        try{
                ObjectMapper objectMapper = new ObjectMapper();
                jsonResult = objectMapper.writeValueAsString(result);
        }catch(Exception e){
                return null;
        }

        if(format == null || format.equals("json")){
                return jsonResult;

        }
        else if(format.equals("csv")){
                String csvResult =  "ProviderName,StationID,SessionID,VehicleID,StartedOn,FinishedOn,EnergyDelivered,PricePolicyRef,CostPerKWh,TotalCost";
                for(int i=0;i<result.size();i++){
                        csvResult += "\n" + result.get(i);

                }
                return csvResult;
        }
        else
                return null;

        //return result;

}


}
