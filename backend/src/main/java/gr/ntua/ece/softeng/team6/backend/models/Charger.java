package gr.ntua.ece.softeng.team6.backend.models;

import java.util.*;
import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Charger implements Serializable{

        @EmbeddedId
        private ChargerId charger_id;

        @Column(unique = false, nullable = true, length = 32)
        private String operational;

        @ManyToOne
        private Charger_type charger_type;


        public Charger(){
        }


	public ChargerId getCharger_id() {
		return charger_id;
	}

	public void setCharger_id(ChargerId charger_id) {
		this.charger_id = charger_id;
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


}
