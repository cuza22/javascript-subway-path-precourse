/* eslint-disable require-jsdoc */
import {INPUT, SEARCH} from './constants.js';
import {minPath} from './getMinimum.js';
import {
  display,
  appendDistanceToTable,
  appendPathToTable,
  appendTimeToTable,
} from './display.js';
import {lines} from './data.js';
import {
  createDistanceMessage,
  createResultPathMessage,
  createTimeMessage,
} from './createMessages.js';
import {totalBetweenStations} from './getTotal.js';
import {
  areStationsDifferent,
  areStationsLinked,
  isNameShort,
  isStationAvaliable,
} from './inputValid.js';

export default function App() {
  this.data = lines;
  SEARCH.BUTTON.addEventListener('click', (e) => {
    display(this);
    this.type = changeType();
    isValid(this);
    this.path = minPath(this.data, INPUT.DEPARTURE.value, INPUT.ARRIVAL.value, this.type.value,);
    if (!areStationsLinked(this.path)) {
      window.alert('연결된 역을 입력해주세요!');
      return;
    }
    appendDistanceToTable(createDistanceMessage(totalBetweenStations(this.data, this.path, 'distance')));
    appendTimeToTable(createTimeMessage(totalBetweenStations(this.data, this.path, 'time')));
    appendPathToTable(createResultPathMessage(this.path));
  });
}

function changeType() {
  let type;
  if (SEARCH.TYPE[0].checked == true) {
    type = SEARCH.TYPE[0];
  }
  if (SEARCH.TYPE[1].checked == true) {
    type = SEARCH.TYPE[1];
  }
  return type;
}

function isValid(object) {
  if (isNameShort(INPUT.DEPARTURE.value) || isNameShort(INPUT.ARRIVAL.value)) {
    window.alert('역 이름은 2글자 이상이어야 합니다!');
    return;
  } else if (!isStationAvaliable(INPUT.DEPARTURE.value, object.data) || !isStationAvaliable(INPUT.DEPARTURE.value, object.data)) {
    window.alert('존재하지 않는 역입니다!');
    return;
  } else if (!areStationsDifferent(INPUT.DEPARTURE.value, INPUT.ARRIVAL.value)) {
    window.alert('서로 다른 역을 입력해주세요!');
    return;
  }
}

new App();
