package com.kps.springBoot.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.kps.springBoot.configuration.jwt.UserLoginService;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	@Autowired
	UserLoginService userService;
	
//	private final ObjectMapper objectMapper;
	
//	public SecurityConfiguration(UserLoginService userService, ObjectMapper objectMapper) {
//        this.userService = userService;
//        this.objectMapper = objectMapper;
//    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService)
            .passwordEncoder(passwordEncoder());
    }
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	http.authorizeRequests()
	        .antMatchers("/login", "/favicon.ico")
	        	.permitAll()
	        .anyRequest().authenticated()
//        	.antMatchers("/**")
//	            .hasAnyRole("ADMIN", "USER")
	        .and()
	        	.formLogin()
	        	.loginPage("/login")
	        	.usernameParameter("username")
	        	.passwordParameter("password")
//	        	.loginProcessingUrl("/login-processing")
	        	.defaultSuccessUrl("/index")
//	        	.failureUrl("/login?error=true")
	        	.permitAll()
        	.and()
	        	.logout()
	        	.logoutSuccessUrl("/login?logout=true")
//	        	.logoutSuccessHandler(this::logoutSuccessHandler)
	            .invalidateHttpSession(true)
	        	.permitAll()
	        .and() 
	        	.csrf()
	        	.disable();
        
    }
    
//    private void logoutSuccessHandler(
//        HttpServletRequest request,
//        HttpServletResponse response,
//        Authentication authentication) throws IOException {
// 
//        response.setStatus(HttpStatus.OK.value());
//        objectMapper.writeValue(response.getWriter(), "Bye!");
//    }
    
}
