package gr.ntua.ece.softeng.team6.backend.models;

import java.util.*;
import javax.persistence.*;

@Entity
public class Charger_type {

        @Id
        private Integer id;

        @Column(unique = false, nullable = true, length = 32)
        private String title;

        @Column(unique = false, nullable = true, length = 32)
        private Integer power;

        public Charger_type(){
        }

        /*Owner(String title){
                this.title = title;
        }
        */
        /*
        Owner(String title, String surtitle, String power){
                this.title = title;
                this.surtitle = surtitle;
                this.power = power;
        }
        */



        public Integer getId(){
                return this.id;
        }
        public String gettitle(){
                return this.title;
        }
        public Integer getpower(){
                return this.power;
        }

        public void setId(Integer id){
                this.id = id;
        }
        public void settitle(String title){
                this.title = title;
        }
        public void setpower(Integer power){
                this.power = power;
        }

}
