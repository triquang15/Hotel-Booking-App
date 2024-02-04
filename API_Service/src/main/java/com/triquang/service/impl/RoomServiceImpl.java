package com.triquang.service.impl;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.sql.rowset.serial.SerialBlob;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.triquang.exception.InternalServerException;
import com.triquang.exception.ResourceNotFoundException;
import com.triquang.model.Room;
import com.triquang.repository.RoomRepository;
import com.triquang.service.IRoomService;

@Service
public class RoomServiceImpl implements IRoomService {

	@Autowired
	private RoomRepository roomRepository;

	@Override
	public Room addNewRoom(MultipartFile imageFile, String roomType, BigDecimal roomPrice)
			throws SQLException, IOException {
		Room room = new Room();
		room.setRoomType(roomType);
		room.setRoomPrice(roomPrice);
		if (!imageFile.isEmpty()) {
			byte[] imageBytes = imageFile.getBytes();
			Blob imageBlob = new SerialBlob(imageBytes);
			room.setImage(imageBlob);
		}
		return roomRepository.save(room);
	}

	@Override
	public List<String> getAllRoomTypes() {
		return roomRepository.findRoomTypes();
	}

	@Override
	public List<Room> getAllRooms() {
		return roomRepository.findAll();
	}

	@Override
	public byte[] getRoomImageById(Long roomId) {
		Optional<Room> optional = roomRepository.findById(roomId);
		if (optional.isEmpty()) {
			throw new ResourceNotFoundException("Room not found with ID " + roomId);
		}
		Blob imageBlob = optional.get().getImage();
		if (imageBlob != null) {
			try {
				return imageBlob.getBytes(1, (int) imageBlob.length());
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	@Override
	public void deleteRoom(Long roomId) {
		Optional<Room> optional = roomRepository.findById(roomId);
		if (optional.isPresent()) {
			roomRepository.deleteById(roomId);
		}

	}

	@Override
	public Room updateRoom(Long roomId, String roomType, BigDecimal roomPrice, byte[] photoBytes) {
		Room room = roomRepository.findById(roomId)
				.orElseThrow(() -> new ResourceNotFoundException("Room not found"));
		if(roomType != null) room.setRoomType(roomType);
		if(roomPrice != null) room.setRoomPrice(roomPrice);
		if(photoBytes != null && photoBytes.length > 0) {
			try {
				room.setImage(new SerialBlob(photoBytes));
			} catch (SQLException e) {
				throw new InternalServerException("Error updating room");
			}
		}
		return roomRepository.save(room);
	}

	@Override
	public Optional<Room> getRoomById(Long roomId) {
		return Optional.of(roomRepository.findById(roomId).get());
	}

	@Override
	public List<Room> getAvailableRooms(LocalDate checkIn, LocalDate checkOut, String roomType) {
		return roomRepository.findAvailableRooms(checkIn, checkOut, roomType);
	}

}
