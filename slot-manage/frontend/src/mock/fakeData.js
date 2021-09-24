import faker from 'faker';

const DUMMY_DATA = [];

const formatTimer = times => {
  return times.toLocaleDateString() + ' ' + times.getHours() + ':' + times.getMinutes();
};

for (let i = 0; i < 2000; i++) {
  const data = {
    machine: faker.internet.domainWord(),
    cashIn: faker.datatype.number(),
    cashInTime: formatTimer(new Date(faker.date.recent().getTime())),
    cashOut: faker.datatype.number(),
    cashOutTime: formatTimer(new Date(faker.date.recent().getTime())),
    handPay: faker.datatype.number(),
    jackpot: faker.datatype.number(),
    betAmount: faker.datatype.number(),
    player: faker.name.lastName(),
  };

  DUMMY_DATA.push(data);
}

export default DUMMY_DATA;
