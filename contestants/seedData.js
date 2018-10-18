const {Contestant} = require('./models');
const mongoose = require('mongoose');

const week0 = {weekName: 'week0',
  contestants: [
    {name: 'Alex', photo: ''},
    {name: 'Blake', photo: ''},
    {name: 'Chase', photo: ''},
    {name: 'Chris', photo: ''},
    {name: 'Christian', photo: ''},
    {name: 'Christon', photo: ''},
    {name: 'Clay', photo: ''},
    {name: 'Colton', photo: ''},
    {name: 'Connor',photo: ''},
    {name: 'Darius', photo: ''},
    {name: 'David', photo: ''},
    {name: 'Garrett', photo: ''},
    {name: 'Grant', photo: ''},
    {name: 'Jake', photo: ''},
    {name: 'Jason', photo: ''},
    {name: 'Jean Blanc',photo: ''},
    {name: 'Joe', photo: ''},
    {name: 'John', photo: ''},
    {name: 'Jordan',photo: ''},
    {name: 'Kamil', photo: ''},
    {name: 'Leo', photo: ''},
    {name: 'Lincoln', photo: ''},
    {name: 'Mike', photo: ''},
    {name: 'Nick', photo: ''},
    {name: 'Rickey', photo: ''},
    {name: 'Ryan', photo: ''},
    {name: 'Trent', photo: ''},
    {name: 'Wills', photo: ''},
  ]};

  const week1 = {weekName: 'week1',
  contestants: [
    {name: 'Alex', photo: ''},
    {name: 'Blake', photo: ''},
    {name: 'Chris', photo: ''},
    {name: 'Christon', photo: ''},
    {name: 'Clay', photo: ''},
    {name: 'Colton', photo: ''},
    {name: 'Connor',photo: ''},
    {name: 'David', photo: ''},
    {name: 'Garrett', photo: ''},
    {name: 'Jason', photo: ''},
    {name: 'Jean Blanc',photo: ''},
    {name: 'John', photo: ''},
    {name: 'Jordan',photo: ''},
    {name: 'Leo', photo: ''},
    {name: 'Lincoln', photo: ''},
    {name: 'Mike', photo: ''},
    {name: 'Nick', photo: ''},
    {name: 'Rickey', photo: ''},
    {name: 'Ryan', photo: ''},
    {name: 'Trent', photo: ''},
    {name: 'Wills', photo: ''},
  ]};

const week2 = {weekName: 'week2',
  contestants: [
    {name: 'Blake', photo: ''},
    {name: 'Chris', photo: ''},
    {name: 'Christon', photo: ''},
    {name: 'Clay', photo: ''},
    {name: 'Colton', photo: ''},
    {name: 'Connor',photo: ''},
    {name: 'David', photo: ''},
    {name: 'Garrett', photo: ''},
    {name: 'Jason', photo: ''},
    {name: 'Jean Blanc',photo: ''},
    {name: 'John', photo: ''},
    {name: 'Jordan',photo: ''},
    {name: 'Leo', photo: ''},
    {name: 'Lincoln', photo: ''},
    {name: 'Mike', photo: ''},
    {name: 'Nick', photo: ''},
    {name: 'Ryan', photo: ''},
    {name: 'Wills', photo: ''},
  ]};

const week3 = {weekName: 'week3',
  contestants: [
    {name: 'Blake', photo: ''},
    {name: 'Chris', photo: ''},
    {name: 'Christon', photo: ''},
    {name: 'Colton', photo: ''},
    {name: 'Connor',photo: ''},
    {name: 'David', photo: ''},
    {name: 'Garrett', photo: ''},
    {name: 'Jason', photo: ''},
    {name: 'Jean Blanc',photo: ''},
    {name: 'John', photo: ''},
    {name: 'Jordan',photo: ''},
    {name: 'Leo', photo: ''},
    {name: 'Lincoln', photo: ''},
    {name: 'Nick', photo: ''},
    {name: 'Wills', photo: ''},
  ]};

const week4 = {weekName: 'week4',
  contestants: [
    {name: 'Blake', photo: ''},
    {name: 'Chris', photo: ''},
    {name: 'Colton', photo: ''},
    {name: 'Connor',photo: ''},
    {name: 'David', photo: ''},
    {name: 'Garrett', photo: ''},
    {name: 'Jason', photo: ''},
    {name: 'John', photo: ''},
    {name: 'Jordan',photo: ''},
    {name: 'Leo', photo: ''},
    {name: 'Lincoln', photo: ''},
    {name: 'Wills', photo: ''},
  ]};  

const week5 = {weekName: 'week5',
  contestants: [
    {name: 'Blake', photo: ''},
    {name: 'Chris', photo: ''},
    {name: 'Colton', photo: ''},
    {name: 'Connor',photo: ''},
    {name: 'Garrett', photo: ''},
    {name: 'Jason', photo: ''},
    {name: 'Leo', photo: ''},
    {name: 'Lincoln', photo: ''},
    {name: 'Wills', photo: ''},
  ]};  

const week6 = {weekName: 'week6',
  contestants: [
    {name: 'Blake', photo: ''},
    {name: 'Colton', photo: ''},
    {name: 'Garrett', photo: ''},
    {name: 'Jason', photo: ''},
    {name: 'Leo', photo: ''},
    {name: 'Wills', photo: ''},
  ]}; 
  
const week7 = {weekName: 'week7',
  contestants: [
    {name: 'Blake', photo: ''},
    {name: 'Colton', photo: ''},
    {name: 'Garrett', photo: ''},
    {name: 'Jason', photo: ''}
  ]};  

const week8 = {weekName: 'week8',
  contestants: [
    {name: 'Blake', photo: ''},
    {name: 'Garrett', photo: ''},
    {name: 'Jason', photo: ''}
  ]}; 

const week9 = {weekName: 'week9',
  contestants: [
    {name: 'Blake', photo: ''},
    {name: 'Garrett', photo: ''}
  ]}; 

const week10 = {weekName: 'week10',
  contestants: [
    {name: 'Garrett', photo: ''}
  ]};
  

db.contestants.insertMany([week0, week1, week2, week3, week4, week5, week6, week7, week8, week9, week10]);  
  









