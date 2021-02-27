package gr.ntua.ece.softeng.team6.backend.models;

import java.util.*;
import javax.persistence.*;

@Entity
public class Owner {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        @Column(unique = false, nullable = false, length = 32)
        private String name;

        @Column(unique = false, nullable = true, length = 32)
        private String phone;

        public Owner(){
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



        public Integer getId(){
                return this.id;
        }
        public String getName(){
                return this.name;
        }
        public String getPhone(){
                return this.phone;
        }

        public void setId(Integer id){
                this.id = id;
        }
        public void setName(String name){
                this.name = name;
        }
        public void setPhone(String phone){
                this.phone = phone;
        }

}
