package com.leavemanagement.service;

import com.leavemanagement.entity.*;
import com.leavemanagement.repository.LeaveRequestRepository;
import com.leavemanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@Transactional
public class LeaveService {
    
    @Autowired
    private LeaveRequestRepository leaveRequestRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public LeaveRequest applyLeave(Long userId, LocalDate fromDate, LocalDate toDate, LeaveType leaveType, String reason) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        long totalDays = ChronoUnit.DAYS.between(fromDate, toDate) + 1;
        
        LeaveRequest leaveRequest = new LeaveRequest(user, fromDate, toDate, (int) totalDays, leaveType, reason);
        return leaveRequestRepository.save(leaveRequest);
    }
    
    public List<LeaveRequest> getMyRequests(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return leaveRequestRepository.findByUserOrderByCreatedAtDesc(user);
    }
    
    public List<LeaveRequest> getPendingRequests(ApprovalLevel level) {
        return leaveRequestRepository.findByCurrentLevelAndStatus(level, LeaveStatus.PENDING);
    }
    
    public LeaveRequest approveLeave(Long requestId) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Leave request not found"));
        
        ApprovalLevel currentLevel = leaveRequest.getCurrentLevel();
        
        if (currentLevel == ApprovalLevel.TEAM_LEAD) {
            leaveRequest.setCurrentLevel(ApprovalLevel.HR);
        } else if (currentLevel == ApprovalLevel.HR) {
            leaveRequest.setCurrentLevel(ApprovalLevel.MANAGER);
        } else if (currentLevel == ApprovalLevel.MANAGER) {
            leaveRequest.setCurrentLevel(ApprovalLevel.CEO);
        } else if (currentLevel == ApprovalLevel.CEO) {
            leaveRequest.setStatus(LeaveStatus.APPROVED);
        }
        
        leaveRequest.setUpdatedAt(java.time.LocalDateTime.now());
        return leaveRequestRepository.save(leaveRequest);
    }
    
    public LeaveRequest rejectLeave(Long requestId) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Leave request not found"));
        
        leaveRequest.setStatus(LeaveStatus.REJECTED);
        leaveRequest.setUpdatedAt(java.time.LocalDateTime.now());
        return leaveRequestRepository.save(leaveRequest);
    }
    
    public long getTotalLeaves() {
        return leaveRequestRepository.count();
    }
    
    public long getPendingLeaves() {
        return leaveRequestRepository.countByStatus(LeaveStatus.PENDING);
    }
    
    public long getApprovedLeaves() {
        return leaveRequestRepository.countByStatus(LeaveStatus.APPROVED);
    }
    
    public long getRejectedLeaves() {
        return leaveRequestRepository.countByStatus(LeaveStatus.REJECTED);
    }
}
