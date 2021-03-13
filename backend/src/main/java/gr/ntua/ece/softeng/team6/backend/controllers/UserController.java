package gr.ntua.ece.softeng.team6.backend.controllers;

import org.springframework.web.bind.annotation.*;

import gr.ntua.ece.softeng.team6.backend.models.*;

import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
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
        @GetMapping("/users/{username}")
        String userRole(@PathVariable String username){
                try{
                        User user = repository.findById(username).get();
                        return user.getRole();
                }
                catch(Exception e){
                        return "error";
                }
        }
        @PostMapping("/users")
        User newUser(@RequestBody User newUser){
                return repository.save(newUser);
        }


        @DeleteMapping("/users/{username}")
        void deleteUser(@PathVariable String username) {
          repository.deleteById(username);
        }

}
