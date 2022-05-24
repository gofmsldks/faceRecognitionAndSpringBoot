<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SRS : reservation</title>

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">

<!-- custum css -->
<link rel="stylesheet" href="/css/reset.css">
<link rel="stylesheet" href="/css/reservation.css">

<!-- google font noto sans -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
	href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
	rel="stylesheet">

<!-- jQuery library -->
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<!-- Latest compiled JavaScript -->
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

<!-- SweetAlert https://sweetalert.js.org/guides/ -->
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

</head>

<body>
	<div class="tab-content">

		<div class="row content">
			<!-- 좌석 영역 -->
			<div class="partSeat">

				<div class="rooms">
					<!-- 회의실 -->
					<button id="1" class="room-1 conference">01</button>
					<button id="3" class="room-3 conference">03</button>
					<button id="2" class="room-2 conference">02</button>

					<!-- room -->
					<div class="room-4"></div>
					<div class="room-5"></div>
					<div class="room-6"></div>
				</div>

				<div class="seat">
					<div class="seats-1">
						<div class="seats-1-1">
							<div>
								<button class="seatBtn">B-1</button>
								<button class="seatBtn">B-2</button>
								<button class="seatBtn tl">B-3</button>
							</div>
							<div>
								<button class="seatBtn">C-1</button>
								<button class="seatBtn">C-2</button>
							</div>
						</div>
					</div>
					<div class="seats-2">
						<div class="seats-2-1">
							<div>
								<button class="seatBtn">D-1</button>
								<button class="seatBtn">D-2</button>
								<button class="seatBtn">D-3</button>
							</div>
							<div>
								<button class="seatBtn">E-1</button>
								<button class="seatBtn">E-2</button>
								<button class="seatBtn">E-3</button>
							</div>
						</div>
						<div class="seats-2-2">
							<div>
								<button class="seatBtn">D-4</button>
								<button class="seatBtn">D-5</button>
								<button class="seatBtn">D-6</button>
								<button class="seatBtn tl">D-7</button>
							</div>
							<div>
								<button class="seatBtn">E-4</button>
								<button class="seatBtn">E-5</button>
								<button class="seatBtn">E-6</button>
							</div>
						</div>
					</div>
					<div class="seats-3">
						<div class="seats-3-1">
							<div>
								<button class="seatBtn">F-1</button>
								<button class="seatBtn">F-2</button>
								<button class="seatBtn">F-3</button>
							</div>
							<div>
								<button class="seatBtn">G-1</button>
								<button class="seatBtn">G-2</button>
								<button class="seatBtn">G-3</button>
							</div>
						</div>
						<div class="seats-3-2">
							<div>
								<button class="seatBtn">F-4</button>
								<button class="seatBtn">F-5</button>
								<button class="seatBtn">F-6</button>
								<button class="seatBtn tl">F-7</button>
							</div>
							<div>
								<button class="seatBtn">G-4</button>
								<button class="seatBtn">G-5</button>
								<button class="seatBtn">G-6</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 사원리스트 영역 -->
			<div class="col-sm-3 sidenav partList">
				<div class="partListWrap">
					<div class="dropdown selectTeam">
						<button class="btn btn-default dropdown-toggle btn-lg dropdownBtn"
							type="button" data-toggle="dropdown">
							<span class="defaultOption">-- 팀을 선택하세요 --</span> <span
								class="caret"></span>
						</button>
						<ul class="dropdown-menu selectMenu"></ul>
					</div>
					<form class="selectUserForm"></form>
				</div>
			</div>

			<!-- Modal : 좌석 예약자 상세 페이지  -->
			<div class="modal fade" id="detailModal" role="dialog">
				<div class="modal-dialog">

					<!-- Modal content-->
					<div class="modal-content">
						<div class="modal-header">
							<span>예약자 정보</span>
							<button type="button" class="close" data-dismiss="modal">&times;</button>
						</div>
						<div class="modal-body modalBody">
							<div class="profileImg">
								<img src="/img/default_profile_img.jpg" alt="프로필 이미지">
							</div>
							<div class="userInfo">
								<div class="seatNum">
									좌석 번호 : <span></span>
								</div>
								<div class="team"></div>
								<div class="userId"></div>
								<div class="name"></div>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button"
								class="btn btn-primary btn-lg cancelReserve"
								data-dismiss="modal">좌석 취소</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<script type="text/javascript" src="/js/reservation.js"></script>
</body>