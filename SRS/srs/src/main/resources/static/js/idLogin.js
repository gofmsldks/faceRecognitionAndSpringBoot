document.addEventListener("DOMContentLoaded", () => {
    console.log("dom loaded");

	/* DOM element */
	const _btnBack = document.querySelector(".btnBack");
    const _btnSubmit = document.querySelector(".btnSubmit");
    const _passwordStart = "5000";
    const _initPassword = "initpass1!";

    /* QueryString */
    const locationUrl = new URL(location.href);
    const urlParams = locationUrl.searchParams;
    const actionType = urlParams.get("type");
	const seatNum = urlParams.get("seat");
	
	/* '홈으로 돌아가기' 버튼 클릭 핸들러 */
	const handleGoBack = (e) => {
		const cConfirm = customConfirm("좌석 예약을 취소하시겠습니까?","네","아니요");
		cConfirm.then(value=>{
			if(value){
				window.location.replace("/");
			}
		})
	}

    /* 아이디,비밀번호 검사 후 알림 메시지 */
    const wrongAlert = (msg) => {
        const div = document.createElement("div");
        div.classList.add("alert");
        div.classList.add("alert-danger");
        div.classList.add("wrongInput");
        div.innerHTML = `<strong>WRONG!</strong> ${msg}`;
        return div;
    }

	/* 좌석 변경 API 호출 */
	const changeSeat = async (user) => {		
		const data = {
			idUser : user.idUser,
			noSeat : seatNum
		}
		
		try{
			const response = await seatAPI.change(data);

			if(response.status === 200){
				const cAlert = customAlert("성공","좌석이 변경되었습니다.","success");
				cAlert.then(value=>{
					window.location.replace("/");
				})
			}else {
				const cAlert = customAlert("오류","서버 오류입니다. 관리자에게 문의하시길 바랍니다.","error");
				cAlert.then(value=>{
					window.location.replace("/");
				})
			}
		}catch(e){
			console.log(e);
		}
	}

	/* 좌석 취소 API 호출 */
	const cancelSeat = async (user) => {		
		const data = {
			idUser : user.idUser,
			noSeat : seatNum
		}
		
		try{
			 const response = await seatAPI.cancel(data);

			if(response.status === 200){
				const cAlert = customAlert("성공","좌석이 취소되었습니다.","success");
				cAlert.then(value=>{
					window.location.replace("/");
				})
			}else if(response.status === 403){
				const cAlert = customAlert("실패","예약자 본인이 아닙니다.","error");
				cAlert.then(value=>{
					window.location.replace("/");
				})
			}
		}catch(e){
			console.log(e);
		}
	}

    /* 좌석 예약 API 호출 */
    const reserveSeat = async (user) => {
        const data = {
            idUser: user.idUser,
            nmUser: user.nmUser,
            noSeat: seatNum,
            cdTeam: user.cdTeam,
            nmTeam: user.nmTeam,
            cdRank: user.cdRank,
            nmRank: user.nmRank,
        }

        try {
            const response = await seatAPI.reserve(data);

            if (response.status === 201) {
                return true;
            } else if (response.status === 200) {
                return false;
            }
        } catch (e) {
            console.log(e);
        }

        return false;
    }

	/* 로그인 API 호출 */
    const login = async (data) => {
        try {
            const response = await userAPI.login(data);

            if (response.status === 200) {
                return await response.json();
            } else if (response.status === 401) {
                return parseInt(response.headers.get("responseMessage"));
            }
        } catch (e) {
            console.log(e);
        }

        return false;
    }

    /* 좌석 예약 or 좌석 취소 버튼 클릭 시 핸들러 */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const _userId = document.querySelector("#userId");
        const _userPw = document.querySelector("#userPw");

        // 아이디 or 패스워드 공백 처리
        if (_userId.value === "") {
			const cAlert = customAlert("","아이디를 입력해주세요.","warning");

            _userId.focus();
            return;
        } else if (_userPw.value === "") {
			const cAlert = customAlert("","비밀번호를 입력해주세요.","warning");
           
            _userPw.focus();
            return;
        }

        const data = {
            userId: _userId.value,
            userPw: _userPw.value
        };

        const user = await login(data);

		/* user===object : 로그인성공 */
        if (typeof user === 'object') {
            //로그인 성공 후 password valid check
            if (userPw.value.startsWith(_passwordStart) || userPw.value === _initPassword) {
                console.log("password invalid");
                const cAlert = customAlert("","비밀번호를 변경하셔야 합니다.","warning");
                cAlert.then(value=>{
                	location.href = `/changePassword?userId=${_userId.value}`;
                	
				})
				return;
            }

            if (actionType === "reservation") {
                console.log("action reservation");
                const flag = await reserveSeat(user);
                if (flag) {
                    const cAlert = customAlert("성공", `${user.nmUser} ${user.nmRank}님 좌석 예약 성공하셨습니다.`, "success");
                    cAlert.then(value => {
                        window.location.replace("/");
                    })
                } else {
					const cConfirm = customConfirm("이미 좌석을 예약하셨습니다. 좌석을 옮기시겠습니까?", "좌석 이동", "취소");
					cConfirm.then(value=>{
						if(value){
							changeSeat(user);
						}else{
							window.location.replace("/");
						}
					})
                }
            } else if (actionType === "cancel") {
                console.log("action cancel");
				cancelSeat(user);
            }
		/* user===number : 로그인실패 */
        } else if (typeof user === 'number') {
            if (user === 0) {
				const cAlert = customAlert("","아이디가 틀렸거나 없는 계정입니다. 다시 확인하세요.","error");
                _userId.focus();
            } else if (user === 2) {
				const cAlert = customAlert("","비밀번호가 틀렸습니다. 비밀번호를 다시 확인하세요.","error");
                _userPw.focus();
            }
        }
    }

	/* 시작 함수 */
    const init = () => {
        if (actionType === "cancel") {
            _btnSubmit.innerText = "좌석 취소";
        }

        _btnSubmit.addEventListener("click", handleSubmit);
		_btnBack.addEventListener("click", handleGoBack);
    }

    init();
});