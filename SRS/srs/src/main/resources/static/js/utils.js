/* Date UTC -> KST로 변환 후 반환 */
const convertKST = () => {
  const curDate = new Date();
  const UTC = curDate.getTime() + curDate.getTimezoneOffset() * 60 * 1000;
  const KR_DIFF = 9 * 60 * 60 * 1000;
  return new Date(UTC + KR_DIFF);
};

/* 우측 상단 시계 */
const showTime = () => {
  const _cdate = document.querySelector(".cdate");
  const _cday = document.querySelector(".cday");
  const _curTime = document.querySelector(".curTime");

  const WEEKDAY = ["일", "월", "화", "수", "목", "금", "토"];
  const today = convertKST();

  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const date = ("0" + today.getDate()).slice(-2);
  const day = today.getDay();

  const dateString = `${month}월 ${date}일`;
  const dayString = `${WEEKDAY[day]}요일`;

  const hours = ("0" + today.getHours()).slice(-2);
  const minutes = ("0" + today.getMinutes()).slice(-2);

  const timeString = `${hours}시 ${minutes}분`;

  _cdate.innerText = dateString;
  _cday.innerText = dayString;
  _curTime.innerText = timeString;
};

/* 알림창 */
/* [flag]
- warning
- error
- success
- info */

/* 제목, 메시지, 확인 버튼  */
const customAlert = (title, msg, flag) => {
  return swal(title, msg, flag, {
    button: "확인",
  });
};

/* 메세지, 확인 버튼, 취소 버튼 */
const customConfirm = (msg, successBtn, cancelBtn) => {
  return swal(msg, {
    buttons: [cancelBtn, successBtn],
  });
};

/* 제목, 메세지, 확인 버튼, 취소 버튼 */
const customConfirmTitle = (title, msg, successBtn, cancelBtn) => {
  return swal(title, msg, {
    buttons: [cancelBtn, successBtn],
  });
};

/* 폰번호 010-xxxx-xxxx 방식으로 표기 */
const phoneValidator = (phone) => {
  phone = phone.replace(/[^0-9]/g, "");
  return phone.replace(
    /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
    "$1-$2-$3"
  );
};

const getParameterByName = (name) => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results == null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};

/* length의 길이 만큼 글자 자르기
(length의 길이만큼 잘라서 배열로 return)
 */
const sliceStrToArr = (str, length) => {
  return str.match(new RegExp(".{1," + length + "}", "g"));
};

showTime();
window.setInterval(showTime, 50000);
window.setInterval(() => location.reload(), 43200000);
