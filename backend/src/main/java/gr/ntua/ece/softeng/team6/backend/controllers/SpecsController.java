package gr.ntua.ece.softeng.team6.backend.controllers;

import org.springframework.web.bind.annotation.*;

import gr.ntua.ece.softeng.team6.backend.models.*;

import java.util.*;

import java.text.SimpleDateFormat;

import java.text.DateFormat;

import java.text.ParseException;

@RestController
class SpecsController{

        private final SessionRepository repository;

        SpecsController(SessionRepository repository){
                this.repository = repository;

        }

        @GetMapping("/SessionsPerPoint/{stationID}/{pointID}/{yyyymmdd_from}/{yyyymmdd_to}")
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

        }

        @GetMapping("/SessionsPerStation/{stationID}/{yyyymmdd_from}/{yyyymmdd_to}")
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

        }

        @GetMapping("/SessionsPerEV/{vehicleID}/{yyyymmdd_from}/{yyyymmdd_to}")
        List<Session> specsthird(@PathVariable String vehicleID,@PathVariable String yyyymmdd_from, @PathVariable String yyyymmdd_to){
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
                                if(s.getVehicle().getLicense_plate() == null || s.getVehicle().getLicense_plate().isEmpty())
                                        continue;
                                if(current.after(start) && current.before(end)  && s.getVehicle().getLicense_plate().equals(vehicleID))
                                        result.add(s);
                        }
                }catch(ParseException e){
                        e.printStackTrace();
                }

                return result;

        }

        @GetMapping("/SessionsPerProvider/{providerID}/{yyyymmdd_from}/{yyyymmdd_to}")
        List<Session> specsfourth(@PathVariable String providerID,@PathVariable String yyyymmdd_from, @PathVariable String yyyymmdd_to){
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
                                if(s.getSession_id().getCharger().getCharger_id().getStation().getEnergy_provider() == null || s.getSession_id().getCharger().getCharger_id().getStation().getEnergy_provider().isEmpty())
                                        continue;
                                if(current.after(start) && current.before(end)  && s.getSession_id().getCharger().getCharger_id().getStation().getEnergy_provider().equals(providerID))
                                        result.add(s);
                        }
                }catch(ParseException e){
                        e.printStackTrace();
                }

                return result;

        }


}
