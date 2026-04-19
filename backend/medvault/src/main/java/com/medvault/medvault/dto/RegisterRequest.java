package com.medvault.medvault.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;

    // Role must be "PATIENT" or "DOCTOR"
    private String role;

    // Patient fields
    private Integer age;
    private String gender;
    private String bloodGroup;
    private String address;

    // Doctor fields
    private String specialization;
    private String hospitalName;
    private String licenseNumber;
    private Integer yearsOfExperience;
}
