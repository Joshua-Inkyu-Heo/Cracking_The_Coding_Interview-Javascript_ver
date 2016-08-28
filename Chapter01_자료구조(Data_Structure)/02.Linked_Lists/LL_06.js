/*
  2.6 문제

  순환 연결 리스트가 주어졌을 때, 순환되는 부분의 첫 노드를 반환하는
  알고리즘을 작성하라.
*/

/*
  2.6 해답

  이 문제는 연결 리스트에 루프가 존재하는지 찾으라는 고전적 면접 문제를
  변경한 것이다. 먼저 연결 리스트에 루프가 있는지 검사를 하고,
  언제 충돌하는지 검사한 다음, 그것을 토대로 루프 시작점을 찾으면 된다.

  트랙에서 도는 자동차를 생각해보면, 느린 자동차는 언젠가 빠른 자동차에게
  따라잡히는 것을 떠올릴 수 있다. 두 개의 포인터를 사용하여 하나는 한 칸씩
  다른 하나는 두 칸씩 전진하다 보면 언젠가 서로 충돌하게 된다.
  이렇게 루프라는 것을 알아낼 수 있다.

  순환되는 루프의 첫 노드가 있다는 것은 루프가 아닌 부분도 있다는 것이다.
  충돌하는 부분을 알기 위해선 약간의 공식이 요구된다.
  코드로 표현하면  문단의 방식을 적용하여 쉽게 짤 수 있다. 하지만 설명을 하자면
  현재 빠른 노드가 느린 노드를 시간당 1칸씩 따라잡고 있으므로,
  빠른 노드가 느린 노드를 따라잡아야 하는 노드의 길이 만큼 느린 노드가 이동했을 때,
  충돌하게 된다.

  이것을 그림으로 그려보았을 때, head의 위치, 충돌 점의 위치가
  순환 시작에서 동일하게 떨어져 있는 것을 알 수 있다.
  그러므로, 충돌 시 한 포인트를 head로 옮기고, 다른 포인트를 충돌 포인트에 둔 다음
  한 칸씩 전진시켜서 만나는 곳이 순환 시작 구간이다.
*/

'use strict';

let Node = function( value )
{
  return {
    value : value ,
    next : null
  };
};

let findFirstLoopNode = function( linkedList )
{
  let slow = linkedList;
  let fast = linkedList;
  let flag = false;

  while( true )
  {
    slow = slow.next;
    fast = fast.next.next;

    if( slow === fast )
    {
      flag = true;
      break;
    }
  }

  if( flag === false )
  {
    return null;
  }

  slow = linkedList;
  while( slow !== fast )
  {
    slow = slow.next;
    fast = fast.next;
  }

  return fast;
};

let nodeA = Node( 'A' );
let nodeB = nodeA.next = Node( 'B' );
let nodeC = nodeB.next = Node( 'C' );
let nodeD = nodeC.next = Node( 'D' );
let nodeE = nodeD.next = Node( 'E' );
let nodeF = nodeE.next = Node( 'F' );
let nodeG = nodeF.next = Node( 'G' );
let nodeH = nodeG.next = Node( 'H' );
nodeF.next = nodeE;

console.log( findFirstLoopNode( nodeA ) );

