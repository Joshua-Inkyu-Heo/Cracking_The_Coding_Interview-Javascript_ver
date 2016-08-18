/*
  1.6 문제

  이미지를 표현하는 N x N 행렬이 있다. 이 때 이 이미지를 90도
  회전시키는 메서드를 작성하라. 부가적인 행렬을 사용하지 않고서도
  할 수 있겠는가?
*/

/*
  1.6 해답

  1. 새로운 행렬을 사용해도 된다면, 각 가로 배열을 뽑아
     새로운 행렬에 세로로 대입하면 된다.
     회전할때의 위치를 확인해보면 규칙이 존재한다는 것을 알 수 있다.

  2. 새로운 행렬을 사용하지 않는다면, 배열 한칸을 temp변수에 넣어놓고
     왼쪽>위, 위>오른쪽, 오른쪽>아래, temp값>왼쪽 에 대입하는 식으로
     반복해주면 된다.

     두 방법 모두 N^2의 시간복잡도가 요구된다.
*/

'use strict';

let rotateMatrix = function( matrix )
{
  // room변수는 반복문으로 matrix.length만큼 반복하여
  // []를 push하는게 확장성에 도움이 된다.
  let i    = 0 ,
      j    = 0 ,
      room = [ [] , [] , [] , [] ] ,
      len  = matrix.length;

  for( ; i < len; i++ )
  {
    for( j = 0; j < len; j++ )
    {
      room[ j ][ len - i ] = matrix[ i ][ j ];
    }
  }
  return room;
};

var matrix = [
  [ 1 , 2 , 3 , 4 ] ,
  [ 5 , 6 , 7 , 8 ] ,
  [ 9 , 'A' , 'B' , 'C' ] ,
  [ 'D' , 'E' , 'F' , 'G' ]
];

console.log( rotateMatrix( matrix ) );

