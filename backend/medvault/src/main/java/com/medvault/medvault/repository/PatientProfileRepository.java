package com.medvault.medvault.repository;

import com.medvault.medvault.entity.PatientProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientProfileRepository extends JpaRepository<PatientProfile, Integer> {
}
