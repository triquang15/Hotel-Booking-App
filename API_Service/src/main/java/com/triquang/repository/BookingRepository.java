package com.triquang.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.triquang.model.BookedRoom;

public interface BookingRepository extends JpaRepository<BookedRoom, Long> {
	Optional<BookedRoom> findByConfirmCode(String confirmCode);

	List<BookedRoom> findByRoomId(Long roomId);

	List<BookedRoom> findByGuestEmail(String email);

}
