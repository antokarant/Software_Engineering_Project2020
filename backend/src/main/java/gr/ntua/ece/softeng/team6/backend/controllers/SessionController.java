package gr.ntua.ece.softeng.team6.backend.controllers;

import org.springframework.web.bind.annotation.*;

import gr.ntua.ece.softeng.team6.backend.models.*;

import java.util.*;

@RestController
class SessionController{

        private final SessionRepository repository;

        SessionController(SessionRepository repository){
                this.repository = repository;

        }

        @GetMapping("/sessions")
        List<Session> all(){
                return repository.findAll();
        }
        @PostMapping("/sessions")
        Session newSession(@RequestBody Helper_three helper_three){
                Session newSession = new Session();
                SessionId session_id = new SessionId();

                session_id.setId(helper_three.getId());

                Charger charger = new Charger();
                ChargerId charger_id = new ChargerId();
                charger_id.setId(helper_three.getCharger_id());
                Station station = new Station();
                station.setId(helper_three.getCharger_station_id()); //htan se sxolio gia kapoio logo
                charger_id.setStation(station);
                charger.setCharger_id(charger_id);

                session_id.setCharger(charger);

                newSession.setSession_id(session_id);

                newSession.setRating(helper_three.getRating());

                newSession.setCost_per_kWh(helper_three.getCost_per_kWh());

                Vehicle newVehicle = new Vehicle();
                newVehicle.setLicense_plate(helper_three.getLicense_plate());
                newSession.setVehicle(newVehicle);

                newSession.setTotal_cost(helper_three.getTotal_cost());

                newSession.setStart_date(helper_three.getStart_date());

                newSession.setStart_time(helper_three.getStart_time());

                newSession.setEnd_date(helper_three.getEnd_date());

                newSession.setEnd_time(helper_three.getEnd_time());

                newSession.setEnergy_delivered(helper_three.getEnergy_delivered());

                newSession.setProtocol(helper_three.getProtocol());

                newSession.setPayment_method(helper_three.getPayment_method());

                newSession.setPrice_policy(helper_three.getPrice_policy());

                return  repository.save(newSession);

        }

}


        class Helper_three{


                private Integer id;

                private Integer charger_station_id;

                private Integer charger_id;

                private Float rating;

                private String license_plate;

                private Float cost_per_kWh;

                private Float total_cost;

                private String payment_method;

                private String start_date;

                private String start_time;

                private String end_date;

                private String end_time;

                private Float energy_delivered;

                private Integer protocol;

                private Integer price_policy;



        	public Integer getId() {
        		return id;
        	}


        	public void setId(Integer id) {
        		this.id = id;
        	}


        	public Integer getCharger_station_id() {
        		return charger_station_id;
        	}


        	public void setCharger_station_id(Integer charger_station_id) {
        		this.charger_station_id = charger_station_id;
        	}


        	public Integer getCharger_id() {
        		return charger_id;
        	}


        	public void setCharger_id(Integer charger_id) {
        		this.charger_id = charger_id;
        	}


        	public Float getRating() {
        		return rating;
        	}


        	public void setRating(Float rating) {
        		this.rating = rating;
        	}


        	public String getLicense_plate() {
        		return license_plate;
        	}


        	public void setLicense_plate(String license_plate) {
        		this.license_plate = license_plate;
        	}


        	public Float getCost_per_kWh() {
        		return cost_per_kWh;
        	}


        	public void setCost_per_kWh(Float cost_per_kWh) {
        		this.cost_per_kWh = cost_per_kWh;
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


        	public String getStart_date() {
        		return start_date;
        	}


        	public void setStart_date(String start_date) {
        		this.start_date = start_date;
        	}


        	public String getStart_time() {
        		return start_time;
        	}


        	public void setStart_time(String start_time) {
        		this.start_time = start_time;
        	}


        	public String getEnd_date() {
        		return end_date;
        	}


        	public void setEnd_date(String end_date) {
        		this.end_date = end_date;
        	}


        	public String getEnd_time() {
        		return end_time;
        	}


        	public void setEnd_time(String end_time) {
        		this.end_time = end_time;
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

        }
