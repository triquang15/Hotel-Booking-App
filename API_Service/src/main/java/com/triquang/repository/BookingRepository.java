package com.triquang.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.triquang.model.BookedRoom;

public interface BookingRepository extends JpaRepository<BookedRoom, Long> {
	BookedRoom findByConfirmCode(String confirmCode);

	List<BookedRoom> findByRoomId(Long roomId);

}
