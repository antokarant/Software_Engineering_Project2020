package gr.ntua.ece.softeng.team6.backend.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.*;


public interface SessionRepository extends JpaRepository<Session, SessionId> {

        @Query(value = "select * from session where start_date >= ?3 and end_date <= ?4 and charger_id = ?2 and charger_station_id = ?1 ORDER BY start_date, start_time", nativeQuery = true)
        public List<NameOnly> perPoint(Integer stationid, Integer pointid, String startdate, String enddate);

        @Query(value = "select * from session where start_date >= ?2 and end_date <= ?3 and charger_station_id = ?1 ORDER BY start_date, start_time", nativeQuery = true)
        public List<NameOnly> perStation(Integer stationid, String startdate, String enddate);

        @Query(value = "select * from session where start_date >= ?2 and end_date <= ?3 and vehicle_license_plate = ?1 ORDER BY start_date, start_time", nativeQuery = true)
        public List<NameOnly> perEV(String vehicle, String startdate, String enddate);

        /*public static interface NameOnly{
                Integer getId();
                String getStart_date();
        }*/

}
