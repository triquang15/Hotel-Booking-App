package com.triquang.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.triquang.model.Room;

public interface IRoomService {

	Room addNewRoom(MultipartFile image, String roomType, BigDecimal roomPrice) throws SQLException, IOException;

	List<String> getAllRoomTypes();

	List<Room> getAllRooms();

	byte[] getRoomImageById(Long roomId);

	void deleteRoom(Long roomId);

}
