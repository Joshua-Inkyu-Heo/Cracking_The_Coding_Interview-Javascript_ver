/*
  2.7 문제

  주어진 연결 리스트가 회문(Palindrome) 인지 검사하는 함수를 작성하라.

  회문) 0 > 1 > 2 > 1 > 0
*/

/*
  2.7 해답

  연결 리스트를 뒤집은 다음, 원래의 리스트와 비교할 수도 있고,
  연결 리스트 절반을 뒤집어 나머지 절반과 비교하는 방법이 있다.
  연결 리스트의 길이를 모를 경우, 앞서 사용했던 fast와 slow 포인터를
  응용하면 된다. slow를 한 칸씩 전진시키며 임의 변수에 slow.value를 push하고,
  fast를 두 칸씩 이동시킨다. fast가 끝부분에 도착했을 때, slow는 중간지점에
  도착할 것이다. 중간지점을 넘겨주고 slow를 한 칸씩 전진시키며, push 해준 것을
  역으로 pop 해주며 하나씩 비교하면 이 연결 리스트가 회문인지 알 수 있다.
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
LinkedList.prototype.checkPalindrome = function( linkedList )
{
  let slow = linkedList.head;
  let fast = linkedList.head;
  let stack = [];
  let checkPop;
  console.log(fast);

  while( fast != null && fast.next != null )
  {
    stack.push( slow.value );
    slow = slow.next;
    fast = fast.next.next;
  }

  slow = slow.next;

  while( slow != null )
  {
    //console.log('test');
    checkPop = stack.pop();
    if( checkPop != slow.value )
    {
      return false;
    }
    slow = slow.next;
  }
  return true;
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
list.addToTail( 0 );
list.addToTail( 1 );
list.addToTail( 2 );
list.addToTail( 1 );
list.addToTail( 0 );
// list.addToTail( 4 );

console.log( list.checkPalindrome( list ) );

