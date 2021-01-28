//async 와 await 라는 특별한 문법을 사용하면 프라미스를 좀 더 편하게 사용할 수 있습니다.

const { use } = require('passport');

//async 함수
async function f() {
  //function 앞에 async를 붙이면 해당 함수는 항상 프라미스를 반환합니다.
  return 'f';
}

f().then(alert);

//이렇게도 프라미스 반환 가능.
async function f2() {
  return Promise.resolve(1);
}

//await 문법
//await은 async 함수 안에서만 동작합니다.
let value = await Promise;
//자바스크립트는 await 키워드를 만나면 프라미스가 settled될 때까지 기다립니다. 결과는 그 이후에 반환됩니다.

async function setTimeoutF() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('완료!'), 1000);
  });

  let result = await promise; //프라미스가 이행될 때 까지 기다림.

  alert(result);
}

setTimeoutF();

//일반 함수엔 await을 사용할 수 없습니다. async 함수가 아닌데 await을 사용하면 문법 에러가 발생. Syntax error.

async function showAvator() {
  //JSON 읽기
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  //github 사용자 정보 읽기
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  //아바타 보여주기
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = 'promise-avatar-example';
  document.body.append(img);

  //3초 대기
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  });

  img.remove();

  return githubUser;
}
