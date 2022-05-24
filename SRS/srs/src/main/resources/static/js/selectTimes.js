const TIME = [
	"0800", "0830", "0900",
	"0930", "1000", "1030",
	"1100", "1130", "1200",
	"1300", "1330", "1400",
	"1430", "1500", "1530",
	"1600", "1630", "1700",
	"1730", "1800", "1830",
	"1900"
];

document.addEventListener("DOMContentLoaded", () => {
	console.log("selectTimes loaded");

	/* 전역 변수 */
	let selectedStartTime = null;
	let selectedFinishTime = null;

	/* DOM element */
	const _selectStart = document.querySelector(".selectStart");
	const _selectFinish = document.querySelector(".selectFinish");
	const _st = document.querySelector(".subtitle.times .st");
	const _ft = document.querySelector(".subtitle.times .ft");

	/* 시간 hh:mm 형식으로 변환 후 반환 */
	const convertTime = (time) => {
		const h = time.slice(0, 2);
		const m = time.slice(2);
		return `${h}:${m}`;
	}

	/* 종료 시간 선택 이벤트 핸들러 */
	const handleSelectFinish = (e) => {
		if (e.target.tagName === "INPUT") {
			selectedFinishTime = e.target.dataset.time;
			if (selectedStartTime !== null && selectedFinishTime !== null) {
				_st.dataset.time = selectedStartTime;
				_ft.dataset.time = selectedFinishTime;
				_st.innerText = convertTime(selectedStartTime);
				_ft.innerText = convertTime(selectedFinishTime);
			}
		}
	}

	/* 시작 시간 선택 이벤트 핸들러 */
	const handleSelectStart = (e) => {
		selectedFinishTime = null;
		_st.innerText = "";
		_ft.innerText = "";
		_st.removeAttribute("data-time");
		_ft.removeAttribute("data-time");
		if (e.target.tagName === "INPUT") {
			const finishes = _selectFinish.querySelectorAll(".cShowRadioInput");
			finishes.forEach(finish => {
				if (finish.checked) {
					finish.checked = false;
				}
				finish.removeAttribute("disabled");
			})
			selectedStartTime = e.target.dataset.time;
			finishes.forEach(finish => {
				if (finish.dataset.time <= selectedStartTime) {
					finish.setAttribute("disabled", true);
				}
			})
		}
	}

	/* custom radio */
	const drawSelectTime = (time, idx, inputName, inputId, parent) => {
		const convertedTime = convertTime(time);
		const div = document.createElement("div");
		div.className = "customRadio";
		div.innerHTML = `<input type="radio" id="${inputId}${idx}" class="cShowRadioInput" data-time="${time}" name="${inputName}" />
              <label for="${inputId}${idx}" class="cShowRadiolabel">${convertedTime}</label>`;
		parent.appendChild(div);
	}

	/* 시작, 종료 시간 화면에 생성 */
	const startTimes = () => {
		const inputName = "selectStart";
		const inputId = "s_cRadio";
		TIME.forEach((time, idx) => drawSelectTime(time, idx, inputName, inputId, _selectStart));
	}

	const finishTimes = () => {
		const inputName = "selectFinish";
		const inputId = "f_cRadio";
		TIME.forEach((time, idx) => drawSelectTime(time, idx, inputName, inputId, _selectFinish));
		const finishes = _selectFinish.querySelectorAll(".cShowRadioInput");
		finishes.forEach(finish => {
			finish.setAttribute("disabled", true);
		})
	}

	const init = () => {
		startTimes();
		finishTimes();
		_selectStart.addEventListener("click", handleSelectStart);
		_selectFinish.addEventListener("click", handleSelectFinish);
	}

	init();
})