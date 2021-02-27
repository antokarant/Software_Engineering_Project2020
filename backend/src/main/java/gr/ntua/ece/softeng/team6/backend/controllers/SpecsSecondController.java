package gr.ntua.ece.softeng.team6.backend.controllers;

import org.springframework.web.bind.annotation.*;

import gr.ntua.ece.softeng.team6.backend.models.*;

import java.util.*;

import java.text.SimpleDateFormat;

import java.text.DateFormat;

import java.text.ParseException;

@RestController
class SpecsSecondController{

        private final SessionRepository repository;

        SpecsSecondController(SessionRepository repository){
                this.repository = repository;

        }

        @GetMapping("/SessionsPerStation/{station_id}/{yyyymmdd_from}/{yyyymmdd_to}")
        List<Session> specsecond(@PathVariable Integer station_id,@PathVariable String yyyymmdd_from, @PathVariable String yyyymmdd_to){
                List<Session> result = new LinkedList<Session>();
                try{
                        DateFormat df = new SimpleDateFormat("yyyyMMdd");
                        DateFormat df2 = new SimpleDateFormat("yyyy-MM-dd");
                        Date start = df.parse(yyyymmdd_from);
                        Date end = df.parse(yyyymmdd_to);

                        List<Session> list = repository.findAll();
                        for(Session s : list){
                                Date current = df2.parse(s.getStart_date());
                                if(current.after(start) && current.before(end)  && s.getSession_id().getCharger().getCharger_id().getStation().getId() == station_id)
                                        result.add(s);
                        }
                }catch(ParseException e){
                        e.printStackTrace();
                }

                return result;

        }


}
