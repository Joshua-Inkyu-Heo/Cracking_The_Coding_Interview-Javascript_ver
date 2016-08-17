/*
  1.1 문제

  문자열에 포함된 문자들이 전부 유일한지를 검사하는 알고리즘.
  다른 자료구조를 사용할 수 없는 상황.
*/

/*
  1.1 해답

  1. Bouble Sort 처럼 각 글자를 모든 글자와 대응해 보는 방법.
     O(n^2)의 시간복잡도 예상.

  2. 한 글자만 pop 해서 따로 저장하고 남은 문자들을 indexOf로 비교해 보는 방법.

  3. Object 이용해서 각 글자를 key로 만들어 중복확인.
     이 방법으로 풀이.
*/

'use strict';

let hasUniqueChar = function( str )
{
  let i = 0;
  let room = {};

  for( ; i < str.length; i++ )
  {
    // 중복된 글자가 하나라도 나올 시 바로 false 리턴
    if( room[ str[ i ] ] )
    {
      console.log( 'Duplicate ' + "\'" + str[ i ] + "\'" );
      return false;
    }
    room[ str[ i ] ] = str[ i ];
  }
  return true;
};

console.log( hasUniqueChar( 'abcdefg' ) );
console.log( hasUniqueChar( 'abcdefga' ) );
console.log( hasUniqueChar( 'ajfiegnrie' ) );

