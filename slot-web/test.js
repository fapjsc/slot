const str = 'EgmPlayingState*>>*97*|*8*|*192.168.10.70*|*False*^*98*|*9*|*192.168.10.71*|*True*^*99*|*12*|*192.168.10.72*|*True*^*100*|*10*|*192.168.10.73*|*False*^**<<*';

const str2 =
  'EgmPlayingState*>>*96*|*7*|*192.168.10.69*|*true*^*97*|*8*|*192.168.10.70*|*False*^*98*|*9*|*192.168.10.71*|*True*^*99*|*12*|*192.168.10.72*|*True*^*100*|*10*|*192.168.10.73*|*False*^**<<*';

const arr = [
  {
    '192.168.10.70': {
      isPlayIng: true,
      map: 97,
      id: 8,
    },
  },
  {
    '192.168.10.71': {
      isPlayIng: true,
      map: 98,
      id: 9,
    },
  },
  {
    '192.168.10.72': {
      isPlayIng: true,
      map: 99,
      id: 12,
    },
  },
  {
    '192.168.10.73': {
      isPlayIng: false,
      map: 100,
      id: 10,
    },
  },
];

const str3 = `I have a dynamic string
'EgmPlayingState*>>*97*|*8*|*192.168.10.70*|*False*^*98*|*9*|*192.168.10.71*|*True*^*99*|*12*|*192.168.10.72*|*True*^*100*|*10*|*192.168.10.73*|*False*^**<<*';

How to convert to
[
  {
    '192.168.10.70': {
      isPlayIng: true,
      map: 97,
      id: 8,
    },
  },
  {
    '192.168.10.71': {
      isPlayIng: true,
      map: 98,
      id: 9,
    },
  },
  {
    '192.168.10.72': {
      isPlayIng: true,
      map: 99,
      id: 12,
    },
  },
  {
    '192.168.10.73': {
      isPlayIng: false,
      map: 100,
      id: 10,
    },
  },
];`;

`sometime may get like this`;

('EgmPlayingState*>>*96*|*7*|*192.168.10.69*|*true*^*97*|*8*|*192.168.10.70*|*False*^*98*|*9*|*192.168.10.71*|*True*^*99*|*12*|*192.168.10.72*|*True*^*100*|*10*|*192.168.10.73*|*False*^**<<*');
