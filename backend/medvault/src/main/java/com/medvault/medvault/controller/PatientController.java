package com.medvault.medvault.controller;

import com.medvault.medvault.entity.PatientProfile;
import com.medvault.medvault.repository.PatientProfileRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patient")
@CrossOrigin(origins = "*")
public class PatientController {

    private final PatientProfileRepository repo;

    public PatientController(PatientProfileRepository repo) {
        this.repo = repo;
    }

    // CREATE PATIENT
    @PostMapping
    public PatientProfile createPatient(@RequestBody PatientProfile patient) {
        return repo.save(patient);
    }

    // GET ALL PATIENTS
    @GetMapping
    public List<PatientProfile> getAllPatients() {
        return repo.findAll();
    }

    // GET PATIENT BY ID
    @GetMapping("/{id}")
    public PatientProfile getPatient(@PathVariable int id) {
        return repo.findById(id).orElse(null);
    }

    // UPDATE PATIENT
    @PutMapping("/{id}")
    public PatientProfile updatePatient(@PathVariable int id, @RequestBody PatientProfile patient) {
        PatientProfile existing = repo.findById(id).orElse(null);
        if (existing == null) return null;

        existing.setAge(patient.getAge());
        existing.setGender(patient.getGender());
        existing.setBloodGroup(patient.getBloodGroup());
        existing.setAddress(patient.getAddress());

        return repo.save(existing);
    }

    // DELETE PATIENT
    @DeleteMapping("/{id}")
    public String deletePatient(@PathVariable int id) {
        repo.deleteById(id);
        return "Patient deleted successfully";
    }
}
