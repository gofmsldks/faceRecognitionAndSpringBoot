<!-- <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%> -->
<!DOCTYPE html>
<html lang="ko">

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SRS : Regist</title>

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">

<!-- custum css -->
<link rel="stylesheet" href="/css/reset.css">
<link rel="stylesheet" href="/css/register.css">
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
</head>

<body>
	<div class="container-fluid wrap">
		<jsp:include page="clock.jsp" />

		<div class="row content mainContents">
			<div class="videoWrap">
				<video src="" id="videoPreview"></video>
				<div>
					<button type="button" class="btn btn-default btn-lg" id="take">take</button>
					<button type="button" class="btn btn-default btn-lg" id="save">save</button>
				</div>
			</div>
			<div class="camImg">
				<!-- <img alt="userPicture" src="" /> -->
				<canvas class="takePhotoCanvas"></canvas>
			</div>
			<div class="form-group">
				<label for="userName">이름</label>
				<input type="text" class="form-control input-lg" id="userName">
					<label for="userNum">사번</label>
					<input type="text" class="form-control input-lg" id="userNum">
				<div>
					<label for="sel1">소속</label>
					<select class="form-control input-lg" id="sel1">
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
					</select>
				</div>
				<div class="btnWrap">
					<button type="button" class="btn btn-default btn-lg">취소</button>
					<button type="button" class="btn btn-primary btn-lg">등록</button>
				</div>
			</div>
		</div>
	</div>

	<script type="text/javascript" src="/js/utils.js"></script>
	<script type="text/javascript" src="/js/api.js"></script>
	<script type="text/javascript" src="/js/register.js"></script>
</body>

</html>