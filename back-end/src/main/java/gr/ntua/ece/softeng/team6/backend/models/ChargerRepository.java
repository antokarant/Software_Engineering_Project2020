package gr.ntua.ece.softeng.team6.backend.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.*;

public interface ChargerRepository extends JpaRepository<Charger, ChargerId> {

        @Query(value = "select count(*) from charger where station_id = ?1", nativeQuery = true)
        public Integer countofchargers(Integer stationid);
}
