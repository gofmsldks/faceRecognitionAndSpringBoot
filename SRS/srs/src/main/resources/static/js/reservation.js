document.addEventListener("DOMContentLoaded", () => {
	console.log("reservation DOM loaded");

	/* 전역 변수 */
	let teamCode = null;
	let seatNum = null;

	/* DOM element */
	const _seat = document.querySelector(".seat");
	const _btnCancel = document.querySelector(".cancelReserve");
	const _seatBtns = document.querySelectorAll(".seatBtn");
	const _selectTeam = document.querySelector(".selectTeam .defaultOption");
	const _selectMenu = document.querySelector(".selectMenu");
	const _selectUserForm = document.querySelector(".selectUserForm");
	const _rooms = document.querySelector(".rooms");

	/* 선택된 사원 존재 유무 check */
	const getCheckedUser = () => {
		let checkedUser = null;
		const checkValue = _selectUserForm.querySelector("input[type='radio'][name='userRadio']:checked");
		if (checkValue !== null) {
			checkedUser = JSON.parse(checkValue.value);
		}
		return checkedUser;
	}

	/* 회의실 클릭 이벤트 핸들러 */
	const handleClickRoom = (e) => {
		if (e.target.tagName !== "BUTTON") {
			return;
		}
		const checkedUser = getCheckedUser();
		if (checkedUser === null) {
			const cAlert = customAlert("경고", "예약할 사원을 먼저 선택해야 합니다. 오른쪽 리스트에서 사원을 선택하세요.", "warning")
			return;
		}
		sessionStorage.setItem("checkedUser", JSON.stringify(checkedUser));
		location.href = `/room-reservation?room=${e.target.id}`;
	}

	/* 사원리스트 뿌려주는 함수 */
	const drawMembers = (members) => {
		let tempDiv = document.createElement("div");
		members.forEach(member => {
			let div = document.createElement("div");
			div.classList.add("radio");
			div.innerHTML = `<label class="panel panel-default radioLabel">
								<div class="panel-body">
									<input type="radio" name="userRadio" class="userRadio" value=${JSON.stringify(member)}>${member.nmUser} ${member.nmRank}
								</div>
							</label>`;
			tempDiv.appendChild(div);
		})
		_selectUserForm.innerHTML = tempDiv.innerHTML;
	}

	/* 팀 Select Box 선택 시 팀원 가져오는 API 호출 */
	const getMembers = async (cdTeam) => {
		try {
			const response = await userAPI.getMembers(cdTeam);
			if (response.status === 200) {
				drawMembers(await response.json());
			}
		} catch (e) {
			console.log(e);
		}
	}

	/* 팀 Select Box 선택 이벤트 핸들러 */
	const handleSelectTeam = (e) => {
		if (e.target.tagName !== "BUTTON") {
			return;
		}
		const cdTeam = e.target.value;
		if (teamCode === cdTeam) {
			return;
		}
		_selectTeam.innerText = e.target.innerText;
		teamCode = cdTeam;
		getMembers(cdTeam);
	}

	/* 예약된 좌석 클릭시 나오는 디테일 창 셋팅 */
	const setDetail = (element) => {
		const user = JSON.parse(element.dataset.user);
		const _userInfo = document.querySelector(".userInfo");
		const _seatNum = _userInfo.querySelector(".seatNum span");
		const _userId = _userInfo.querySelector(".userId");
		const _name = _userInfo.querySelector(".name");
		const _team = _userInfo.querySelector(".team");
		_seatNum.innerText = user.noSeat;
		_userId.innerText = user.idUser;
		_name.innerText = `${user.nmUser} ${user.nmRank}`;
		_team.innerText = user.nmTeam;
	}

	/* 좌석 취소 API 호출 */
	const cancelSeat = async (idUser, noSeat) => {
		const data = {
			idUser,
			noSeat
		}
		try {
			const response = await seatAPI.cancel(data);
			if (response.status === 200) {
				const cAlert = customAlert("성공", "좌석이 취소되었습니다.", "success");
				cAlert.then(value => {
					window.location.reload();
				})
			} else if (response.status === 403) {
				const cAlert = customAlert("실패", "예약자 본인이 아닙니다.", "error");
				cAlert.then(value => {
					window.location.reload();
				})
			}
		} catch (e) {
			console.log(e);
		}
	}

	/* 디테일 창 내부 '좌석 취소' 클릭 시 이벤트 */
	const handleCancel = (e) => {
		const cConfirm = customConfirm("좌석을 취소하시겠습니까?", "좌석 취소", "아니요");
		cConfirm.then(value => {
			if (value) {
				const idUser = document.querySelector(".userInfo .userId");
				const noSeat = document.querySelector(".userInfo .seatNum span");
				cancelSeat(idUser.innerText, noSeat.innerText);
			}
		})
	}

	/* 좌석 변경 API 호출 */
	const changeSeat = async (user) => {
		const data = {
			idUser: user.idUser,
			noSeat: seatNum
		}

		try {
			const response = await seatAPI.change(data);
			if (response.status === 200) {
				const cAlert = customAlert("성공", "좌석이 변경되었습니다.", "success");
				cAlert.then(value => {
					window.location.replace("/");
				})
			} else {
				const cAlert = customAlert("오류", "서버 오류입니다. 관리자에게 문의하시길 바랍니다.", "error");
				cAlert.then(value => {
					window.location.replace("/");
				})
			}
		} catch (e) {
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

	/* 예약 가능한 좌석인지 체크 */
	const isPossible = (seat) => {
		const classes = seat.classList;
		return !(classes.contains("reserved"));
	}

	/* 좌석 클릭 이벤트 핸들러 */
	const handleClickedSeat = async (e) => {
		if (e.target.tagName !== "BUTTON") {
			return;
		}
		const checkedUser = getCheckedUser();
		if (isPossible(e.target) && checkedUser !== null) {
			seatNum = e.target.id;
			const cConfirm = customConfirmTitle(seatNum, `좌석을 예약하시겠습니까?`, "좌석예약", "취소");
			cConfirm.then(async (value) => {
				if (value) {
					const flag = await reserveSeat(checkedUser);
					if (flag) {
						const cAlert = customAlert("성공", `${checkedUser.nmUser} ${checkedUser.nmRank}님 좌석 예약 성공하셨습니다.`, "success");
						cAlert.then(value => {
							window.location.reload();
						})
					} else {
						const cConfirm = customConfirm("이미 좌석을 예약하셨습니다. 좌석을 옮기시겠습니까?", "좌석 이동", "취소");
						cConfirm.then(value => {
							if (value) {
								changeSeat(checkedUser);
							} else {
								window.location.reload();
							}
						})
					}
				}
			})
		} else if (isPossible(e.target) && checkedUser === null) {
			const cAlert = customAlert("경고", "예약할 사원을 먼저 선택해야 합니다. 오른쪽 리스트에서 사원을 선택하세요.", "warning")
		} else {
			setDetail(e.target);
		}
	}

	/* (현재 사용하지 않는 함수)아이디 로그인 OR 얼굴인식 로그인 창으로 갈 때 사용 */
	/* 현재는 사원 리스트에서 사원 클릭으로 예약하는 방식 */
	/* 좌석 클릭 시 : Confirm Alert or Detail Modal */
	/* const handleClickedSeat = (e) => {
        if (e.target.tagName !== "BUTTON") {
            return;
        }

		if (isPossible(e.target)) {
			const cConfirm = customConfirmTitle(e.target.id, `좌석을 예약하시겠습니까?`, "좌석예약", "취소");
	        cConfirm.then(value => {
	            if (value) {
	                window.location.href = `/face-recognition?type=reservation&seat=${e.target.id}`;
	            }
	        })
		}else {
			setDetail(e.target);
		}
    } */

	/* 좌석 예약 현황 반영 */
	const reflectStatus = async (status) => {
		if (status.noSeat !== null) {
			const _seatId = document.querySelector(`#${status.noSeat}`);
			if (_seatId !== null) {
				_seatId.classList.add("reserved");
				/* 좌석 예약자 정보 */
				_seatId.innerHTML = `${status.nmRank}<br/>${status.nmUser}`;
				_seatId.setAttribute("data-toggle", "modal");
				_seatId.setAttribute("data-target", "#detailModal");
				_seatId.setAttribute("data-user", JSON.stringify(status));
			}
		}
	}

	/* 좌석 예약 정보 가져오기 */
	const getSeatStatus = async () => {
		try {
			const response = await seatAPI.getSeatStatus();
			if (response.status === 200) {
				const seatStatus = await response.json();
				seatStatus.forEach(status => reflectStatus(status));
			}
		} catch (e) {
			console.log(e);
		}
	}

	/* 좌석 정보 가져오기 */
	const getSeatInfo = async () => {
		try {
			const response = await seatAPI.getSeatInfo();
			if (response.status === 200) {
				const seatInfo = await response.json();
				seatInfo.forEach((seat, i) => {
					_seatBtns[i].id = seat.noSeat;
					_seatBtns[i].innerText = seat.noSeat;
					if (seat.ynFix === "Y") {
						_seatBtns[i].setAttribute("disabled", "true");
						_seatBtns[i].classList.add("fixed");
					}
				})
				getSeatStatus();
			}
		} catch (e) {
			console.log(e);
		}
	}

	/* 팀 정보  Select Menu에 입력 */
	const showTeams = (team) => {
		const li = document.createElement("li");
		li.innerHTML = `<button value=${team.cdTeam} class="btn btn-default btn-lg">${team.nmTeam}</button>`;
		_selectMenu.appendChild(li);
	}

	/* 팀 정보 불러오는 API 호출 */
	const getTeams = async () => {
		try {
			const response = await userAPI.getTeams();
			if (response.status === 200) {
				const teams = await response.json();
				teams.forEach(team => showTeams(team));
			}
		} catch (e) {
			console.log(e);
		}
	}

	const init = () => {
		getSeatInfo();
		getTeams();
		_seat.addEventListener("click", handleClickedSeat);
		_btnCancel.addEventListener("click", handleCancel);
		_selectMenu.addEventListener("click", handleSelectTeam);
		_rooms.addEventListener("click", handleClickRoom);
	}

	init();
})