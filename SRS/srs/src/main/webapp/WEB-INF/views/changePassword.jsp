<!-- <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%> -->
<!DOCTYPE html>
<html lang="ko">

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SRS : change password</title>

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">

<!-- custum css -->
<link rel="stylesheet" href="/css/reset.css">
<link rel="stylesheet" href="/css/changePassword.css">
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
				<h5 class="subtitle"">비밀번호 변경</h5>
				<form>
					<div class=" form-inline form-group input_form">
						<span class="span_form">현재 비밀번호</span> 
						<input id="old_PW"
							type="password" class="form-control input-lg input_edit" name="oldPW" placeholder="현재 비밀번호를 입력하세요.">
					</div>
					
					<div class="form-inline form-group input_form">
						<span class="span_form">새 비밀번호</span> 
						<input id="new_PW"
							type="password" class="form-control input-lg input_edit" name="newPW"
							placeholder="새 비밀번호를 입력하세요.">
					</div>
					
					<div id="pwInfo" class="pwInfo" style="margin-bottom:10px"></div>
						
					<div class="form-inline form-group input_form">
						<span class="span_form">새 비밀번호(확인)</span>
						<input id="confirm_PW"
							type="password" class="form-control input-lg input_edit" name="confirmPW"
							placeholder="새 비밀번호를 한번 더 입력하세요.">
					</div>
					
					<div id="newSame" class="newSame" style="margin-bottom:10px"></div>
					<div class="wrongAlert"></div>
					
					<div class="btnWrap">
						<button type="reset" class="btn btn-default btn-lg btnCancel">취소</button>
						<button type="submit" class="btn btn-primary btn-lg btnConfirm">확인</button>
					</div>
					<!-- 
					<br></br>
					<div id="forgotPW" class="forgotPW" style="text-align:center; cursor:pointer; margin: 0 auto;color:green;"><U>비밀번호가 생각나지 않으시나요?</U></div>
					 -->
				</form>
			</div>
		</div>
	</div>

	<script type="text/javascript" src="/js/utils.js"></script>
	<script type="text/javascript" src="/js/api.js"></script>
	<script src="/js/changePassword.js"></script>
</body>

</html>