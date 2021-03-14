package gr.ntua.ece.softeng.team6.backend.controllers;

import org.springframework.web.bind.annotation.*;

import gr.ntua.ece.softeng.team6.backend.models.*;

import java.util.*;

@RestController
class StationController{

        private final StationRepository repository;

        StationController(StationRepository repository){
                this.repository = repository;

        }

        @GetMapping("/stations")
        List<Station> all(){
                return repository.findAll();
        }
        @PostMapping("/stations")
        Station newStation(@RequestBody Station newStation){
                return repository.save(newStation);
        }
}
