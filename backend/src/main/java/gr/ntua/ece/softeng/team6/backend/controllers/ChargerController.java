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
        Charger newCharger(@RequestBody Helper_two helper_two){
                Charger newCharger = new Charger();
                ChargerId charger_id = new ChargerId();

                charger_id.setId(helper_two.getId());

                Station station = new Station();
                station.setId(helper_two.getStation_id());
                charger_id.setStation(station);

                newCharger.setOperational(helper_two.getOperational());

                newCharger.setCharger_id(charger_id);

                Charger_type Charger_type = new Charger_type();
                Charger_type.setId(helper_two.getCharger_type_id());
                newCharger.setCharger_type(Charger_type);

                return  repository.save(newCharger);

        }


}

        class Helper_two{



                private Integer id;

                private Integer station_id;

                private Integer charger_type_id;

                private String operational;


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
