/*
  2.3 문제

  단방향 연결 리스트의 중간에 있는 노드 하나를 삭제하는 알고리즘을
  구현하라. 삭제할 노드에 대한 접근만 가능하다는 것에 유의하라.
*/

/*
  2.3 해답

  연결 리스트의 head에 접근할 수 없다. 삭제할 노드에만 접근해야 하는데,
  다음 노드에 보관된 데이터를 노드에 복사한 다음, 다음 노드를 지우면 된다.
*/

'use strict';

LinkedList.prototype.removeNode = function( target )
{
  if( !target )
  {
    return;
  }

  if( !target.next )
  {
    return;
  }

  let deletingNodeData = target.value;
  target.value = target.next.value;
  target.next = target.next.next;

  return target;
};
