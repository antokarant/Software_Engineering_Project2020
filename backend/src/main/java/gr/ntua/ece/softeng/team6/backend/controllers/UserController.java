package gr.ntua.ece.softeng.team6.backend.controllers;

import org.springframework.web.bind.annotation.*;

import gr.ntua.ece.softeng.team6.backend.models.*;

import java.util.*;

@RestController
class UserController{

        private final UserRepository repository;

        UserController(UserRepository repository){
                this.repository = repository;

        }

        @GetMapping("/users")
        List<User> all(){
                return repository.findAll();
        }
        @PostMapping("/users")
        User newUser(@RequestBody User newUser){
                return repository.save(newUser);
        }


        @DeleteMapping("/users/{id}")
        void deleteUser(@PathVariable String username) {
          repository.deleteById(username);
        }

}
