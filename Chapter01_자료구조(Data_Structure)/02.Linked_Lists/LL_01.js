/*
  2.1 문제

 비정렬 연결 리스트에서 중복 문자를 제거하는 코드를 작성하라.
 연관문 : 임시 버퍼가 허용되지 않는 상황에서 이 문제를 어떻게 해결할 수 있겠는가?
*/

/*
  2.1 해답

  중복을 제거하기 위해선 중복 값 추적이 필요하다.
  간단하게 해시 테이블 혹은 객체 key-value pair로 처리할 수 있다.
  버퍼가 없다면 두 개의 포인터를 이용할 수 있다.
  하나의 포인트로 원래의 순환을 하며 기준점 역할을 하고,
  다른 하나로 기준점 이후의 중복 값을 찾아 삭제하면 된다.
  반복문 안의 반복문이라 O(N^2)이 요구된다.
*/

'use strict';

let LinkedList = function()
{
  this.head = null;
  this.tail = null;
};

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// 실제 구현 부분
// key-value pair 풀이. O(N)
LinkedList.prototype.findDuplication = function()
{
  let previous = this.head;
  let current = this.head.next;
  let temp = {};

  temp[ previous.value ] = true;

  while( current )
  {
    if( temp[ current.value ] )
    {
      previous.next = current.next;
    }
    else
    {
      temp[ current.value ] = true;
      previous = current;
    }
    current = current.next;
  }
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

LinkedList.prototype.removeHead = function()
{
  let currentHead = this.head;

  if( !this.head )
  {
    return null;
  }

  if( this.head === this.tail )
  {
    this.head = null;
    this.tail = null;
  }
  else
  {
    this.head = this.head.next;
  }
  return currentHead;
};

LinkedList.prototype.contains = function( target )
{
  if( !this.head )
  {
    return false;
  }
  let current = this.head;
  while( current )
  {
    if( current.value = target )
    {
      return true;
      break;
    }
    current = current.next;
  }
  return false;
};

var list = new LinkedList();
list.addToTail( 'a' );
list.addToTail( 'b' );
list.addToTail( 'c' );
list.addToTail( 'b' );
list.addToTail( 'b' );
list.addToTail( 'b' );
list.addToTail( 'e' );
list.findDuplication();

console.log( list.head.value );
console.log( list.head.next.value );
console.log( list.head.next.next.value );
console.log( list.head.next.next.next.value );
