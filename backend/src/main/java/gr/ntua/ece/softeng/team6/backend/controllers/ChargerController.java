package gr.ntua.ece.softeng.team6.backend.controllers;

import org.springframework.web.bind.annotation.*;

import gr.ntua.ece.softeng.team6.backend.models.*;

import java.util.*;

@RestController
class ChargerController{

        private final ChargerRepository repository;

        ChargerController(ChargerRepository repository){
                this.repository = repository;

        }

        @GetMapping("/chargers")
        List<Charger> all(){
                return repository.findAll();
        }
        @PostMapping("/chargers")
        Charger newCharger(@RequestBody Helper helper){
                Charger newCharger = new Charger();
                ChargerId charger_id = new ChargerId();

                charger_id.setId(helper.getId());

                Station station = new Station();
                station.setId(helper.getStation_id());
                charger_id.setStation(station);

                newCharger.setOperational(helper.getOperational());

                newCharger.setCharger_id(charger_id);

                Charger_type Charger_type = new Charger_type();
                Charger_type.setId(helper.getCharger_type_id());
                newCharger.setCharger_type(Charger_type);

                return  repository.save(newCharger);

        }




        private class Helper{

        

                private Integer id;

                private Integer station_id;

                private Integer charger_type_id;

                private String operational;

                public Helper(){
                }


        	public Integer getId() {
        		return id;
        	}


        	public void setId(Integer id) {
        		this.id = id;
        	}


        	public Integer getStation_id() {
        		return station_id;
        	}


        	public void setStation_id(Integer station_id) {
        		this.station_id = station_id;
        	}


        	public Integer getCharger_type_id() {
        		return charger_type_id;
        	}


        	public void setCharger_type_id(Integer charger_type_id) {
        		this.charger_type_id = charger_type_id;
        	}


        	public String getOperational() {
        		return operational;
        	}


        	public void setOperational(String operational) {
        		this.operational = operational;
        	}

        }
}
