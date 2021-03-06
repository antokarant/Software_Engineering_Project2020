package gr.ntua.ece.softeng.team6.backend.models;

import java.util.*;
import javax.persistence.*;
import org.hibernate.*;
import org.springframework.web.bind.annotation.*;

@Entity
public class User {

        @Id
        private String username;

        @Column(unique = false, nullable = false, length = 32)
        private String password;

        @Column(unique = false, nullable = false, length = 32)
        private String role;

        public User(){
        }


	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


	public String getRole() {
		return role;
	}


	public void setRole(String role) {
		this.role = role;
	}


}
