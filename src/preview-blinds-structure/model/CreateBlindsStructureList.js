const CreateBlindStructureList = data => {
  let list = [];
  let initialBlinds = [1, 2];

  for (let x = 0; x < 10; x++) {
    let level = x + 1;
    let minute = data.raiseBlindInterval.minute * level + data.gameTime.minute;
    let second = data.raiseBlindInterval.second * level + data.gameTime.second;

    minute = minute.toString().length === 1 ? '0' + minute : minute;
    second = second.toString().length === 1 ? '0' + second : second;

    let time = minute.toString() + ':' + second.toString();
    let baseBlind = 2 ** x;
    let blind1 = baseBlind * initialBlinds[0];
    let blind2 = baseBlind * initialBlinds[1];
    let blinds = blind1 + '/' + blind2;

    let newItem = {
      Level: level,
      Time: time,
      Blinds: blinds,
    };

    list.push(newItem);
  }

  let minute = data.raiseBlindInterval.minute;
  let second = data.raiseBlindInterval.second;

  second = second.toString().length === 1 ? '0' + second : second;

  let endItem = {
    Level: '...',
    Time: '+' + minute + ':' + second,
    Blinds: '*2',
  };

  list.push(endItem);

  return list;
};

export default CreateBlindStructureList;
