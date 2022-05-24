/* 전체 예약 현황 그래프 */

/* series : 회의 예약 데이터 담길 배열 */
/* 형식
    {
    x: 회의실 번호,
    y: [시작 시간, 종료 시간]
    title: 회의 제목,
    user: 예약자 이름,
    position: 예약자 직급
    }

예시) {
        x: "회의실 1",
        y: [9, 10.5],
        title: "주간 회의",
        user: "홍성연",
        position: "사원"
      }

 */
const series = [];

/* options : 현황 그래프 option, apexChart 홈페이지 참고 */
/* 
    1. https://apexcharts.com/docs/installation/
    2. 주소 들어가서 왼쪽 navigation에서 Options(Reference) 클릭
    3. 필요한 항목 참고
 */
let options = {
  series,
  chart: {
    height: "100%",
    type: "rangeBar",
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    background: "#fff",
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: "50%",
      rangeBarGroupRows: true,
      dataLabels: {
        hideOverflowingLabels: false,
      },
    },
  },
  colors: [
    "#008FFB",
    "#00E396",
    "#FEB019",
    "#FF4560",
    "#775DD0",
    "#3F51B5",
    "#546E7A",
    "#D4526E",
    "#8D5B4C",
    "#F86624",
    "#D7263D",
    "#1B998B",
    "#2E294E",
    "#F46036",
    "#E2C044",
  ],
  fill: {
    type: "solid",
  },
  xaxis: {
    type: "numeric",
    min: 8,
    max: 19,
    tickAmount: 22,
    decimalsInFloat: 1,
    labels: {
      show: true,
      formatter: (value) => {
        return value % 1 === 0
          ? `${parseInt(value)} : 00`
          : `${parseInt(value)} : 30`;
      },
      style: {
        fontWeight: "bold",
      },
    },
    axisBorder: {
      show: false,
    },
    categories: ["회의실 1", "회의실 2", "회의실 3"],
  },
  yaxis: {
    labels: {
      style: {
        fontWeight: "bold",
      },
    },
    showForNullSeries: true,
    axisBorder: {
      show: true,
    },
  },
  legend: {
    show: true,
    showForSingleSeries: true,
    position: "top",
    onItemClick: {
      toggleDataSeries: false,
    },
    onItemHover: {
      highlightDataSeries: false,
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (value, { seriesIndex, dataPointIndex, w }) {
      if (w !== undefined) {
        return w.config.series[seriesIndex].data[dataPointIndex].user;
      }
      return value;
    },
  },
  tooltip: {
    enabledOnSeries: undefined,
    y: {
      title: {
        formatter: function (
          value,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          return w.config.series[seriesIndex].data[dataPointIndex].user;
        },
      },
    },
    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      if (w !== undefined) {
        const {
          x,
          y: times,
          user,
          title,
          position,
        } = w.config.series[seriesIndex].data[dataPointIndex];
        const vTimes = times.map((v) => {
          return v % 1 === 0 ? `${parseInt(v)} : 00` : `${parseInt(v)} : 30`;
        });
        return `<div class="customTooltip">
       <div> <b>${title}</b></div>
        <div> ${user} ${position}</div>
        <div>${vTimes.join(" ~ ")}</div>
      </div>`;
      }
      return null;
    },
  },
  noData: {
    text: "예약된 회의가 없습니다",
    style: {
      color: "#595959",
      fontSize: "32px",
      fontFamily:
        "'SebangGothic_kr', 'SebangGothic_en', 'Noto Sans KR', sans-serif",
    },
  },
  grid: {
    show: true,
    borderColor: "#e1e1e1",
    strokeDashArray: 7,
    position: "back",
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
    column: {
      colors: ["#DFDFDE", "#fff"],
      opacity: 0.3,
    },
  },
};

let chart = new ApexCharts(document.querySelector("#chart"), options);
