package gr.ntua.ece.softeng.team6.backend.controllers;

import org.springframework.web.bind.annotation.*;

import gr.ntua.ece.softeng.team6.backend.models.*;

import java.util.*;

@RestController
class Charger_typeController{

        private final Charger_typeRepository repository;

        Charger_typeController(Charger_typeRepository repository){
                this.repository = repository;

        }

        @GetMapping("/charger_types")
        List<Charger_type> all(){
                return repository.findAll();
        }
        @PostMapping("/charger_types")
        Charger_type newCharger_type(@RequestBody Charger_type newCharger_type){
                return repository.save(newCharger_type);
        }
}
