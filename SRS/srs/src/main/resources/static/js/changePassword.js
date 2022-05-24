document.addEventListener("DOMContentLoaded", () => {
	console.log("dom loaded");
	const _btnCancel = document.querySelector(".btnCancel");
	const _btnSubmit = document.querySelector(".btnConfirm");
	const _oldPW = document.querySelector("#old_PW");
	const _newPW = document.querySelector("#new_PW");
	const _confirmPW = document.querySelector("#confirm_PW");
//	const _forgotPW = document.querySelector("#forgotPW");
	const _error = "Error";
	// 화면 alert 변수
	var alert = null;
	const _initPass = "initpass1!";
	const _wrongAlert = document.querySelector(".wrongAlert");
	
	/*비밀번호 변경 */
	const changePW = async (userId,pw)=>{
		const data = {
			userId: userId ,
			userPw: pw
		};
		
		try{
			const response = await userAPI.changePassword(data);
			
			if(response.status === 200){
				alert  = customAlert("성공","비밀번호 변경이 완료되었습니다.","success");
				alert.then(value=>{
					if(pw === _initPass) {
						window.location.replace("/login");
					} else {
						window.location.replace("/");
					}
					
				})
                return;
				
			} else {
				alert = customAlert(_error,"비밀번호 변경 중 오류가 발생하였습니다.","error");
	            return false;
			}
		}catch(e){
			console.log(e);
		}
		return false;
		
	}
	
	/*기존 비밀번호 체크 */
	const checkPw = async (oldPW)=>{
		console.log("checkPw");
		const locationUrl = new URL(location.href);
		const urlParams = locationUrl.searchParams;
		const userId = urlParams.get("userId");
		const userPw = oldPW;
		
		var isPWValid = false;
		
		const data = {
				userId:userId ,
				userPw:userPw 
		};
		
		try{
			const response = await userAPI.checkPassword(data);
			
			if(response.status === 200){
				if(_newPW.value === _confirmPW.value) {
					isPWValid = validationPW(_newPW.value);
					if(isPWValid) {
						changePW(userId,_newPW.value);
						return true;	
					}
				} else {
					alert = customAlert("","새로운 비밀번호가 일치하지 않습니다.","error");
					alert.then(value => {
						_confirmPW.focus();
                    })
					return false
				}
							
			} else {
				alert = customAlert("","현재 비밀번호가 일치하지 않습니다.","error");
				alert.then(value => {
					_oldPW.focus();
                })
	            return false;
			}
		}catch(e){
			console.log(e);
		}
		return false;		
	}
	
	/*비밀번호 유효성 검사 */
	function validationPW(pw) {		
		var num = pw.search(/[0-9]/g);
		var eng = pw.search(/[a-z]/ig);
		var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

		if(pw.length === 0)
		{
			document.getElementById('pwInfo').innerHTML='비밀번호는 영문, 숫자, 특수문자 조합으로 8자리 이상 사용해야 합니다.';
            document.getElementById('pwInfo').style.color='red';
		} else if(pw.length < 8 || pw.length > 20){
			document.getElementById('pwInfo').innerHTML='8자리 ~ 20자리 이내로 입력해주세요.';
            document.getElementById('pwInfo').style.color='red';
		    return false;
		}else if(pw.search(/\s/) != -1){
			document.getElementById('pwInfo').innerHTML='비밀번호는 공백 없이 입력해주세요.';
            document.getElementById('pwInfo').style.color='red';
		    return false;
		}else if(num < 0 || eng < 0 || spe < 0 ){
			document.getElementById('pwInfo').innerHTML='영문,숫자,특수문자를 혼합하여 입력해주세요.';
            document.getElementById('pwInfo').style.color='red';
		    return false;
		}else {
			console.log("통과"); 
			document.getElementById('pwInfo').innerHTML='사용가능';
			document.getElementById('pwInfo').style.color='blue';
			return true;
		}
	}
	
	/*확인 버튼 클릭*/
	const handleConfirm = (e)=>{
		e.preventDefault();
		 
		if (_oldPW.value === "" || _newPW.value === "" || _confirmPW.value === "") {
			alert = customAlert("","모든 정보는 필수 입력사항 입니다.","warning");
			return;
		}
		
		if(_oldPW.value === _newPW.value) {
			alert = customAlert("","이전 비밀번호는 다시 사용할 수 없습니다.","error");
			return;
		}
		
		const flag = checkPw(_oldPW.value);
		if(!flag) {
			alert = customAlert(_error,"비밀번호 변경 중 오류가 발생하였습니다.","error");
			return;
		}
		
	}
	
	/*취소 버튼 클릭*/
	const handleCancel = (e)=>{
		e.preventDefault();
		document.getElementById('newSame').innerHTML='';
		alert = customConfirm("비밀번호 변경을 취소 하시겠습니까?","예","아니오");
		alert.then(value=>{
			if(value){
				window.location.replace("/login");
			}
		})
	}
	
	/*새로운 비밀번호 동적 keyEvent*/
	const updateNewValue = (e)=>{
		e.preventDefault();
		document.getElementById('newSame').innerHTML='';
		validationPW(_newPW.value);
	}
	
	/*새로운 비밀번호 재확인 동적 keyEvent*/
	const updateConfirmValue = (e)=>{
		e.preventDefault();
		document.getElementById('pwInfo').innerHTML='';
		
		if(_newPW.value !== _confirmPW.value) {
			document.getElementById('newSame').innerHTML='새로운 비밀번호가 다릅니다.';
            document.getElementById('newSame').style.color='red';
		} else {
			if(_confirmPW.value === "") {
				document.getElementById('newSame').innerHTML='';
			} else {
				document.getElementById('newSame').innerHTML='비밀번호 일치';
	            document.getElementById('newSame').style.color='blue';	
			}			
		}
	}
	
	/*비밀번호 초기화 및 변경*/
	const changeInitPass = (e)=>{
		e.preventDefault();
		const locationUrl = new URL(location.href);
		const urlParams = locationUrl.searchParams;
		const userId = urlParams.get("userId");
		console.log("changeInitPass userId->" + userId); 
		
		alert = customAlert("임시 비밀번호", "initpass1! 으로 변경됩니다.","success");
		alert.then(value=>{
			changePW(userId,_initPass);
		})
        return;

	}
	
	_btnCancel.addEventListener("click",handleCancel);
	_btnSubmit.addEventListener("click",handleConfirm);
	_newPW.addEventListener('keyup', updateNewValue);
	_confirmPW.addEventListener('keyup', updateConfirmValue);
//	_forgotPW.addEventListener('click', changeInitPass);
	
});