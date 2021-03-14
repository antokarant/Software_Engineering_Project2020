package gr.ntua.ece.softeng.team6.backend.controllers;

class VehicleNotFoundException extends RuntimeException {
  VehicleNotFoundException(String id) {
    super("Could not find Vehicle " + id);
  }
}
