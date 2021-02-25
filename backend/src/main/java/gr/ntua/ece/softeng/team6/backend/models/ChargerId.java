package gr.ntua.ece.softeng.team6.backend.models;

import java.io.Serializable;
import java.util.*;

public class ChargerId implements Serializable {

    private Integer id;
    private Integer station_id;

    public ChargerId() {
    }

    public ChargerId(Integer id, Integer station_id) {
        this.id = id;
        this.station_id = station_id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChargerId chargerId = (ChargerId) o;
        return id.equals(chargerId.id) &&
                station_id.equals(chargerId.station_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, station_id);
    }
}
