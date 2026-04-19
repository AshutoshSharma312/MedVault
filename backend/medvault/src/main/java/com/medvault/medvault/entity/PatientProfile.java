package com.medvault.medvault.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class PatientProfile {

    @Id
    private Integer patientId;  // Shares ID with User.userId

    private int age;
    private String gender;
    private String bloodGroup;
    private String address;

    @OneToOne
    @MapsId
    @JoinColumn(name = "patientId")
    private User user;
}

