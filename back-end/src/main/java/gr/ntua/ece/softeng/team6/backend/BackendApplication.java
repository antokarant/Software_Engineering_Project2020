package gr.ntua.ece.softeng.team6.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import gr.ntua.ece.softeng.team6.backend.JWTAuthorizationFilter;


@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@EnableWebSecurity
	@Configuration
	class WebSecurityConfig extends WebSecurityConfigurerAdapter {

		@Override
		protected void configure(HttpSecurity http) throws Exception {
			http.cors().and().csrf().disable()
				.addFilterAfter(new JWTAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class)
				.authorizeRequests()
				.antMatchers(HttpMethod.POST, "/login").permitAll()
				.antMatchers(HttpMethod.POST, "/admin/usermod/**").hasRole("ADMIN")
				.antMatchers(HttpMethod.POST, "/admin/resetsessions").permitAll()
				.antMatchers(HttpMethod.GET, "/admin/healthcheck").permitAll()
				.antMatchers(HttpMethod.GET, "/admin/**").hasRole("ADMIN")
				.antMatchers(HttpMethod.GET, "/users/**").permitAll()
				.antMatchers(HttpMethod.POST, "/admin/system/sessionsupd").hasRole("ADMIN")
				.antMatchers(HttpMethod.DELETE, "/users/**").hasRole("ADMIN")
				//.antMatchers(HttpMethod.POST, "/users").permitAll()  //gia eisodo xrhsth (kai admin kai allous rolous)
				.antMatchers(HttpMethod.POST, "/owners").permitAll()
				.antMatchers(HttpMethod.POST, "/vehicle_types").permitAll()
				.antMatchers(HttpMethod.POST, "/charger_types").permitAll()
				.antMatchers(HttpMethod.POST, "/stations").permitAll()
				.antMatchers(HttpMethod.POST, "/chargers").permitAll()
				.antMatchers(HttpMethod.POST, "/vehicles").permitAll()
				.antMatchers(HttpMethod.POST, "/sessions").permitAll()
				.anyRequest().authenticated();
				/*prepein na svhstoun ta katw
				.antMatchers(HttpMethod.GET, "/SessionsPerStation/**").permitAll()
				.antMatchers(HttpMethod.GET, "/SessionsPerPoint/**").permitAll()
				.antMatchers(HttpMethod.GET, "/SessionsPerEV/**").permitAll()
				.antMatchers(HttpMethod.GET, "/SessionsPerProvider/**").permitAll()
				//mexri edw*/

				//opoio einai prwto kanei override ta epomena an anaferontai sto idio url
		}
	}

}
