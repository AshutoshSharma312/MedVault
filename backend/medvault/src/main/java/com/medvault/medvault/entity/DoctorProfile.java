package com.medvault.medvault.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class DoctorProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int doctorId;


    private String specialization;
    private String hospitalName;
    private String licenseNumber;
    private int yearsOfExperience;

    @OneToOne
    @MapsId
    @JoinColumn(name = "doctorId")
    private User user;
}

