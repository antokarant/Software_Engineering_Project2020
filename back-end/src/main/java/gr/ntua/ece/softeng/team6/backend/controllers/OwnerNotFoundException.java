package gr.ntua.ece.softeng.team6.backend.controllers;

class OwnerNotFoundException extends RuntimeException {
  OwnerNotFoundException(Integer id) {
    super("Could not find Owner " + id);
  }
}
