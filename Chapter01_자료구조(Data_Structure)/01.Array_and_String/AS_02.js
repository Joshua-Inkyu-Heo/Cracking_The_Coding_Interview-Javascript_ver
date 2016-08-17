/*
  1.2 문제

  널 문자로 끝나는 문자열을 뒤집는 함수를 C나 C++로 구현하라.
*/

/*
  1.2 해답

  1. 문제의 의도는 포인터를 서로 교체하면서 뒤집는 방식.
     Javascript의 경우 argument 문자열 값이 하나의 배열이기 때문에,
     문자열의 length/에서 0까지 반복출력한다.
     너무 단순한 풀이라 제외.

  2. 동일 배열에서 글자들의 위치만 변경할 수는 없음.
     scope 문제로 인해 새로운 property 만드는 방법으로 풀이.
*/

'use strict';

// 배열로 테스트
// let reverseString = function( str )
// {
//   let i = 0;
//   let temp;
//
//   for( ; i < str.length / 2; i++ )
//   {
//     temp = str[ i ];
//     str[ i ] = str[ str.length - 1 - i ];
//     str[ str.length - 1 - i ] = temp;
//   }트
//   return str;
// };
//
// console.log( reverseString( [1,2,3,4,5] ) );
// console.log( reverseString( [1,2,3,4,5,6] ) );

let reverseString = function( str )
{
  str = str.split('');
  //scope 문제로 새로운 property 만듬
  str.swap();
  str = str.join('');
  return str;
};

Array.prototype.swap = function()
{
  let i = 0;
  let temp;

  for( ; i < this.length / 2; i++ )
  {
    temp = this[ i ];
    this[ i ] = this[ this.length - 1 - i ];
    this[ this.length - 1 - i ] = temp;
  }
  return this;
};

console.log( reverseString( 'abcde' ) );
console.log( reverseString( 'abcdef' ) );

