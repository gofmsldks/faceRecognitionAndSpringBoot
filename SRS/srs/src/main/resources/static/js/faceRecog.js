document.addEventListener("DOMContentLoaded", () => {
	console.log("dom loaded");
	
	/* DOM element */
	const _userId = document.querySelector(".userId span");
	const _correctRatio = document.querySelector(".correctRatio span");
	
	/* interval 담을 변수 (clear처리)  */
	let resultInterval = null;
	
	/* QueryString */
    const locationUrl = new URL(location.href);
    const urlParams = locationUrl.searchParams;
	const seatNum = urlParams.get("seat");
	
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
	
	/* 좌석 예약 API 호풀 */
	const reserveSeat = async (user) =>{
		try{
			const response = await seatAPI.reserve(user);
			
			if (response.status === 201) {
                return true;
            } else if (response.status === 200) {
                return false;
            }

		}catch(e){
			console.log(e);
		}
		
		return false;
	}
	
	/* 사번으로 user 정보 불러오는 API 호출  */
	const getUserInfo = async (userId) => {
		let user = null;
		
		try{
			const response = await userAPI.getUserInfo(userId);
			
			if(response.status === 200){
				user = await response.json();
			}
		}catch(e){
			console.log(e);
		}
		
		return user;
	}
	
	/* 좌석 예약  */
	const reserveWithFace = async (userId) => {	
		
		let user = await getUserInfo(userId);
		
		if(user === null){
			const cAlert = customAlert("실패","존재하지 않는 사원입니다. 사번을 확인해 주세요","error");
			return;
		}
		user.noSeat = seatNum;
		
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
		
	} 
	
	/* Flask 서버로 부터 얼굴 인식 결과 받는 API 호출 */
	const getResult = async () => {
		const data = {
			"request" : "no"
		}
		
		const response = await userAPI.getFaceResult(data);

		if(response.status === 200){
			const { successResult } = await response.json();
			let first_key = Object.keys(successResult)[0];
			let first_value = successResult[Object.keys(successResult)[0]];
			console.log(first_key, first_value);
			
			let num = first_key.slice(0,8);
			_userId.innerText = num;
			_correctRatio.innerText = first_value;
			
			clearInterval(resultInterval);
			
			reserveWithFace(num);
		}else if(response.status ===500 || response.status === 404 || response.status === 400){
			clearInterval(resultInterval);
		}
	}
	
	/* 시작 함수 */
	const init = () => {
		resultInterval = setInterval(getResult,5000);
	}
	
	init();
});