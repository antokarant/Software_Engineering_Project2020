package gr.ntua.ece.softeng.team6.backend.controllers;

import org.springframework.web.bind.annotation.*;

import gr.ntua.ece.softeng.team6.backend.models.*;

import java.util.*;

@RestController
class VehicleController{

        private final VehicleRepository repository;

        VehicleController(VehicleRepository repository){
                this.repository = repository;

        }

        @GetMapping("/vehicles")
        List<Vehicle> all(){
                return repository.findAll();
        }
        @PostMapping("/vehicles")
        Vehicle newVehicle(@RequestBody Helper helper){
                Vehicle newVehicle = new Vehicle();
                //newVehicle.getVehicle_type().setVehicle_type_id(vehicletemp.getVehicle_type_id());
                //newVehicle.setLicense_plate(vehicletemp.getLicense_plate());
                /*Owner ownertemp = new Owner();
                ownertemp.setName("veskou");
                ownertemp.setId(1);
                ownertemp.setPhonenumber("695271728");
                newVehicle.setOwner(ownertemp);*/
                newVehicle.setLicense_plate(helper.getLicense_plate());
                Owner owner = new Owner();
                owner.setId(helper.getOwner_id());
                newVehicle.setOwner(owner);
                Vehicle_type vehicle_type = new Vehicle_type();
                vehicle_type.setId(helper.getVehicle_type_id());
                newVehicle.setVehicle_type(vehicle_type);
                return  repository.save(newVehicle);

        }

        @GetMapping("/vehicles/{id}")
        Vehicle one(@PathVariable String id) {
          return repository.findById(id)
            .orElseThrow(() -> new VehicleNotFoundException(id));
        }




        @DeleteMapping("/vehicles/{id}")
        void deleteOwner(@PathVariable String id) {
          repository.deleteById(id);
        }



        private class Helper{

                

                private String license_plate;

                private Integer owner_id;

                private String vehicle_type_id;

                public Helper(){
                }


        	public Integer getOwner_id() {
        		return owner_id;
        	}


        	public void setOwner_id(Integer owner_id) {
        		this.owner_id = owner_id;
        	}


        	public String getVehicle_type_id() {
        		return vehicle_type_id;
        	}


        	public void setVehicle_type_id(String vehicle_type_id) {
        		this.vehicle_type_id = vehicle_type_id;
        	}



        	public String getLicense_plate() {
        		return license_plate;
        	}

        	public void setLicense_plate(String license_plate) {
        		this.license_plate = license_plate;
        	}

        }
}
