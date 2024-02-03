package com.triquang.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.triquang.model.Room;

public interface IRoomService {

	Room addNewRoom(MultipartFile image, String roomType, BigDecimal roomPrice) throws SQLException, IOException;

	List<String> getAllRoomTypes();

	List<Room> getAllRooms();

	byte[] getRoomImageById(Long roomId);

	void deleteRoom(Long roomId);

	Room updateRoom(Long roomId, String roomType, BigDecimal roomPrice, byte[] photoBytes);

	Optional<Room> getRoomById(Long roomId);

	List<Room> getAvailableRooms(LocalDate checkIn, LocalDate checkOut, String roomType);
}
