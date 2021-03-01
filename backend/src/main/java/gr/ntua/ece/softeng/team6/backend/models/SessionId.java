package gr.ntua.ece.softeng.team6.backend.models;

import java.io.Serializable;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import gr.ntua.ece.softeng.team6.backend.models.*;
import javax.persistence.*;



@Embeddable
public class SessionId implements Serializable {

    private Integer id;

    @ManyToOne
    private Charger charger;

    public SessionId() {
    }

    public SessionId(Integer id, Charger charger) {
        this.id = id;
        this.charger = charger;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SessionId sessionId = (SessionId) o;
        return id.equals(sessionId.getId()) &&
                charger.equals(sessionId.getCharger());
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, charger);
    }



	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public Charger getCharger() {
		return charger;
	}


	public void setCharger(Charger charger) {
		this.charger = charger;
	}
}
