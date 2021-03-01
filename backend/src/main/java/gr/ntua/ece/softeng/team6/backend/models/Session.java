package gr.ntua.ece.softeng.team6.backend.models;

import java.util.*;
import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Session implements Serializable{

        @EmbeddedId
        private SessionId session_id;

        @Column(unique = false, nullable = true, length = 32)
        private Float rating;

        @ManyToOne
        private Vehicle vehicle;

        @Column(unique = false, nullable = true, length = 32)
        private Float cost_per_kWh;

        @Column(unique = false, nullable = true, length = 32)
        private Float total_cost;

        @Column(unique = false, nullable = true, length = 32)
        private String payment_method;

        @Column(unique = false, nullable = true, length = 32)
        private String start_date;

        @Column(unique = false, nullable = true, length = 32)
        private String start_time;

        @Column(unique = false, nullable = true, length = 32)
        private String end_date;

        @Column(unique = false, nullable = true, length = 32)
        private String end_time;

        @Column(unique = false, nullable = true, length = 32)
        private Float energy_delivered;

        @Column(unique = false, nullable = true, length = 32)
        private Integer protocol;

        @Column(unique = false, nullable = true, length = 32)
        private Integer price_policy;


        public Session(){
        }

	public SessionId getSession_id() {
		return session_id;
	}


	public void setSession_id(SessionId session_id) {
		this.session_id = session_id;
	}


	public Float getRating() {
		return rating;
	}


	public void setRating(Float rating) {
		this.rating = rating;
	}


	public Vehicle getVehicle() {
		return vehicle;
	}


	public void setVehicle(Vehicle vehicle) {
		this.vehicle = vehicle;
	}


	public Float getCost_per_kWh() {
		return cost_per_kWh;
	}


	public void setCost_per_kWh(Float cost_per_kWh) {
		this.cost_per_kWh = cost_per_kWh;
	}


	public Float getTotal_cost() {
		return total_cost;
	}


	public void setTotal_cost(Float total_cost) {
		this.total_cost = total_cost;
	}


	public String getPayment_method() {
		return payment_method;
	}


	public void setPayment_method(String payment_method) {
		this.payment_method = payment_method;
	}


	public String getStart_date() {
		return start_date;
	}


	public void setStart_date(String start_date) {
		this.start_date = start_date;
	}


	public String getStart_time() {
		return start_time;
	}


	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}


	public String getEnd_date() {
		return end_date;
	}


	public void setEnd_date(String end_date) {
		this.end_date = end_date;
	}


	public String getEnd_time() {
		return end_time;
	}


	public void setEnd_time(String end_time) {
		this.end_time = end_time;
	}


	public Float getEnergy_delivered() {
		return energy_delivered;
	}


	public void setEnergy_delivered(Float energy_delivered) {
		this.energy_delivered = energy_delivered;
	}


	public Integer getProtocol() {
		return protocol;
	}


	public void setProtocol(Integer protocol) {
		this.protocol = protocol;
	}


	public Integer getPrice_policy() {
		return price_policy;
	}


	public void setPrice_policy(Integer price_policy) {
		this.price_policy = price_policy;
	}

}
