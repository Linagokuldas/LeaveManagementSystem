package com.leavemanagement.repository;

import com.leavemanagement.entity.LeaveRequest;
import com.leavemanagement.entity.ApprovalLevel;
import com.leavemanagement.entity.LeaveStatus;
import com.leavemanagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByUserOrderByCreatedAtDesc(User user);
    
    List<LeaveRequest> findByCurrentLevelAndStatus(ApprovalLevel currentLevel, LeaveStatus status);
    
    @Query("SELECT lr FROM LeaveRequest lr WHERE lr.status = :status")
    List<LeaveRequest> findByStatus(@Param("status") LeaveStatus status);
    
    @Query("SELECT COUNT(lr) FROM LeaveRequest lr WHERE lr.status = :status")
    Long countByStatus(@Param("status") LeaveStatus status);
    
    @Query("SELECT COUNT(lr) FROM LeaveRequest lr WHERE lr.currentLevel = :level AND lr.status = 'PENDING'")
    Long countByCurrentLevelAndPending(@Param("level") ApprovalLevel level);
}
