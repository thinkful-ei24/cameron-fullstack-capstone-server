const users = [
  {
    '_id': '5bcde58d4e91720a1329ca13',
    'status': 'choosing',
    'username': 'username1234',
    'password': '$2a$10$rtKDtBzm9lLv9N5ruwe4FOqh.luyujfsSv7szbpDoZquBPTK8fl32'
  },
  {
    '_id': '5bce25a839ff3919cb1da31b',
    'status': 'results',
    'username': 'username12345',
    'password': '$2a$10$6NG1EjWdkcV8CxYRn9P9qOIoQzR67cajzXYXjRQb2eXn.ccJyd28q'
  },
  {
    '_id' : '5bd07142bed6a8031e2bb40a',
    'status' : 'results',
    'username' : 'Bob1',
    'password' : '$2a$10$pbvVuRMuUQJR8gWDgOtuhupa4BCRuqGndA3nT9LnKV7TtiUY.R53a'
  }

];

const guesses = [
  {
    '_id': '5bcfa99879cdf1024e4701f8',
    'week1': [
      'Blake',
      'Chase',
      'Chris',
      'Christian',
      'Christon',
      'Darius',
      'Colton',
      'Jake',
      'Jordan',
      'David',
      'Jean Blanc',
      'Leo',
      'Connor',
      'Jason',
      'Lincoln',
      'Garrett',
      'Mike',
      'Wills',
      'Grant',
      'Nick',
      'Ryan'
    ],
    'week2': [
      'Blake',
      'Chase',
      'Chris',
      'Christian',
      'Christon',
      'Darius',
      'Colton',
      'Jake',
      'Jordan',
      'David',
      'Jean Blanc',
      'Leo',
      'Connor',
      'Jason',
      'Lincoln',
      'Garrett',
      'Mike',
      'Wills'
    ],
    'week3': [
      'Blake',
      'Chase',
      'Chris',
      'Christian',
      'Christon',
      'Darius',
      'Colton',
      'Jake',
      'Jordan',
      'David',
      'Jean Blanc',
      'Leo',
      'Connor',
      'Jason',
      'Lincoln'
    ],
    'week4': [
      'Blake',
      'Chase',
      'Chris',
      'Christian',
      'Christon',
      'Darius',
      'Colton',
      'Jake',
      'Jordan',
      'David',
      'Jean Blanc',
      'Leo'
    ],
    'week5': [
      'Blake',
      'Chase',
      'Chris',
      'Christian',
      'Christon',
      'Darius',
      'Colton',
      'Jake',
      'Jordan'
    ],
    'week6': [
      'Blake',
      'Chase',
      'Chris',
      'Christian',
      'Christon',
      'Darius'
    ],
    'week7': [
      'Blake',
      'Chase',
      'Chris',
      'Christian'
    ],
    'week8': [
      'Blake',
      'Chase',
      'Chris'
    ],
    'week9': [
      'Blake',
      'Chase'
    ],
    'week10': [
      'Blake'
    ],
    'userId': '5bce25a839ff3919cb1da31b'
  },
  {
    '_id': '5bd253d32623bc0ad0201d18',
    'week1': [
      'Blake',
      'Chase',
      'Chris',
      'Christon',
      'Clay',
      'Darius',
      'Christian',
      'Garrett',
      'Jean Blanc',
      'Connor',
      'Jason',
      'Kamil',
      'David',
      'Jordan',
      'Nick',
      'Colton',
      'John',
      'Rickey',
      'Joe',
      'Ryan',
      'Jake'
    ],
    'week2': [
      'Blake',
      'Chase',
      'Chris',
      'Christon',
      'Clay',
      'Darius',
      'Christian',
      'Garrett',
      'Jean Blanc',
      'Connor',
      'Jason',
      'Kamil',
      'David',
      'Jordan',
      'Nick',
      'Colton',
      'John',
      'Rickey'
    ],
    'week3': [
      'Blake',
      'Chase',
      'Chris',
      'Christon',
      'Clay',
      'Darius',
      'Christian',
      'Garrett',
      'Jean Blanc',
      'Connor',
      'Jason',
      'Kamil',
      'David',
      'Jordan',
      'Nick'
    ],
    'week4': [
      'Blake',
      'Chase',
      'Chris',
      'Christon',
      'Clay',
      'Darius',
      'Christian',
      'Garrett',
      'Jean Blanc',
      'Connor',
      'Jason',
      'Kamil'
    ],
    'week5': [
      'Blake',
      'Chase',
      'Chris',
      'Christon',
      'Clay',
      'Darius',
      'Christian',
      'Garrett',
      'Jean Blanc'
    ],
    'week6': [
      'Blake',
      'Chase',
      'Chris',
      'Christon',
      'Clay',
      'Darius'
    ],
    'week7': [
      'Blake',
      'Chase',
      'Chris',
      'Christon'
    ],
    'week8': [
      'Blake',
      'Chase',
      'Chris'
    ],
    'week9': [
      'Blake',
      'Chase'
    ],
    'week10': [
      'Blake'
    ],
    'userId': '5bd07142bed6a8031e2bb40a'
  }
];

const results=[
  {
    '_id' : '5bd253d32623bc0ad0201d19',
    'scores' : [
      15,
      26,
      30,
      20,
      15,
      6,
      7,
      8,
      9,
      0
    ],
    'userId' : '5bd07142bed6a8031e2bb40a',
    'username' : 'Bob1'
  },
  {
    '_id' : '5bcfa99879cdf1024e4701f9',
    'scores' : [
      16,
      28,
      33,
      24,
      15,
      6,
      7,
      8,
      9,
      0
    ],
    'userId' : '5bce25a839ff3919cb1da31b',
    'username' : 'username12345'
  }
];

module.exports = {users, guesses, results};