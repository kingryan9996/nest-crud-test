// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import fs from 'fs'
// fs 자체 내장기능
let fs = require('fs');
let db = require('data/db.json');
// import db from 'data/db.json'
// let db = require('data/db.json')  import랑 똑같다.

export default function handler(req, res) {

  const { method, body } = req;
  switch (method) {
    case 'GET': dataGet(); break;
    case 'POST': dataCreate(); break;
    case 'PUT': dataUpdate(); break;
    case 'DELETE': dataDelete(); break;
  }


  function dataGet() {
    res.status(200).json(db)
  }

  function dataCreate() {
    db.push(body);
    saveData()
    //실제 db파일에 text작성되게 만드는거
  }

  function dataUpdate() {
    let user = db.find(obj => obj.id == body.id);
    console.log('find종료')
    // console.log(user) //찾아둔 값
    Object.assign(user, body)
    console.log('병합종료')
    console.log(db)

    // target = [a : 1 ,b : 2]
    // source = [b : 4 ,c : 5]
    // Object.assign(target, source)
    //  [ a : 1, b : 4, c : 5]  똑같은 값이 있으면 뒤에있는 녀석걸로 덮어씀
    // fs.writeFileSync('data/db.json', JSON.stringify(db))

    // fs.writeFileSync('data/db.json', JSON.stringify(db)); " saveData함수안에 넣어서 쓰기로함"
    saveData()
  }

  function dataDelete() {
    //db = db.filter(obj => obj.id !== body); //아이디와 같은값만 제거하기
    console.log(body)
    db = db.filter(obj => obj.id !== body);
    saveData();
  }
  function saveData() {
    fs.writeFileSync('data/db.json', JSON.stringify(db));
    res.status(200).json(db)
    // res.status(200).json(db) <- api가 요청하면 다시 보내줘야하는데, 그 작성법
  }

}
