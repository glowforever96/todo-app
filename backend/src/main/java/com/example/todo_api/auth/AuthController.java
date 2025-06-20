package com.example.todo_api.auth;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    @GetMapping("/basicauth")
    public String basicAuthCheck() {
        return "success";
    }
}
