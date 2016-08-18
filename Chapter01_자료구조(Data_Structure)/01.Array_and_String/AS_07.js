/*
  1.7 문제

  M x N 행렬을 순회하면서 0인 원소를 발견하면, 해당 원소가 속한
  행과 열의 모든 원소를 0으로 설정하는 알고리즘을 작성하라.
*/

/*
  1.7 해답

  0 발견 시 바로 0으로 교체하게 되면, 순회하면서 계속 0을 만나게 되어
  결국 거의 모든 원소가 0으로 바뀌게 된다.
  여기에서 또 고려할 사항이 나오는데, 어떤 원소가 0인지 기록할 행렬을
  하나 더 만드느냐 마느냐하는 문제가 나온다.
  어떤 행과 열에서 0이 등장했느냐만 중요하기 때문에, 정확한 0원소의
  위치를 기록하기보다 0이 등장한 행과 열만 기록하면 된다.
  이럴경우 O(MN)의 공간이 필요한 전자의 경우보다 효율적으로 풀이할 수 있다.
*/

'use strict';

let searchZeroItem = function( matrix )
{
  let i   = 0 ,
      j   = 0 ,
      row = [] ,
      col = [];

  for( i = 0; i < matrix.length; i++ )
  {
    for( j = 0; j < matrix[ 0 ].length; j++ )
    {
      if( matrix[ i ][ j ] == 0 )
      {
        row[ i ] = true;
        col[ j ] = true;
      }
    }
  }

  for( i = 0; i < matrix.length; i++ )
  {
    for( j = 0; j < matrix[ 0 ].length; j++ )
    {
      if( row[ i ] || col[ j ] )
      {
        matrix[ i ][ j ] = 0;
      }
    }
  }

  return matrix;
};

var matrix = [
  [ 1 , 1 , 1 , 1 , 1 ] ,
  [ 1 , 1 , 0 , 1 , 1 ] ,
  [ 1 , 0 , 1 , 1 , 1 ] ,
  [ 1 , 1 , 1 , 1 , 1 ]
];

console.log( searchZeroItem( matrix ) );

