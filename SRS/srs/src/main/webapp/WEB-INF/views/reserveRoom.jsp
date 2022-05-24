<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>SRS : ID LOGIN</title>

	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">

	<!-- custum css -->
	<link rel="stylesheet" href="/css/reset.css">
	<link rel="stylesheet" href="/css/reserveRoom.css" />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
		rel="stylesheet">

	<!-- jQuery library -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

	<!-- Latest compiled JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

	<!-- SweetAlert https://sweetalert.js.org/guides/ -->
	<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

</head>

<body>
	<div class="container-fluid wrap">
		<div class="navbar-header back-icon">
			<button class="backButton navbar-brand"></button>
		</div>

		<div class="collapse navbar-collapse navHeader" id="myNavbar">
			<div class="header">
				<div class="leftWrap">
					<h4 class="title">회의실 예약</h4>
					<button type="button" style="margin-left: 14px;" class="modalButton btn btn-info"
						data-toggle="modal" data-target="#printModal">예약 목록
						Print</button>

				</div>

				<div class="date">
					<div class="curDate">
						<span class="cdate">02월 05일</span> <span class="cday">월요일</span>
					</div>
					<div class="curTime">12시 34분</div>
				</div>
			</div>
		</div>
		<div class="row content">
			<div class="timeTable">
				<div class="schedule" aria-labelledby="schedule-heading">
					<span class="track-slot" aria-hidden="true"
						style="grid-column: track-1; grid-row: tracks"><span></span>
						회의실</span>

					<h2 class="time-slot" style="grid-row: time-0800">8:00am</h2>
					<h2 class="time-slot" style="grid-row: time-0830">8:30am</h2>
					<h2 class="time-slot" style="grid-row: time-0900">9:00am</h2>
					<h2 class="time-slot" style="grid-row: time-0930">9:30am</h2>
					<h2 class="time-slot" style="grid-row: time-1000">10:00am</h2>
					<h2 class="time-slot" style="grid-row: time-1030">10:30am</h2>
					<h2 class="time-slot" style="grid-row: time-1100">11:00am</h2>
					<h2 class="time-slot" style="grid-row: time-1130">11:30am</h2>
					<h2 class="time-slot" style="grid-row: time-1200">12:00pm</h2>
					<h2 class="time-slot" style="grid-row: time-1300">13:00pm</h2>
					<h2 class="time-slot" style="grid-row: time-1330">13:30pm</h2>
					<h2 class="time-slot" style="grid-row: time-1400">14:00pm</h2>
					<h2 class="time-slot" style="grid-row: time-1430">14:30pm</h2>
					<h2 class="time-slot" style="grid-row: time-1500">15:00pm</h2>
					<h2 class="time-slot" style="grid-row: time-1530">15:30pm</h2>
					<h2 class="time-slot" style="grid-row: time-1600">16:00pm</h2>
					<h2 class="time-slot" style="grid-row: time-1630">16:30pm</h2>
					<h2 class="time-slot" style="grid-row: time-1700">17:00pm</h2>
					<h2 class="time-slot" style="grid-row: time-1730">17:30pm</h2>
					<h2 class="time-slot" style="grid-row: time-1800">18:00pm</h2>
					<h2 class="time-slot" style="grid-row: time-1830">18:30pm</h2>
					<h2 class="time-slot" style="grid-row: time-1900">19:00pm</h2>

					<!-- <div class="session breakTime" style="grid-row: time-1200 / time-1300">
						<h3 class="session-title"><a href="#">점심 시간</a></h3>
						<span class="session-time">12:00 - 13:00</span>
					</div> -->
				</div>
			</div>
			<div class="reserveView">
				<form class="confReserveForm">
					<!-- select time -->
					<div class="selectTime">
						<div class="selectWrap">
							<h2 class="selectTitle">날짜 지정</h2>
							<div class="dateContainer"><input type="date" id="selectDate" class="form-control input-lg"
									required /></div>
						</div>
						<div class="selectWrap">
							<h2 class="selectTitle">시작 시간</h2>
							<div class="selectStart"></div>
						</div>
						<div class="selectWrap">
							<h2 class="selectTitle">종료 시간</h2>
							<div class="selectFinish"></div>
						</div>
					</div>

					<!-- session info -->
					<div class="sessionInfo">
						<div class="form-group">
							<label class="subtitle" for="inputTitle">회의 목적 :</label>
							<div class="dropdown dropTitles">
								<button class="btn btn-default dropdown-toggle" type="button"
									data-toggle="dropdown">-- 선택하세요 --
									<span class="caret"></span></button>
								<ul class="dropdown-menu">
									<li data-value="conf">회의</li>
									<li data-value="weekConf">주간 회의</li>
									<li data-value="exeConf">임원 회의</li>
									<li data-value="semConf">세미나</li>
									<li data-value="input">직접 입력</li>
								</ul>
							</div>
							<input required type="text" class="form-control input-lg" id="inputTitle" maxlength="10"
								placeholder="10자 이내로 입력하세요"/>
						</div>

						<div class="subtitle roomNum">
							회의실 : <span></span> 회의실
						</div>
						<div class="subtitle user">
							예약자 : <span></span>
						</div>
						<div class="subtitle selectedDate">
							예약 날짜 : <span></span>
						</div>
						<div class="subtitle times">
							사용 시간 : <span class="st"></span> ~ <span class="ft"></span>
						</div>
						<div class="buttonWrap">
							<button type="reset" class="cancelButton btn btn-default btn-lg">예약
								취소</button>
							<button type="submit" class="submitButton btn btn-success btn-lg">
								회의실 예약</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>

	<!-- Modal -->
	<div class="modal fade" id="printModal" role="dialog">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modalHeader">
					<h4 class="modal-title">회의 리스트</h4>
					<div>
						<button type="button" class="closeButton btn btn-default" data-dismiss="modal">닫기</button>
						<button type="button" class="printButton btn btn-info">출력</button>
					</div>
				</div>

				<div class="modal-body"></div>

			</div>

		</div>

	</div>

	<script type="text/javascript" src="/js/selectTimes.js"></script>
	<script type="text/javascript" src="/js/reserveRoom.js"></script>
	<script type="text/javascript" src="/js/utils.js"></script>
	<script type="text/javascript" src="/js/api.js"></script>
</body>

</html>