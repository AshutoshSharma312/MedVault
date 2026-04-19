package com.medvault.medvault.repository;

import com.medvault.medvault.entity.DoctorProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorProfileRepository extends JpaRepository<DoctorProfile, Integer> {
}
