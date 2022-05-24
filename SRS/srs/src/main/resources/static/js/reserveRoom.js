document.addEventListener("DOMContentLoaded", () => {
	console.log("reserveRoom DOM loaded");

	/* 전역 변수 */
	let curUser = null;
	let curRoom = null;

	/* DOM element */
	const _schedule = document.querySelector(".schedule");
	const _backButton = document.querySelector(".backButton");
	const _trackSlot = document.querySelector(".track-slot span");
	const _subRoom = document.querySelector(".subtitle.roomNum span");
	const _subUser = document.querySelector(".subtitle.user span");
	const _subDate = document.querySelector(".subtitle.selectedDate span");
	const _confReserveForm = document.querySelector(".confReserveForm");
	const _inputTitle = document.querySelector("#inputTitle");
	const _st = document.querySelector(".subtitle.times .st");
	const _ft = document.querySelector(".subtitle.times .ft");
	const _timeTable = document.querySelector(".timeTable");
	const _printButton = document.querySelector(".printButton");
	const _closeButton = document.querySelector(".closeButton");
	const _modalBody = document.querySelector(".modal-body");
	const _modalButton = document.querySelector(".modalButton");
	const _selectDate = document.querySelector("#selectDate");
	const _dropButton = document.querySelector(".dropTitles .dropdown-toggle");
	const _dropTitles = document.querySelector(".dropTitles .dropdown-menu");

	const handleSelectTitle = (e) => {
		if (e.target.tagName !== "LI") {
			return;
		}
		_dropButton.innerText = e.target.innerText;
		if (e.target.dataset.value === "input") {
			_dropButton.classList.add("selected");
			_inputTitle.classList.remove("selected");
			_inputTitle.value = "";
			_inputTitle.focus();
		} else {
			_inputTitle.classList.add("selected");
			_dropButton.classList.remove("selected");
			_inputTitle.value = e.target.innerText;
		}
	}

	/* Modal Open 이벤트 핸들러 */
	const handleOpenModal = () => {
		_modalBody.innerHTML = _timeTable.innerHTML;
	}

	/* 출력 이벤트 핸들러 */
	const handlePrint = () => {
		window.print();
	}

	/* 출력 후 실행 */
	const afterPrint = () => {
		_closeButton.click();
	}

	/* 날짜 선택 이벤트 핸들러 */
	const handleSelectDate = (e) => {
		_subDate.innerText = e.target.value;
		getSchedule(e.target.value);
	}

	/* 취소 버튼 클릭 이벤트 핸들러 */
	const handleCancel = (e) => {
		e.preventDefault();
		const cConfirm = customConfirm(`회의실 예약을 취소하시겠습니까?`, "YES", "NO");
		cConfirm.then((value) => {
			if (value) {
				sessionStorage.clear();
				const cAlert = customAlert("", "홈으로 돌아갑니다", "info");
				cAlert.then(v => {
					window.location.replace("/");
				})
			}
		})
	}

	/* 회의실 예약 버튼 클릭 이벤트 핸들러 : 회의실 예약 진행 */
	const handleReserve = (e) => {
		e.preventDefault();
		const cConfirm = customConfirm(`회의실을 예약하시겠습니까?`, "YES", "NO");
		cConfirm.then(async (value) => {
			if (value) {
				const confTitle = _inputTitle.value;
				if (!_st.dataset.time || !_ft.dataset.time) {
					const cAlert = customAlert("", "시간을 설정해 주세요", "warning");
					return;
				}
				const data = {
					noConf: curRoom,
					startDate: _selectDate.value,
					endDate: _selectDate.value,
					startTime: _st.dataset.time,
					endTime: _ft.dataset.time,
					contents: confTitle,
					...curUser
				};
				try {
					const response = await roomAPI.reserve(data);
					if (response.status === 201) {
						const cAlert = customAlert("예약 성공", "회의실 예약이 완료되었습니다.", "success");
						cAlert.then(v => {
							window.location.reload();
						})
					} else if (response.status === 400) {
						const cAlert = customAlert("실패", "다른 회의와 시간이 겹칩니다. 시간을 다시 선택해 주세요.", "error");
						return;
					}
				} catch (e) {
					console.log(e);
				}
			}
		})
	}

	/* 회의 취소 클릭 이벤트 핸들러 : 회의 취소 진행 */
	const handleCancelReserve = (e) => {
		const target = e.currentTarget;
		const title = target.querySelector(".sessionTitle").innerText;
		const cConfirm = customConfirmTitle(title, `회의를 취소하시겠습니까?`, "YES", "NO");
		cConfirm.then(async (value) => {
			if (value) {
				const data = {
					noConf: curRoom,
					startDate: target.dataset.date,
					endDate: target.dataset.date,
					startTime: target.dataset.stime,
					endTime: target.dataset.ftime,
					...curUser
				};
				try {
					const response = await roomAPI.cancel(data);
					if (response.status === 200) {
						const cAlert = customAlert("회의 취소 완료", "회의가 취소되었습니다.", "success");
						cAlert.then(v => {
							window.location.reload();
						})
					} else if (response.status === 403) {
						const cAlert = customAlert("취소 실패", "예약자 본인만 회의를 취소할 수 있습니다", "error");
					}
				} catch (e) {
					console.log(e);
				}
			}
		})
	}

	/* 예약된 회의 목록 화면에 생성 */
	const showStatus = (session) => {
		let stime = session.startTime.split("");
		stime.splice(2, 0, ":").join("");
		stime = stime.join("");
		let ftime = session.endTime.split("");
		ftime.splice(2, 0, ":");
		ftime = ftime.join("");
		const div = document.createElement("div");
		div.dataset.date = session.startDate;
		div.dataset.stime = session.startTime;
		div.dataset.ftime = session.endTime;
		div.className = "session";
		div.style = `grid-row: time-${session.startTime} / time-${session.endTime}`;
		div.innerHTML = `<h3 class="session-title">
        <span class="sessionTitle">[ ${session.contents} ]</span>
        <span class="session-presenter">${session.nmUser}</span>
        </h3>
        <span class="session-time">${stime} - ${ftime}</span>
           `;
		div.addEventListener("click", handleCancelReserve);

		_schedule.appendChild(div);
	}

	/* 예약된 회의 목록 get */
	const getSchedule = async (curDate) => {
		let sessions = document.querySelectorAll(".session");
		if (sessions.length > 0) {
			sessions.forEach(session => session.parentNode.removeChild(session));
		}
		const curRoom = parseInt(getParameterByName("room"));
		const data = {
			noConf: curRoom,
			startDate: curDate,
			endDate: curDate
		}
		try {
			const response = await roomAPI.getList(data);
			if (response.status === 200) {
				const data = await response.json();
				data.forEach(session => showStatus(session));
			}
		} catch (e) {
			console.log(e);
		}
	}

	/* 초기 setting */
	const initSetting = () => {
		const DATE_OPTIONS = {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		};
		let date = convertKST();
		let ndate = date.toLocaleDateString("ko", DATE_OPTIONS).slice(0, -1).split(". ").join("-");
		_selectDate.value = ndate;
		_selectDate.setAttribute("min", ndate);
		const checkedUser = sessionStorage.getItem("checkedUser");
		curUser = JSON.parse(checkedUser);
		curRoom = parseInt(getParameterByName("room"));
		_trackSlot.innerText = curRoom;
		_subRoom.innerText = curRoom;
		_subUser.innerText = curUser.nmUser;
		_subDate.innerText = ndate;
		window.onafterprint = afterPrint;
	}

	const init = () => {
		initSetting();
		getSchedule(_selectDate.value);
		_confReserveForm.addEventListener("submit", handleReserve);
		_confReserveForm.addEventListener("reset", handleCancel);
		_backButton.addEventListener("click", handleCancel);
		_printButton.addEventListener("click", handlePrint);
		_modalButton.addEventListener("click", handleOpenModal);
		_selectDate.addEventListener("change", handleSelectDate);
		_dropTitles.addEventListener("click", handleSelectTitle);
	}

	init();
})