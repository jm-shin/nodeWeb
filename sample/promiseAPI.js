const { response } = require('express');

let names = ['miki', 'niki', 'roki'];

let requests = names.map(name => fetch(`https://api.github.com/users/${names}`));

Promise.all(requests)
  .then(responses => {
    //모든 응답이 성공적으로 이행되었습니다.
    for (let response of responses) {
      alert(`${response.url}: ${response.status}`);
    }
    return responses;
  })
  //응답 메시지가 담긴 배열을 response.json()로 매핑해, 내용을 읽는다.
  .then(responses => Promise.all(responses.map(r => r.json())))
  //JSON 형태의 응답 메시지는 파싱되어 배열 'users'에 저장됩니다.
  .then(users => users.forEach(user => alert(user.name)));

//Promise.all에 전달되는 프라미스 중 하나라도 거부되면, Promise.all이 반환하는 프라미스는 에러와 함꼐 바로 거부됩니다.
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('에러 발생!')), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).catch(alert);

//두번째 프라미스가 거부되면서 Promise.all 전체가 거부되고 .catch()가 실행됩니다. 거부에러는 Promise.all 전체의 결과가 됩니다.
//프라미스가 하나라도 거부되면 Promise.all은 즉시 거부되고 배열에 저장된 다른 프라미스의 결과는 완전히 잊힙니다. 이행된 프라미스의 결과도 무시되죠.

//Promise.allSettle
//Promise.allSettled는 모든 프라미스가 처리될 때까지 기다립니다. 반환되는 배열은 다음과 같은 요소를 갖습니다.

//응답이 성공할 경우 – {status:"fulfilled", value:result}
//에러가 발생한 경우 – {status:"rejected", reason:error}

//fetch를 사용해 여러 사람의 정보를 가져오고 있다고 해봅시다. 여러 요청 중 하나가 실패해도 다른 요청 결과는 여전히 있어야 합니다.
//이럴 때 Promise.allSettled를 사용할 수 있습니다.

if (!Promise.allSettled) {
  Promise.allSettled = promises => {
    return Promise.all(
      promises.map(p =>
        Promise.resolve(p).then(value => ({
          status: 'fulfilled',
          value,
        })),
      ),
      reason => ({
        status: 'rejected',
        reason,
      }),
    );
  };
}

let urls = ['https://api.github.com/users/miki', 'https://api.github.com/users/niki', 'https://no-such-url'];

Promise.allSettled(urls.map(url => fetch(url))).then(results => {
  results.forEach((result, num) => {
    if (result.status == 'fulfilled') {
      alert(`${urls[num]}: ${result.value.status}`);
    }
    if (result.status == 'rejected') {
      alert(`${urls[num]}: ${result.reason}`);
    }
  });
});

/*
  Promise.allSettled 결과
   
  {status: 'fulfilled', value: ...응답...},
  {status: 'fulfilled', value: ...응답...},
  {status: 'rejected', reason: ...에러 객체...}
*/
