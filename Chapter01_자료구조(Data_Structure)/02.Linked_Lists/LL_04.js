/*
  2.4 문제

  x값을 갖는 노드를 기준으로 연결 리스트를 나누는 코드를 작성하라.
  x보다 작은 값을 갖는 노드가 x와 같거나 더 큰 값을 갖는 노드들보다
  앞쪽에 오도록 하면 된다.
*/

/*
  2.4 해답

  두 개의 임시 연결 리스트를 사용하여, 하나에는 x보다 작은 원소들을 보관하고,
  하나에는 x보다 큰 원소들을 저장한다. 원래의 연결 리스트의 순회가 끝나면
  분할작업이 끝난 것이므로, 두 개의 연결 리스트를 합치면 된다.
*/

'use strict';

let LinkedList = function()
{
  this.head = null;
  this.tail = null;
};

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// 실제 구현 부분.
LinkedList.prototype.partitionList = function( value )
{
  let beforeVal = new LinkedList();
  let afterVal = new LinkedList();
  let p1 = this.head;

  while( p1 )
  {
    if( p1.value < value )
    {
      beforeVal.addToTail( p1.value );
    }
    else if( p1.value >= value )
    {
      afterVal.addToTail( p1.value );
    }
    p1 = p1.next;
  }

  let p2 = beforeVal.head;
  while( p2.next )
  {
    p2 = p2.next;
  }
  p2.next = afterVal.head;

  return beforeVal;
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

let list = new LinkedList();
list.addToTail( 5 );
list.addToTail( 2 );
list.addToTail( 4 );
list.addToTail( 3 );
list.addToTail( 1 );
list.addToTail( 9 );
list.addToTail( 7 );
// console.log( list );

console.log( list.partitionList( 3 ) );

