//'마이크로태스크 큐'라고 불리는 내부 '프라미스잡'큐에 들어가서 처리되기 때문에 프라미스 핸들링은 항상 비동기로 처리된다.
// 따라서 .then/catch/finally 핸들러는 항상 현재 코드가 종료되고 난 후에 호출됩니다.
// 어떤 코드조각을 .then/catch/finally 가 호출된 이후에 실행하고 싶다면 .then을 체인에 추가하고 이안에 코드 조각을 넣으면 됩니다.

let promise = new Promise((resolve, reject) => {
  //executor (제작, '가수');
  //new Promise에 전달되는 함수는 executor라고 부릅니다. excutor는 new Promise가 만들어질 때 자동으로 실행되는데, 결과를 최종적으로 만들어내는 제작코드를 포함시킵니다.
  //excutor에 인수 resolve와 reject는 자바스크립트가 자체적으로 제공하는 콜백입니다. 개발자는 resolve와 reject를 신경쓰지 않고 executor안 코드만 집중합니다.
  //대신 executor에선 결과를 즉시 얻던, 늦게 언던 상관없이 상황에 따라 인수를 넘겨준 콜백하나를 반드시 호출해야함.

  resolve('성공'); //일이 성공적으로 끝난 경우, 그 결과를 나타내는 value와 함께 호출
  reject('실패'); //에러 발생 시 에러 객체를 나타내는 error와 함께 호출
});

//요약하면 executor는 자동으로 실행되는데 여기서 원하는 일이 처리됩니다. 처리가 끝나면 executor는 처리 성공 여부에 따라 resolve나 reject를 호출 합니다.
//state -처음엔 "pending"(보류)이었다 resolve가 호출 되면 "fulfilled", reject가 호출되면 "rejected"로 변합니다.
//result -처음엔 undefined 이었다. resolve(value)가 호출되면 value로, reject(error)가 호출 되면 error로 변합니다.

promise.then(
  function (result) {}, //첫번째 인수는 프라미스가 이행되었을 때 실행되는 함수, 여기서 실행 결과를 받습니다.
  function (error) {}, //두번째 인수는 프라미스가 거부 되었을 때 실행되는 함수, 여기서 에러를 받습니다.
);

let promiseResolve = new Promise((resolve, reject) => {
  setTimeout(() => resolve('done!'), 1000);
});

//resolve 함수는 .then의 첫번째 함수(인수)를 실행합니다.
promiseResolve.then(
  result => alert(result), //1초 후 "done!"을 출력
  error => alert(error), //실행되지 않음
);

//작업이 성공적으로 처리된 경우만 다루고 싶다면 .then에 인수를 하나만 전달하면 됩니다.

// catch
// 반대로 에러만 발생한 경우를 다루고 싶다면 .then(null, errorHandlingFunction)과 같이 null을 첫번째 인수로 전달하면 됩니다.
// 또한 catch를 사용해서 .catch(errorHandlingFunction)을 사용해도 됩니다. 즉, .catch는 .then 에 null을 전달하는 것과 동일하게 작동합니다.

let promiseReject = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('에러 발생!')), 1000;
  });
});
// .catch(f)은 promise.then(null, f)과 동일하게 작동합니다.
promiseReject.catch(alert); //1초 뒤 "Error: 에러발생!" 출력

//finally
// try{...} catch{...} 에 finally 절이 있는 것 처럼, 프라미스에도 finally가 있습니다.
//프라미스가 처리되면 f가 항상 실행된다는 점에서 finally(f)는 .then(f, f)와 유사

//결과야 어떻든 마무리가 필요하면 finally가 유용합니다.

let promiseFinally = new Promise((resolve, reject) => {}).finally(() => '로딩 인디케이터 중지');
// .then(result => 'result와 err 보여줌' => 'error 보여줌');

//finally는 프라미스의 결과를 처리하기 위해 만들어진게 아님.

//기존 callback 함수
let loadScript = (src, callback) => {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`${src}를 불러오는 도중에 에러가 발생함.`));

  document.head.append(script);
};

// Promise 객체로 변환
let loadScriptPromise = src => {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    script.src = src;

    script.onload = resolve(script);
    script.onerror = reject(script);

    document.head.append(script);
  });
};

//사용법
let foo = loadScriptPromise('https://cdnjs.cloudflare.com/libs/lodash.js/4.17.11/lodash.js');
foo.then(
  script => alert(`${script.src}를 불러왔습니다.`),
  error => alert(`Error: ${error.message}`),
);

foo.then(script => alert(`또 다른 핸들러...`));

function delay(ms) {
  //여기에 코드 작성
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

delay(3000).then(() => alert('3초후 실행'));
