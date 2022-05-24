<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%><!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SRS : HOME</title>

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">

<!-- custum css -->
<link rel="stylesheet" href="/css/reset.css">
<link rel="stylesheet" href="/css/remoteWork.css">

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
	<div class="container-fluid wrap">
		<div class="navbar-header logo-icon">
			<a class="navbar-brand" href="/"> </a>
		</div>

		<div class="collapse navbar-collapse navHeader" id="myNavbar">
			<div class="header">
				<ul class="nav nav-tabs">
					<li><a href="/"><h4 class="title">자율좌석예약시스템</h4></a></li>
					<li class="active"><a href="/view-remote"><h4 class="title">재택근무</h4></a></li>
				</ul>

				<div class="date">
					<div class="curDate">
						<span class="cdate">02월 05일</span> <span class="cday">화요일</span>
					</div>
					<div class="curTime">12시 34분</div>
				</div>
			</div>
		</div>

		<div class="row content">
			<h1>REMOTE WORK</h1>
		</div>
	</div>

	<script type="text/javascript" src="/js/utils.js"></script>
	<script type="text/javascript" src="/js/api.js"></script>
	<script type="text/javascript" src="/js/remoteWork.js"></script>
</body>
</html>