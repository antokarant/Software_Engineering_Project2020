package gr.ntua.ece.softeng.team6.backend.controllers;

class UserNotFoundException extends RuntimeException {
  UserNotFoundException(String username) {
    super("Could not find User " + username);
  }
}
