package gr.ntua.ece.softeng.team6.backend.models;

import java.io.Serializable;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import gr.ntua.ece.softeng.team6.backend.models.*;
import javax.persistence.*;



@Embeddable
public class ChargerId implements Serializable {

    private Integer id;

    @ManyToOne
    private Station station;

    public ChargerId() {
    }

    public ChargerId(Integer id, Station station) {
        this.id = id;
        this.station = station;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChargerId chargerId = (ChargerId) o;
        return id.equals(chargerId.getId()) &&
                station.equals(chargerId.getStation());
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, station);
    }



        public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Station getStation() {
		return station;
	}

	public void setStation(Station station) {
		this.station = station;
	}
}
