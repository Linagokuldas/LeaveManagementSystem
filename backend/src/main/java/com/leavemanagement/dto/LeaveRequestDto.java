package com.leavemanagement.dto;

import com.leavemanagement.entity.LeaveType;
import java.time.LocalDate;

public class LeaveRequestDto {
    private LocalDate fromDate;
    private LocalDate toDate;
    private LeaveType leaveType;
    private String reason;
    
    public LeaveRequestDto() {}
    
    public LeaveRequestDto(LocalDate fromDate, LocalDate toDate, LeaveType leaveType, String reason) {
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.leaveType = leaveType;
        this.reason = reason;
    }
    
    public LocalDate getFromDate() { return fromDate; }
    public void setFromDate(LocalDate fromDate) { this.fromDate = fromDate; }
    
    public LocalDate getToDate() { return toDate; }
    public void setToDate(LocalDate toDate) { this.toDate = toDate; }
    
    public LeaveType getLeaveType() { return leaveType; }
    public void setLeaveType(LeaveType leaveType) { this.leaveType = leaveType; }
    
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
