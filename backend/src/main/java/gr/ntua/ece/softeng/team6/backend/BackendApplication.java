package gr.ntua.ece.softeng.team6.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
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
				.antMatchers(HttpMethod.GET, "/admin/healthcheck").permitAll()
				//.antMatchers(HttpMethod.GET, "/admin/testing/**").permitAll()
				.antMatchers(HttpMethod.POST, "/admin/usermod").hasRole("ADMIN")
				.antMatchers(HttpMethod.GET, "/admin/users").hasRole("ADMIN")
				.antMatchers(HttpMethod.POST, "/admin/system/sessionsupd").hasRole("ADMIN")
				.antMatchers(HttpMethod.POST, "/admin/resetsessions").permitAll()
				.antMatchers(HttpMethod.POST, "/users").permitAll()
				.antMatchers(HttpMethod.POST, "/owners").permitAll()
				.antMatchers(HttpMethod.POST, "/vehicle_types").permitAll()
				.antMatchers(HttpMethod.POST, "/charger_types").permitAll()
				.antMatchers(HttpMethod.POST, "/stations").permitAll()
				.antMatchers(HttpMethod.POST, "/chargers").permitAll()
				.antMatchers(HttpMethod.POST, "/vehicles").permitAll()
				.antMatchers(HttpMethod.POST, "/sessions").permitAll()


				.anyRequest().authenticated();
		}
	}

}
