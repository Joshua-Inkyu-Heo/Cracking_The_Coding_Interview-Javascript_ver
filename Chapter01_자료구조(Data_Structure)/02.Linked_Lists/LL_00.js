// 기본 Linked List 구현

'use strict';

let LinkedList = function()
{
  this.head = null;
  this.tail = null;
};

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

let list = new LinkedList();
console.log( list.tail ); //yields 'null'
list.addToTail( 4 );
list.addToTail( 5 );
console.log( list.head.value ); //yields '4';
console.log( list.contains( 5 ) ); //yields 'true';
console.log( list.contains( 6 ) ); //yields 'false';
list.removeHead(); //yields '4'
console.log( list.head.value ); //yields '5';
console.log( list.tail.value ); //yields '5';

