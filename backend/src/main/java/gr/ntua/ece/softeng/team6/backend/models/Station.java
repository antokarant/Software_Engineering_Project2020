package gr.ntua.ece.softeng.team6.backend.models;

import java.util.*;
import javax.persistence.*;

@Entity
public class Station {

        @Id
        private Integer id;

        @Column(unique = false, nullable = true, length = 255)
        private String location;

        @Column(unique = false, nullable = true, length = 32)
        private String working_hours;

        @Column(unique = false, nullable = true, length = 32)
        private String phone;

        @Column(unique = false, nullable = true, length = 32)
        private Float average_rating;

        @Column(unique = false, nullable = true, length = 32)
        private String operator;

        @Column(unique = false, nullable = true, length = 32)
        private Integer operational_chargers;

        @Column(unique = false, nullable = true, length = 32)
        private Integer cars_waiting;

        @Column(unique = false, nullable = true, length = 32)
        private Float average_charging_time;

        public Station(){
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





	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}


	public String getLocation() {
		return location;
	}


	public void setLocation(String location) {
		this.location = location;
	}


	public String getWorking_hours() {
		return working_hours;
	}


	public void setWorking_hours(String working_hours) {
		this.working_hours = working_hours;
	}


	public String getPhone() {
		return phone;
	}


	public void setPhone(String phone) {
		this.phone = phone;
	}


	public Float getAverage_rating() {
		return average_rating;
	}


	public void setAverage_rating(Float average_rating) {
		this.average_rating = average_rating;
	}


	public String getOperator() {
		return operator;
	}


	public void setOperator(String operator) {
		this.operator = operator;
	}


	public Integer getOperational_chargers() {
		return operational_chargers;
	}


	public void setOperational_chargers(Integer operational_chargers) {
		this.operational_chargers = operational_chargers;
	}


	public Integer getCars_waiting() {
		return cars_waiting;
	}


	public void setCars_waiting(Integer cars_waiting) {
		this.cars_waiting = cars_waiting;
	}


	public Float getAverage_charging_time() {
		return average_charging_time;
	}


	public void setAverage_charging_time(Float average_charging_time) {
		this.average_charging_time = average_charging_time;
	}


}
