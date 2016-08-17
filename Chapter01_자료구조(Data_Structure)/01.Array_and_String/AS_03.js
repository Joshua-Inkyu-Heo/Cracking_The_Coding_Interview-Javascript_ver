/*
  1.3 문제

  문자열 2개를 입력받아 그중 하나가 다른 하나의 순열인지 판별하는
  메서드를 작성하라.
*/

/*
  1.3 해답

  1. 두 문자열 정렬 후, 한 글자씩 비교.

  2. 문자 나온 횟수로 판별.
*/

'use strict';

// 1번 풀이법
let checkString = function( str1 , str2 )
{
  let i = 0;
  if( str1.length !== str2.length )
  {
    return false;
  }
  str1 = str1.split( '' );
  str2 = str2.split( '' );
  str1 = str1.sort();
  str2 = str2.sort();

  for( ; i < str1.length; i++ )
  {
    if( str1[ i ] !== str2[ i ] )
    {
      return false;
    }
  }
  return true;
};

// console.log( checkString( 'asdfghjkl' , 'alfsjghdk' ) );
// console.log( checkString( 'asdfkl' , 'alfsjghdk' ) );
// console.log( checkString( 'asdfghjklq' , 'alfsjghdkw' ) );

// 2번 풀이법
let checkString2 = function( str1 , str2 )
{
  let room1 = {};
  let room2 = {};
  let i = 0;

  if( str1.length !== str2.length )
  {
    return false;
  }

  for( ; i < str1.length; i++ )
  {
    if( room1[ str1[ i ] ] )
    {
      room1[ str1[ i ] ] += 1;
    }
    else
    {
      room1[ str1[ i ] ] = 1;
    }

    if( room2[ str2[ i ] ] )
    {
      room2[ str2[ i ] ] += 1;
    }
    else
    {
      room2[ str2[ i ] ] = 1;
    }
  }

  for( i in room1 )
  {
    if( room1[ i ] !== room2[ i ] )
    {
      return false;
    }
  }

  return true;
};

console.log( checkString2( 'abcdeabc' , 'adecbabc' ) );
console.log( checkString2( 'abcdeagc' , 'adecbabc' ) );

