package gr.ntua.ece.softeng.team6.backend.controllers;

import org.springframework.web.bind.annotation.*;

import gr.ntua.ece.softeng.team6.backend.models.*;

import java.util.*;

@RestController
class HelpingController{

        private final UserRepository repository;
        private final SessionRepository repositorys;

        HelpingController(UserRepository repository, SessionRepository repositorys){
                this.repository = repository;
                this.repositorys = repositorys;
        }

        @GetMapping("/admin/healthcheck")
        String healthcheck(){
                String result;
                try{
                        List<User> test= repository.findAll();
                        result = "\"status\":\"OK\"";

                }catch(Exception x){
                        result = "\"status\":\"failed\"";

                }
                return result;
        }
        @PostMapping("/admin/resetsessions")
        String resetsessions(){
                String result;
                try{
                        repository.deleteAll();
                        repositorys.deleteAll();
                        User newuser = new User();
                        newuser.setUsername("admin");
                        newuser.setPassword("petrol4ever");
                        newuser.setRole("ADMIN");
                        repository.save(newuser);

                        result = "\"status\":\"OK\"";

                }catch(Exception x){
                        result = "\"status\":\"failed\"";

                }
                return result;
        }


}
