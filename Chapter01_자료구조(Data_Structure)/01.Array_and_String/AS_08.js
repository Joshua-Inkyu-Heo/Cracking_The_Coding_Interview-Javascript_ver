/*
  1.8 문제

  한 단어가 다른 단어에 포함된 문자열인지 판별하는 isSubString이라는
  메서드가 있다고 하자. si과 s2의 두 문자열이 주어졌을 때 S2가 S1을
  회전시킨 결과인지 판별하는 코드를 inSubstring 한 번만 호출해서 작성하라.
*/

/*
  1.8 해답

  어디를 회전시키는지 중요치 않다. 한 단어를 2번 쓰게 되면
  그 안에 회전된 문자열이 존재한다.
*/

'use strict';

let isRotated = function( str1 , str2 )
{
  let len1 = str1.length;
  let len2 = str2.length;

  if( len1 === len2 && len1 > 0 )
  {
    let str1str1 = str1 + str1;
    return inSubstring( str1str1 , str2 );
  }
  return false;
};

