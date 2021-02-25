package gr.ntua.ece.softeng.team6.backend.models;

import java.util.*;
import javax.persistence.*;

@Entity
public class Vehicle {

        @Id
        private String license_plate;

        @ManyToOne
        private Owner owner;

        @OneToOne
        private Vehicle_type vehicle_type;

        public Vehicle(){
        }

        /*Owner(String name){
                this.name = name;
        }
        */
        /*
        Owner(String name, String surname, String phonenumber){
                this.name = name;
                this.surname = surname;
                this.phonenumber = phonenumber;
        }
        */



        public Owner getOwner(){
                return this.owner;
        }
        public String getLicense_plate(){
                return this.license_plate;
        }
        public Vehicle_type getVehicle_type(){
                return this.vehicle_type;
        }

        public void setOwner(Owner owner){
                this.owner = owner;
        }
        public void setLicense_plate(String license_plate){
                this.license_plate = license_plate;
        }
        public void setVehicle_type(Vehicle_type vehicle_type){
                this.vehicle_type = vehicle_type;
        }

}
