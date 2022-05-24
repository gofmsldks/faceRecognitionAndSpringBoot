const ContentType = {
  "Content-Type": "application/json",
};

/* USER API */
const userAPI = {
  /* 로그인 */
  /* data = { userId, userPw } */
  login: (data) =>
    fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: ContentType,
    }),
  /* 비밀번호 변경 */
  /* data = { userId, userPw } */
  changePassword: () =>
    fetch("/api/user/updatePassword", {
      method: "POST",
      body: JSON.stringify(data),
      headers: ContentType,
    }),
  /* data = { userId, userPw } */
  checkPassword: (data) =>
    fetch("/api/user/getPassword", {
      method: "POST",
      body: JSON.stringify(data),
      headers: ContentType,
    }),
  /* 얼굴인식 결과 : 일치하는 사원의 사번, 일치율 제공 */
  /* data = { "request" : "no" } */
  getFaceResult: (data) =>
    fetch("/api/user/get-face-result", {
      method: "POST",
      body: JSON.stringify(data),
      headers: ContentType,
    }),
  /* user정보 가져오기 */
  /* data = userId(String) */
  getUserInfo: (data) =>
    fetch("/api/user/getuserinfo", {
      method: "POST",
      body: data,
      headers: ContentType,
    }),
  /* team 정보 불러오기 */
  getTeams: () =>
    fetch("/api/user/teams", {
      method: "GET",
      headers: ContentType,
    }),
  /* team에 따른 팀원 정보 불러오기 */
  /* data = cdTeam(String) */
  getMembers: (data) =>
    fetch("/api/user/getmembers", {
      method: "POST",
      body: data,
      headers: ContentType,
    }),
};

/* SEAT API */
const seatAPI = {
  /* 좌석 정보 가져오기 */
  getSeatInfo: () =>
    fetch("/api/seat/seatInfo", {
      method: "GET",
      headers: ContentType,
    }),
  /* 좌석 예약 정보 가져오기 */
  getSeatStatus: () =>
    fetch("/api/seat/getStatus", {
      method: "GET",
      headers: ContentType,
    }),
  /* 얼굴인식으로 로그인 했을 경우, 좌석 예약 */
  /* data = { idUser, nmUser, noSeat, cdTeam, nmTeam, cdRank, nmRank } */
  reserveWithFace: (data) =>
    fetch("/api/seat/face-reserve", {
      method: "POST",
      body: JSON.stringify(data),
      headers: ContentType,
    }),
  /* 좌석 예약 */
  /* data = { idUser, nmUser, noSeat, cdTeam, nmTeam, cdRank, nmRank } */
  reserve: (data) =>
    fetch("/api/seat/reserve", {
      method: "POST",
      body: JSON.stringify(data),
      headers: ContentType,
    }),
  /* 좌석 취소 */
  /* data = { idUser, noSeat } */
  cancel: (data) =>
    fetch("/api/seat/cancel", {
      method: "POST",
      body: JSON.stringify(data),
      headers: ContentType,
    }),
  /* 좌석 변경 */
  /* data = { idUser, noSeat } */
  change: (data) =>
    fetch("/api/seat/change", {
      method: "POST",
      body: JSON.stringify(data),
      headers: ContentType,
    }),
};

/* ROOM API */
const roomAPI = {
  /* 예약된 회의 목록 get */
  /* data = { noConf,startDate, endDate } */
  getList: (data) =>
    fetch("/api/room/getList", {
      method: "POST",
      body: JSON.stringify(data),
      headers: ContentType,
    }),
  /* 회의실 예약  */
  /* data = { noConf, startDate, endDate, startTime, endTime, contents, idUser, nmUser, cdTeam, nmTeam, cdRank, nmRank } */
  reserve: (data) =>
    fetch("/api/room/reserve", {
      method: "POST",
      body: JSON.stringify(data),
      headers: ContentType,
    }),
  /* 회의 취소  */
  /* data = { noConf, startDate, endDate, startTime, endTime, contents, idUser, nmUser, cdTeam, nmTeam, cdRank, nmRank } */
  cancel: (data) =>
    fetch("/api/room/cancel", {
      method: "POST",
      body: JSON.stringify(data),
      headers: ContentType,
    }),
  /* 예약 현황 전체 */
  getAllStatus: () =>
    fetch("/api/room/getAllStatus", {
      method: "GET",
      headers: ContentType,
    }),
};
