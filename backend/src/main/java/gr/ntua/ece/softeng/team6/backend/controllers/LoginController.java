package gr.ntua.ece.softeng.team6.backend.controllers;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//import es.softtek.jwtDemo.dto.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import gr.ntua.ece.softeng.team6.backend.models.UserRepository;
import gr.ntua.ece.softeng.team6.backend.models.User;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class LoginController {

	private final UserRepository repository;

	LoginController(UserRepository repository){
                this.repository = repository;

        }
	@PostMapping("/login")
	public String login(@RequestParam("username") String username, @RequestParam("password") String pwd) {
		try{
			User curUser = repository.findById(username).get();
                	if(curUser == null)
				return "Something went wrong couldnt find you";


                	else if(!curUser.getPassword().equals(pwd))
                        	return "wrong password";

			String token = getJWTToken(username,curUser.getRole());
			return "{\"token\": \"" + token + "\"}";
                }catch(Exception e){
			return "invalid user";
		}


	}

	private String getJWTToken(String username, String role) {
		String secretKey = "mySecretKey";
		String actualRole = "ROLE_"+role;
		List<GrantedAuthority> grantedAuthorities = AuthorityUtils
				.commaSeparatedStringToAuthorityList(actualRole);

		String token = Jwts
				.builder()
				.setId("softtekJWT")
				.setSubject(username)
				.claim("authorities",
						grantedAuthorities.stream()
								.map(GrantedAuthority::getAuthority)
								.collect(Collectors.toList()))
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 600000))
				.signWith(SignatureAlgorithm.HS512,
						secretKey.getBytes()).compact();

		return  token;
	}
}
