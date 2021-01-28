//기존함수
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`${src}를 불러오는 도중에 에러가 발생함`));

  document.head.append(script);
}

// usage:
// loadScript('path/script.js', (err, script) => {...})

//프라미스화
let loadScriptPromise = scr => {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      else resolve(src);
    });
  });
};
//사용법:
// loadScriptPromise('path/script.js').then(...)

function promisify(f) {
  return function (...args) {
    // 래퍼 함수를 반환함
    return new Promise((resolve, reject) => {
      function callback(err, result) {
        // f에 사용할 커스텀 콜백
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // 위에서 만든 커스텀 콜백을 함수 f의 인수 끝에 추가합니다.

      f.call(this, ...args); // 기존 함수를 호출합니다.
    });
  };
}
//사용법:
let loadScriptPromise = promisify(loadScript);
//loadScriptPromise(...).then(...)
