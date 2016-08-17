/*
  1.4 문제

  주어진 문자열 내의 모든 공백을 '%20'으로 바꾸는 메서드를 작성하라.
*/

/*
  1.4 해답

  1. 새로운 배열을 만들고 문자열 한글자씩 넣어 주다가
     공백 발견시 공백 대신 %20을 넣어주면 되지만,
     새로운 배열을 요구하므로 다른 방법으로 시도.

  2. splice를 이용해서 구현.
*/

'use strict';

let replaceSpace = function( str )
{
  let i = 0;
  let cnt = 0;

  for( ; i < str.length; i++ )
  {
    if( str[i] == " ")
    {
      cnt++;
    }
  }

  str = str.split('');

  for( i = 0; i < cnt; i++ )
  {
    str.splice( str.indexOf( " " ) , 1 , '%20' );
  }

  str = str.join('');
  return str;
};

console.log( replaceSpace( 'I Love You.' ) );

