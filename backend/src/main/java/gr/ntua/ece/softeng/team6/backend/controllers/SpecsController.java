package gr.ntua.ece.softeng.team6.backend.controllers;

import org.springframework.web.bind.annotation.*;

import gr.ntua.ece.softeng.team6.backend.models.*;

import java.util.*;

import java.text.SimpleDateFormat;

import java.text.DateFormat;

import java.text.ParseException;

import java.sql.Timestamp;


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

@GetMapping("/SessionsPerPoint/{stationid}/{pointid}/{yyyymmdd_from}/{yyyymmdd_to}")
SessionsPerPoint sesperpoint(@PathVariable Integer stationid,@PathVariable Integer pointid, @PathVariable String yyyymmdd_from,@PathVariable String yyyymmdd_to){
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
        String startdate = yyyymmdd_from;
        String enddate = yyyymmdd_to;

        List<NameOnly> nameonly = repository.perPoint(stationid, pointid, startdate, enddate);
        if(nameonly.size()==0) {
                return new SessionsPerPoint(0);
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

        return sessionsperpoint;

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


private class SessionsSummary {
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
           String startdate = yyyymmdd_from;
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


}
