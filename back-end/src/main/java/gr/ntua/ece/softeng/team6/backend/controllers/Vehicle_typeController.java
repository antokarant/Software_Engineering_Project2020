package gr.ntua.ece.softeng.team6.backend.controllers;

import org.springframework.web.bind.annotation.*;

import gr.ntua.ece.softeng.team6.backend.models.*;

import java.util.*;

@RestController
class Vehicle_typeController{

        private final Vehicle_typeRepository repository;

        Vehicle_typeController(Vehicle_typeRepository repository){
                this.repository = repository;

        }

        @GetMapping("/vehicle_types")
        List<Vehicle_type> all(){
                return repository.findAll();
        }
        @PostMapping("/vehicle_types")
        Vehicle_type newVehicle_type(@RequestBody Vehicle_type newVehicle_type){
                return repository.save(newVehicle_type);
        }
}
