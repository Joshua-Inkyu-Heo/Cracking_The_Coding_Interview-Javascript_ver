/*
  2.2 문제

  단방향 연결 리스트에서 뒤에서 k번째 원소를 찾는 알고리즘을 구현하라.
*/

/*
  2.2 해답

  1. 연결 리스트의 길이를 아는 경우는 length - k를 구하면 되므로
     간단하다. 그러므로 제외.

  2. 재귀함수를 이용하여 마지막 원소에서 0을 리턴하고,
     재귀적으로 호출된 상위 메소드는 1을 더해서 반환하는 식으로
     k번째까지 반복하여 구할 수 있다.

  3. 포인터를 2개 사용해 k 노드 만큼 떨어지게 하면,
     맨 마지막 노드에 도착하는 순간 앞에 있는 포인터는
     뒤에서 k번째 노드를 가리키고 있을 것이다.
*/

'use strict';

let LinkedList = function()
{
  this.head = null;
  this.tail = null;
};

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// 실제 구현 부분. 3번으로 풀이.
LinkedList.prototype.findItem = function( target )
{
  let node = this.head;
  let i = 1;
  let kthNode;

  if( target <= 0 )
  {
    return;
  }
  while( node )
  {
    if( i == target )
    {
      kthNode = this.head;
    }
    else if( i - target > 0 )
    {
      kthNode = kthNode.next;
    }
    i++;
    node = node.next;
  }
  return kthNode;
};
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

LinkedList.prototype.makeNode = function( value )
{
  let node = {};
  node.value = value;
  node.next = null;
  return node;
};

LinkedList.prototype.addToTail = function( value )
{
  let newTail = this.makeNode( value );

  if( !this.head )
  {
    this.head = newTail;
  }
  if( this.tail )
  {
    this.tail.next = newTail;
  }
  this.tail = newTail;
};

var list = new LinkedList();
list.addToTail( 'a' );
list.addToTail( 'b' );
list.addToTail( 'c' );
list.addToTail( 'd' );
list.addToTail( 'e' );
list.addToTail( 'f' );
list.addToTail( 'g' );

console.log( list.findItem( 3 ) );

