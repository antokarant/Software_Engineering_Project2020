package gr.ntua.ece.softeng.team6.backend.models;

import java.util.*;
import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Charger implements Serializable{

        @Id
        private Integer id;

        @Column(unique = false, nullable = true, length = 32)
        private String operational;

        @ManyToOne
        private Charger_type charger_type;

        @ManyToOne
        @Id
        private Station station;



        public Charger(){
        }


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}


	public String getOperational() {
		return operational;
	}


	public void setOperational(String operational) {
		this.operational = operational;
	}


	public Charger_type getCharger_type() {
		return charger_type;
	}


	public void setCharger_type(Charger_type charger_type) {
		this.charger_type = charger_type;
	}


	public Station getStation() {
		return station;
	}


	public void setStation(Station station) {
		this.station = station;
	}

}
