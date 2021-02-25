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
        Vehicle newVehicle(@RequestBody Vehicle newVehicle){
                return repository.save(newVehicle);
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

}
