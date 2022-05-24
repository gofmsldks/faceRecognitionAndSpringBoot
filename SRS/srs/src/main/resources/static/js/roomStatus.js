document.addEventListener("DOMContentLoaded", () => {
  console.log("room status loaded");

  /* 회의실 번호를 특정 형식으로 변환시켜 사용하기 위한 함수 : "회의실 1" */
  const confStr = (noConf) => {
    return `회의실 ${noConf}`;
  };

  /* 0900 -> 9, 0930 -> 9.5 로 변경 */
  const convertTime = (time) => {
    const timeArr = sliceStrToArr(time, 2);
    return parseInt(timeArr[0]) + (timeArr[1] === "30" ? 0.5 : 0);
  };

  /* 예약 데이터를 series 배열에 담는 함수 */
  const setAllStatus = (statuses) => {
    const teams = [];
    statuses.forEach((status) => {
      const statusData = {
        x: confStr(status.noConf),
        y: [convertTime(status.startTime), convertTime(status.endTime)],
        title: status.contents,
        user: status.nmUser,
        position: status.nmRank,
      };
      const cdTeam = status.cdTeam;
      const idx = teams.indexOf(cdTeam);
      if (idx < 0) {
        teams.push(cdTeam);
        series.push({
          name: status.nmTeam,
          data: [statusData],
        });
      } else {
        series[idx].data.push(statusData);
      }
    });
  };

  /* 전체 예약데이터 가져오는 함수 */
  const getAllStatus = async () => {
    try {
      const response = await roomAPI.getAllStatus();
      if (response.status === 200) {
        const statuses = await response.json();
        setAllStatus(statuses);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const init = async () => {
    await getAllStatus();
    chart.render();
  };

  init();
});
