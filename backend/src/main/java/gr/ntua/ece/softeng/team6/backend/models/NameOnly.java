package gr.ntua.ece.softeng.team6.backend.models;


public interface NameOnly{
        Integer getId();
        String getStart_date();
        String getEnd_date();
        String getStart_time();
        String getEnd_time();
        String getPayment_method();
        Integer getProtocol();
        Integer getPrice_policy();
        Float getRating();
        Float getEnergy_delivered();
        Float getTotal_cost();
        Integer getCharger_id();
        Integer getCharger_station_id();
        String getVehicle_license_plate();
        Float getCost_per_kwh();


}
