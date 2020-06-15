package com.kps.springBoot.configuration.jwt;

import lombok.Data;

@Data
public class UserLoginInfo {
    private String username;
    private String password;
}
