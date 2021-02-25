package gr.ntua.ece.softeng.team6.backend.models;

import java.util.*;
import javax.persistence.*;

@Entity
public class Vehicle_type {

        @Id
        private Integer vehicle_type_id;

        @Column(unique = false, nullable = true, length = 32)
        private String brand;

        @Column(unique = false, nullable = true, length = 32)
        private String type;

        @Column(unique = false, nullable = true, length = 32)
        private Integer brand_id;

        @Column(unique = false, nullable = true, length = 32)
        private String model;

        @Column(unique = false, nullable = true, length = 32)
        private String release_year;

        @Column(unique = false, nullable = true, length = 32)
        private Integer usable_battery_size;

        @Column(unique = false, nullable = true, length = 32)
        private String variant;


        public Vehicle_type(){
        }






	/**
	* Returns value of vehicle_type_id
	* @return
	*/
	public Integer getVehicle_type_id() {
		return vehicle_type_id;
	}

	/**
	* Sets new value of vehicle_type_id
	* @param
	*/
	public void setVehicle_type_id(Integer vehicle_type_id) {
		this.vehicle_type_id = vehicle_type_id;
	}

	/**
	* Returns value of brand
	* @return
	*/
	public String getBrand() {
		return brand;
	}

	/**
	* Sets new value of brand
	* @param
	*/
	public void setBrand(String brand) {
		this.brand = brand;
	}

	/**
	* Returns value of type
	* @return
	*/
	public String getType() {
		return type;
	}

	/**
	* Sets new value of type
	* @param
	*/
	public void setType(String type) {
		this.type = type;
	}

	/**
	* Returns value of brand_id
	* @return
	*/
	public Integer getBrand_id() {
		return brand_id;
	}

	/**
	* Sets new value of brand_id
	* @param
	*/
	public void setBrand_id(Integer brand_id) {
		this.brand_id = brand_id;
	}

	/**
	* Returns value of model
	* @return
	*/
	public String getModel() {
		return model;
	}

	/**
	* Sets new value of model
	* @param
	*/
	public void setModel(String model) {
		this.model = model;
	}

	/**
	* Returns value of release_year
	* @return
	*/
	public String getRelease_year() {
		return release_year;
	}

	/**
	* Sets new value of release_year
	* @param
	*/
	public void setRelease_year(String release_year) {
		this.release_year = release_year;
	}

	/**
	* Returns value of usable_battery_size
	* @return
	*/
	public Integer getUsable_battery_size() {
		return usable_battery_size;
	}

	/**
	* Sets new value of usable_battery_size
	* @param
	*/
	public void setUsable_battery_size(Integer usable_battery_size) {
		this.usable_battery_size = usable_battery_size;
	}

	/**
	* Returns value of variant
	* @return
	*/
	public String getVariant() {
		return variant;
	}

	/**
	* Sets new value of variant
	* @param
	*/
	public void setVariant(String variant) {
		this.variant = variant;
	}
}
