package com.triquang.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Supplier;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.triquang.exception.ImageRetrievalException;
import com.triquang.model.BookedRoom;
import com.triquang.model.Room;
import com.triquang.response.BookingResponse;
import com.triquang.response.RoomResponse;
import com.triquang.service.BookingService;
import com.triquang.service.IRoomService;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin("http://localhost:3000")
public class RoomController {

	@Autowired
	private IRoomService roomService;

	@Autowired
	private BookingService bookingService;

	@PostMapping("/addNewRoom")
	public ResponseEntity<RoomResponse> addNewRooma(@RequestParam("image") MultipartFile image,
			@RequestParam("roomType") String roomType, @RequestParam("roomPrice") BigDecimal roomPrice) {

		Supplier<ResponseEntity<RoomResponse>> addNewRoomSupplier = () -> {
			try {
				Room savedRoom = roomService.addNewRoom(image, roomType, roomPrice);
				RoomResponse response = new RoomResponse(savedRoom.getId(), savedRoom.getRoomType(),
						savedRoom.getRoomPrice());
				return ResponseEntity.ok(response);
			} catch (SQLException | IOException e) {
				// Handle exceptions as needed
				return ResponseEntity.status(500).build(); // For example, return a 500 Internal Server Error
			}
		};

		return addNewRoomSupplier.get();
	}

	@GetMapping("/roomTypes")
	public List<String> getRoomTypes() {
		return roomService.getAllRoomTypes();
	}

	
	@GetMapping("/allRooms")
	public ResponseEntity<List<RoomResponse>> getAllRooms() throws SQLException {
		List<Room> listRooms = roomService.getAllRooms();
		List<RoomResponse> roomResponses = new ArrayList<>();
		for (Room room : listRooms) {
			byte[] imageBytes = roomService.getRoomImageById(room.getId());
			if (imageBytes != null && imageBytes.length > 0) {
				String base64Image = Base64.encodeBase64String(imageBytes);
				RoomResponse response = getRoomResponse(room);
				response.setImage(base64Image);
				roomResponses.add(response);
			}
		}
		return ResponseEntity.ok(roomResponses);
	}
	
	@DeleteMapping("/delete/room/{roomId}")
	public ResponseEntity<Void> deleteRoom(@PathVariable Long roomId){
		roomService.deleteRoom(roomId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	private RoomResponse getRoomResponse(Room room) {
		List<BookedRoom> bookedRooms = getAllBookingByRoomId(room.getId());
//		List<BookingResponse> bookingResponses = bookedRooms.stream()
//				.map(booking -> new BookingResponse(booking.getId(), booking.getCheckIn(), booking.getCheckOut(),
//						booking.getBookingCode()))
//				.toList();
		byte[] imageBytes = null;
		Blob blobImage = room.getImage();
		if(blobImage != null) {
			try {
				imageBytes = blobImage.getBytes(1, (int) blobImage.length());
			} catch (SQLException e) {
				throw new ImageRetrievalException("Error get image response");
			}
		}
		return new RoomResponse(room.getId(), room.getRoomType(), room.getRoomPrice(), room.isBooked(),
				imageBytes);
	}

	private List<BookedRoom> getAllBookingByRoomId(Long roomId) {

		return bookingService.getAllBookingByRoomId(roomId);
	}
}
