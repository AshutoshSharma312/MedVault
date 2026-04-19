package com.medvault.medvault.service;

import com.medvault.medvault.dto.AuthResponse;
import com.medvault.medvault.dto.LoginRequest;
import com.medvault.medvault.dto.RegisterRequest;
import com.medvault.medvault.entity.DoctorProfile;
import com.medvault.medvault.entity.PatientProfile;
import com.medvault.medvault.entity.User;
import com.medvault.medvault.repository.DoctorProfileRepository;
import com.medvault.medvault.repository.PatientProfileRepository;
import com.medvault.medvault.repository.UserRepository;
import com.medvault.medvault.config.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PatientProfileRepository patientProfileRepository;

    @Autowired
    private DoctorProfileRepository doctorProfileRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public AuthResponse register(RegisterRequest request) {

        // Create User
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(User.Role.valueOf(request.getRole()));

        User savedUser = userRepository.save(user);

        // Create profile
        if (savedUser.getRole() == User.Role.PATIENT) {
            PatientProfile profile = new PatientProfile();
            profile.setPatientId(savedUser.getUserId());
            profile.setAge(request.getAge());
            profile.setGender(request.getGender());
            profile.setBloodGroup(request.getBloodGroup());
            profile.setAddress(request.getAddress());
            profile.setUser(savedUser);
            patientProfileRepository.save(profile);

        } else if (savedUser.getRole() == User.Role.DOCTOR) {
            DoctorProfile doctor = new DoctorProfile();
            doctor.setDoctorId(savedUser.getUserId());
            doctor.setSpecialization(request.getSpecialization());
            doctor.setHospitalName(request.getHospitalName());
            doctor.setLicenseNumber(request.getLicenseNumber());
            doctor.setYearsOfExperience(request.getYearsOfExperience());
            doctor.setUser(savedUser);
            doctorProfileRepository.save(doctor);
        }

        return new AuthResponse(null, "User registered successfully");
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtService.generateToken(
                org.springframework.security.core.userdetails.User
                        .withUsername(user.getEmail())
                        .password(user.getPassword())
                        .authorities(new ArrayList<>())
                        .build()
        );

        return new AuthResponse(token, "Login successful");
    }
}
