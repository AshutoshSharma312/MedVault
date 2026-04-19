package com.medvault.medvault.controller;

import com.medvault.medvault.entity.DoctorProfile;
import com.medvault.medvault.repository.DoctorProfileRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctors")
@CrossOrigin(origins = "*")
public class DoctorController {

    private final DoctorProfileRepository repo;

    public DoctorController(DoctorProfileRepository repo) {
        this.repo = repo;
    }

    // CREATE DOCTOR
    @PostMapping
    public DoctorProfile createDoctor(@RequestBody DoctorProfile doctor) {
        return repo.save(doctor);
    }

    // GET ALL DOCTORS
    @GetMapping
    public List<DoctorProfile> getAllDoctors() {
        return repo.findAll();
    }

    // GET DOCTOR BY ID
    @GetMapping("/{id}")
    public DoctorProfile getDoctor(@PathVariable Integer id) {
        return repo.findById(id).orElse(null);
    }

    // UPDATE DOCTOR
    @PutMapping("/{id}")
    public DoctorProfile updateDoctor(@PathVariable Integer id, @RequestBody DoctorProfile doctor) {
        DoctorProfile existing = repo.findById(id).orElse(null);
        if (existing == null) return null;

        existing.setSpecialization(doctor.getSpecialization());
        existing.setHospitalName(doctor.getHospitalName());
        existing.setLicenseNumber(doctor.getLicenseNumber());
        existing.setYearsOfExperience(doctor.getYearsOfExperience());
        existing.setUser(doctor.getUser()); // if you want to also update the linked user

        return repo.save(existing);
    }

    // DELETE DOCTOR
    @DeleteMapping("/{id}")
    public String deleteDoctor(@PathVariable Integer id) {
        repo.deleteById(id);
        return "Doctor deleted successfully";
    }
}
