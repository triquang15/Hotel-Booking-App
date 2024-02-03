package com.triquang.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookedRoom {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "booking_id")
	private Long id;
	private LocalDate checkIn;
	private LocalDate checkOut;
	
	@Column(name = "guest_name")
	private String guestFullName;
	
	@Column(name = "guest_email")
	private String guestEmail;
	
	@Column(name = "children")
	private int numOfChildren;
	
	@Column(name = "adults")
	private int numOfAdults;
	
	@Column(name = "total_guest")
	private int totalNumOfGuest;
	
	@Column(name = "code")
	private String confirmCode;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "room_id")
	private Room room;

	public void setNumOfChildren(int numOfChildren) {
		this.numOfChildren = numOfChildren;
		calTotalNumberOfGuest();
	}

	public void setNumOfAdults(int numOfAdults) {
		this.numOfAdults = numOfAdults;
		calTotalNumberOfGuest();
	}

	public void calTotalNumberOfGuest() {
		this.totalNumOfGuest = this.numOfAdults + numOfChildren;
	}
}
