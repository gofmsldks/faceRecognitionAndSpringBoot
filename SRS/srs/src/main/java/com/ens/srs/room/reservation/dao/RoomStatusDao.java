package com.ens.srs.room.reservation.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ens.srs.room.reservation.dto.ReserveItemDto;

@Repository
public class RoomStatusDao {
	
	private static final String NAME_SPACE = "com.ens.srs.mappers.roommapper";

	@Autowired
	SqlSession sqlSession;

	public List<ReserveItemDto> getAllStatus() {
		return sqlSession.selectList(NAME_SPACE + ".getAllStatus");
	}
}
