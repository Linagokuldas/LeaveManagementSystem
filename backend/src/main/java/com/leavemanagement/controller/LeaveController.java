package com.leavemanagement.controller;

import com.leavemanagement.dto.LeaveRequestDto;
import com.leavemanagement.entity.*;
import com.leavemanagement.service.AuthService;
import com.leavemanagement.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/leave")
@CrossOrigin(origins = "http://localhost:5173")
public class LeaveController {
    
    @Autowired
    private LeaveService leaveService;
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/apply")
    public ResponseEntity<LeaveRequest> applyLeave(@RequestBody LeaveRequestDto leaveRequestDto) {
        try {
            User currentUser = authService.getCurrentUser();
            LeaveRequest leaveRequest = leaveService.applyLeave(
                    currentUser.getId(),
                    leaveRequestDto.getFromDate(),
                    leaveRequestDto.getToDate(),
                    leaveRequestDto.getLeaveType(),
                    leaveRequestDto.getReason()
            );
            return ResponseEntity.ok(leaveRequest);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/my-requests")
    public ResponseEntity<List<LeaveRequest>> getMyRequests() {
        try {
            User currentUser = authService.getCurrentUser();
            List<LeaveRequest> requests = leaveService.getMyRequests(currentUser.getId());
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/pending/{role}")
    public ResponseEntity<List<LeaveRequest>> getPendingRequests(@PathVariable String role) {
        try {
            ApprovalLevel level;
            switch (role.toUpperCase()) {
                case "TEAM_LEAD":
                    level = ApprovalLevel.TEAM_LEAD;
                    break;
                case "HR":
                    level = ApprovalLevel.HR;
                    break;
                case "MANAGER":
                    level = ApprovalLevel.MANAGER;
                    break;
                case "CEO":
                    level = ApprovalLevel.CEO;
                    break;
                default:
                    return ResponseEntity.badRequest().build();
            }
            
            List<LeaveRequest> requests = leaveService.getPendingRequests(level);
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/approve/{id}")
    public ResponseEntity<LeaveRequest> approveLeave(@PathVariable Long id) {
        try {
            LeaveRequest leaveRequest = leaveService.approveLeave(id);
            return ResponseEntity.ok(leaveRequest);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/reject/{id}")
    public ResponseEntity<LeaveRequest> rejectLeave(@PathVariable Long id) {
        try {
            LeaveRequest leaveRequest = leaveService.rejectLeave(id);
            return ResponseEntity.ok(leaveRequest);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/dashboard-stats")
    public ResponseEntity<Map<String, Long>> getDashboardStats() {
        try {
            Map<String, Long> stats = new HashMap<>();
            stats.put("total", leaveService.getTotalLeaves());
            stats.put("pending", leaveService.getPendingLeaves());
            stats.put("approved", leaveService.getApprovedLeaves());
            stats.put("rejected", leaveService.getRejectedLeaves());
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
