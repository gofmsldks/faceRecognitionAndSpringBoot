package com.ens.srs.room.reservation.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ens.srs.room.reservation.dto.ReserveItemDto;
import com.ens.srs.room.reservation.dto.SelectItemDto;

@Repository
public class RoomReservationDao {
	private static final String NAME_SPACE = "com.ens.srs.mappers.roommapper";

	@Autowired
	SqlSession sqlSession;

	public List<ReserveItemDto> getList(SelectItemDto selectItemDto) {
		return sqlSession.selectList(NAME_SPACE + ".getList", selectItemDto);
	}

	public void reserve(ReserveItemDto reserveItemDto) {
		sqlSession.insert(NAME_SPACE + ".reserve", reserveItemDto);
	}

	public int checkBeforeCancel(ReserveItemDto reserveItemDto) {
		return sqlSession.selectOne(NAME_SPACE + ".checkBeforeCancel", reserveItemDto);
	}

	public void cancel(ReserveItemDto reserveItemDto) {
		sqlSession.delete(NAME_SPACE + ".cancel", reserveItemDto);
	}

}
