package gr.ntua.ece.softeng.team6.backend.controllers;

import org.springframework.web.bind.annotation.*;

import gr.ntua.ece.softeng.team6.backend.models.*;

import java.util.*;

@RestController
class OwnerController{

        private final OwnerRepository repository;

        OwnerController(OwnerRepository repository){
                this.repository = repository;

        }

        @GetMapping("/owners")
        List<Owner> all(){
                return repository.findAll();
        }
        @PostMapping("/owners")
        Owner newOwner(@RequestBody Owner newOwner){
                return repository.save(newOwner);
        }

        @GetMapping("/owners/{id}")
        Owner one(@PathVariable Integer id) {
          return repository.findById(id)
            .orElseThrow(() -> new OwnerNotFoundException(id));
        }

        @GetMapping("/antonis/test")
        List<String> hello(){

                List<Owner> list2 = repository.findAll();
                List<String> list = new ArrayList<String>();
                for(int i=0; i<list2.size(); i++){
                        list.add(list2.get(i).getName());
                }
                return list;

        }


        @PutMapping("/owners/{id}")
        Owner replaceOwner(@RequestBody Owner newOwner, @PathVariable Integer id) {
          return repository.findById(id)
              .map(Owner -> {
              Owner.setName(newOwner.getName());
              return repository.save(Owner);
            }).orElseThrow(() -> new OwnerNotFoundException(id));
        }


        @DeleteMapping("/owners/{id}")
        void deleteOwner(@PathVariable Integer id) {
          repository.deleteById(id);
        }

}
