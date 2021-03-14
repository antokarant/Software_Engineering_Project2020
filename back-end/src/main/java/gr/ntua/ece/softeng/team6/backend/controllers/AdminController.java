package gr.ntua.ece.softeng.team6.backend.controllers;

import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.sql.Timestamp;

import java.io.FileReader;
import java.util.Iterator;
import java.util.Map;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.*;
import com.opencsv.CSVReader;

import org.springframework.stereotype.Controller;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.simple.parser.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.codehaus.jackson.type.TypeReference;
import gr.ntua.ece.softeng.team6.backend.models.*;


import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
class AdminController {


private final UserRepository repository;
private final SessionRepository repositorys;

AdminController(UserRepository repository, SessionRepository repositorys){
        this.repository = repository;
        this.repositorys = repositorys;
}

@PostMapping("/admin/usermod/{username}/{password}")
void usermod(@PathVariable String username, @PathVariable String password){
        boolean exists = repository.existsById(username);
        if(exists) {
                User updateuser = repository.findById(username).get();
                updateuser.setPassword(password);
                repository.save(updateuser);
        }
        else{
                User newuser = new User();
                newuser.setRole("USER");
                newuser.setUsername(username);
                newuser.setPassword(password);
                repository.save(newuser);

        }
        return;
}

@GetMapping("/admin/users/{username}")
User users(@PathVariable String username){
        return repository.findById(username)
               .orElseThrow(()->new UserNotFoundException(username));

}

@PostMapping("/admin/system/sessionsupd")
public String fileUpload(@RequestParam("file") MultipartFile file) {
        int counter = 0;
        int counter2 = 0;
        if (file.isEmpty()) {
                return "empty";        //new ModelAndView("status", "message", "Please select a file and try again");

        }

        try {
                // read and write the file to the selected location-
                byte[] bytes = file.getBytes();
                System.out.println(bytes);
                Path path = Paths.get(file.getOriginalFilename());
                Files.write(path, bytes);
                String [] nextLine;
                CSVReader reader = new CSVReader(new FileReader(path.normalize().toString()));
                Map<String, Integer> myMap = new HashMap<String, Integer>();

                //JSONParser jsonP = new JSONParser();
                //FileReader reader = new FileReader("./userFiles/testaki.json");
                //Object json = jsonP.parse(reader);

                //ObjectMapper objectMapper = new ObjectMapper();
                //Session newSession = objectMapper.readValue(new File("./userFiles/testaki.json"), Session.class);

                //Object obj = new JSONParser().parse(new FileReader("./userFiles/testaki.json"));
                //JSONObject jo = (JSONObject) obj;
                // Session newSession = new Session();
                try{
                        nextLine = reader.readNext();

                        for(int i = 0; i < nextLine.length; i++) {
                                myMap.put(nextLine[i],i);
                                //System.out.println(nextLine[i]);

                        }
                }catch(Exception e) {
                        return "oops bad luck check first line";
                }
                while ((nextLine = reader.readNext()) != null) {
                        try{
                                // nextLine[] is an array of values from the line
                                Session newSession = new Session();
                                SessionId session_id = new SessionId();

                                if(nextLine[myMap.get("id")]!=null)
                                        session_id.setId(Integer.valueOf(nextLine[myMap.get("id")]));
                                else
                                        session_id.setId(-1);

                                Charger charger = new Charger();
                                ChargerId charger_id = new ChargerId();

                                if(nextLine[myMap.get("id")]!=null)
                                        charger_id.setId(Integer.valueOf(nextLine[myMap.get("charger_id")]));
                                else
                                        charger_id.setId(-1);

                                Station station = new Station();

                                if(nextLine[myMap.get("id")]!=null)
                                        station.setId(Integer.valueOf(nextLine[myMap.get("charger_station_id")]));
                                else
                                        station.setId(-1);

                                charger_id.setStation(station);
                                charger.setCharger_id(charger_id);

                                session_id.setCharger(charger);

                                newSession.setSession_id(session_id);

                                if(nextLine[myMap.get("id")]!=null)
                                        newSession.setRating(Float.valueOf(nextLine[myMap.get("rating")]));
                                else
                                        newSession.setRating(-1f);

                                if(nextLine[myMap.get("id")]!=null)
                                        newSession.setCost_per_kwh(Float.valueOf(nextLine[myMap.get("cost_per_kwh")]));
                                else
                                        newSession.setCost_per_kwh(-1f);

                                Vehicle newVehicle = new Vehicle();
                                newVehicle.setLicense_plate(nextLine[myMap.get("license_plate")]);
                                newSession.setVehicle(newVehicle);

                                if(nextLine[myMap.get("id")]!=null)
                                        newSession.setTotal_cost(Float.valueOf(nextLine[myMap.get("total_cost")]));
                                else
                                        newSession.setTotal_cost(-1f);

                                newSession.setStart_date(java.sql.Date.valueOf(nextLine[myMap.get("start_date")]));

                                newSession.setStart_time(java.sql.Time.valueOf(nextLine[myMap.get("start_time")]));

                                newSession.setEnd_date(java.sql.Date.valueOf(nextLine[myMap.get("end_date")]));

                                newSession.setEnd_time(java.sql.Time.valueOf(nextLine[myMap.get("end_time")]));

                                if(nextLine[myMap.get("id")]!=null)
                                        newSession.setEnergy_delivered(Float.valueOf(nextLine[myMap.get("energy_delivered")]));
                                else
                                        newSession.setEnergy_delivered(-1f);

                                if(nextLine[myMap.get("id")]!=null)
                                        newSession.setProtocol(Integer.valueOf(nextLine[myMap.get("protocol")]));
                                else
                                        newSession.setProtocol(-1);

                                newSession.setPayment_method(nextLine[myMap.get("payment_method")]);

                                if(nextLine[myMap.get("id")]!=null)
                                        newSession.setPrice_policy(Integer.valueOf(nextLine[myMap.get("price_policy")]));
                                else
                                        newSession.setPrice_policy(-1);

                                counter++;
                                repositorys.save(newSession);
                        }catch(Exception e) {
                                System.out.println("oops could not import check your files");
                        }
                        counter2++;
                }



                //Files.delete(path);

        } catch (IOException e) {
                e.printStackTrace();
        }

        return "{\"SessionsInUploadedFile\" : " +counter2 + ", \"SessionsImported\" : "+ counter + ", \"TotalSessionsInDatabase\": " + repositorys.count() + "}";       //new ModelAndView("status", "message", "File Uploaded sucessfully");

}
}
