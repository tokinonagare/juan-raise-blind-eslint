

const CreateBlindStructureList = (data) => {
    let list = [];

    let startTime = [ 0, 0 ];
    let initialBlinds = [1, 2];

    for (let x = 0; x < 10; x++)
    {
      let level = x + 1;
      let minute = ((data.duration.minute * level) + startTime[0]);
      let second = ((data.duration.second * level) + startTime[1]);
      if (minute.toString().length == 1)
      {
        minute = "0" + minute;
      }
      if (second.toString().length == 1)
      {
        second = "0" + second;
      }
      let time = minute.toString() + ":" + second.toString();
      let baseBlind = data.interval ** x;
      let blind1 = baseBlind * initialBlinds[0];
      let blind2 = baseBlind * initialBlinds[1];
      let blinds = blind1 + "/" + blind2;
      let newItem = { Level: level, Time: time, Blinds: blinds };
      list.push(newItem);
    }
    let minute = data.duration.minute;
    let second = data.duration.second;
    if (second.toString().length == 1)
    {
      second = "0" + second;
    }

    let endItem = { Level: '...', Time: ('+' + minute + ':' + second), Blinds: (data.interval == 1 ? 'Blinds raise off' : '*' + data.interval)}
    list.push(endItem);
    
    return list;
}

export default CreateBlindStructureList;
