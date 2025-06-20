package com.example.todo_api.basic;

import org.springframework.context.annotation.Bean;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

public class BasicAuthenticationSecurityConfiguration {
    @Bean
    // disabling csrf
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // 모든 http 요청 인증되어야함
        http.authorizeHttpRequests(auth -> auth.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll().
                anyRequest().authenticated());
        // 기본 인증 활성화
        http.httpBasic(Customizer.withDefaults());
        // 상태 없는 REST API, CSRF 비활성화 하기
        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.csrf().disable();
        return http.build();
    }
}
