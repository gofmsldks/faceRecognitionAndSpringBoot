<!-- <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%> -->
<!DOCTYPE html>
<html lang="ko">

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SRS : ID LOGIN</title>

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">

<!-- custum css -->
<link rel="stylesheet" href="/css/reset.css">
<link rel="stylesheet" href="/css/idLogin.css">
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
		<jsp:include page="clock.jsp" />
		<div class="row content">
			<div class="formWrap">
				<h5 class="subtitle"">LOGIN</h5>
				<form>
					<div class=" input-group">
						<span class="input-group-addon"><i
							class="glyphicon glyphicon-user"></i></span> <input id="userId"
							type="text" class="form-control input-lg" name="email"
							placeholder="ID" autocomplete="off">
					</div>
					<div class="input-group">
						<span class="input-group-addon"><i
							class="glyphicon glyphicon-lock"></i></span> <input id="userPw"
							type="password" class="form-control input-lg" name="password"
							placeholder="Password" autocomplete="off">
					</div>
					<div class="btnWrap">
						<button type="reset" class="btn btn-default btn-lg btnBack">홈으로 돌아가기</button>
						<button type="submit" class="btn btn-primary btn-lg btnSubmit">좌석
							예약</button>
					</div>
				</form>
			</div>
		</div>
	</div>

	<script type="text/javascript" src="/js/utils.js"></script>
	<script type="text/javascript" src="/js/api.js"></script>
	<script type="text/javascript" src="/js/idLogin.js"></script>
</body>

</html>