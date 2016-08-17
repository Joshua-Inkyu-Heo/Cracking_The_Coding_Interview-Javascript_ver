/*
  1.5 문제

  같은 문자가 연속으로 반복될 경우 그 횟수를 사용해 문자열을 압축하라.
  만약 aabcccccaaa라면 a2b1c5a3과 같이 압축되어야 한다.
  압축 결과가 원래의 문자열보다 길다면 원래의 문자열을 반환할 것.
*/

/*
  1.5 해답

  기준이 되는 index와 그다음 값 (index + 1)을 비교하여
  같다면 count를 1 증가시키고, 아니면 다음 index의
  문자로 넘어가는 방식으로 풀이.
*/

'use strict';

let compactString = function( str )
{
  let room = [];
  room.push( str[ 0 ] );
  let i = 0;
  let cnt = 1;

  for( ; i < str.length; i++ )
  {
    if( str[ i ] === str[ i + 1 ] )
    {
      cnt++;
    }
    else
    {
      room.push( cnt );
      if( i < str.length-1 )
      {
        room.push( str[ i + 1 ] );
      }
      cnt = 1;
    }
  }

  if( room < str )
  {
    return room.join('');
  }
  else
  {
    return str;
  }
};

console.log( compactString( 'aabcccccaaa' ) );

