package com.triquang.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.triquang.exception.InvalidBookingRequestException;
import com.triquang.exception.ResourceNotFoundException;
import com.triquang.model.BookedRoom;
import com.triquang.model.Room;
import com.triquang.response.BookingResponse;
import com.triquang.response.RoomResponse;
import com.triquang.service.IBookingService;
import com.triquang.service.IRoomService;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

	@Autowired
	private IBookingService iBookingService;

	@Autowired
	private IRoomService iRoomService;
	
	@GetMapping("/all-bookings")
	public ResponseEntity<List<BookingResponse>> getAllBookingRooms() {
	    List<BookedRoom> bookedRooms = iBookingService.getAllBookings();
	    
	    List<BookingResponse> bookingResponses = bookedRooms.stream()
	        .map(this::getBookingResponse)
	        .collect(Collectors.toList());

	    return ResponseEntity.ok(bookingResponses);
	}


	@GetMapping("/confirm/{confirmCode}")
	public ResponseEntity<?> getBookingConfirmCode(@PathVariable String confirmCode) {
		try {
			BookedRoom bookedRoom = iBookingService.findByConfirmCode(confirmCode);
			BookingResponse bookingResponse = getBookingResponse(bookedRoom);

			return ResponseEntity.ok(bookingResponse);
		} catch (ResourceNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}

	private BookingResponse getBookingResponse(BookedRoom bookedRoom) {
		Room theRoom = iRoomService.getRoomById(bookedRoom.getRoom().getId()).get();
		RoomResponse roomResponse = new RoomResponse(theRoom.getId(), theRoom.getRoomType(), theRoom.getRoomPrice());

		return new BookingResponse(bookedRoom.getId(), bookedRoom.getCheckIn(), 
				bookedRoom.getCheckOut(),
				bookedRoom.getGuestFullName(), bookedRoom.getGuestEmail(), bookedRoom.getNumOfAdults(),
				bookedRoom.getNumOfChildren(), bookedRoom.getTotalNumOfGuest(), bookedRoom.getConfirmCode(), roomResponse);
	}

	@PostMapping("/room/{roomId}/booking")
	public ResponseEntity<?> saveBooking(@PathVariable Long roomId, @RequestBody BookedRoom bookedReq) {
		try {
			String code = iBookingService.saveBooking(roomId, bookedReq);
			return ResponseEntity.ok("Confirmation for Booking ID#" + code + " Check-in " + bookedReq.getCheckIn());
		} catch (InvalidBookingRequestException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	 @GetMapping("/user/{email}/bookings")
	 public ResponseEntity<List<BookingResponse>> getBookingsByUserEmail(@PathVariable String email) {
		    List<BookedRoom> bookings = iBookingService.getBookingsByUserEmail(email);
		    
		    List<BookingResponse> bookingResponses = bookings.stream()
		        .map(this::getBookingResponse)
		        .collect(Collectors.toList());

		    return ResponseEntity.ok(bookingResponses);
		}


	@DeleteMapping("/{bookingId}/delete")
	public void cancelBooking(@PathVariable Long bookingId) {
		iBookingService.cancelBooking(bookingId);
	}
}
