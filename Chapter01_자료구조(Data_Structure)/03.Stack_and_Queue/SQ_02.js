/*
  3.2 문제

  push와 pop의 두 가지 연산뿐 아니라, 최솟값을 갖는 원소를 반환하는
  min 연산을 갖춘 스택은 어떻게 구현할 수 있겠는가? push, pop, min은
  O(1) 시간에 처리되어야 한다.
*/

/*
  3.2 해답

  시간복잡도가 O(1)인 것을 고려해야 한다. 스택의 각 상태마다 최솟값을
  추적하면 최솟값을 쉽게 구할 수 있다. 스택의 최상위 노드 만을 보고
  최솟값을 알아내는 방식으로 구현한다.
  스택이 이전 상태로 돌아가면 최솟값 또한 이전 상태로 돌아가게 한다.
  원소를 스택에 쌓을 때, 그 원소에 현재 최솟값을 전달한다.
  하지만 이 풀이 방법은 각 원소마다 최솟값을 기록하느라 공간이 낭비된다.
*/

'use strict';

let Stack = function()
{
  this.storage = {};
  this.min = undefined;
  this.counter = 0;
};

Stack.prototype.makeNode = function( value )
{
  let node = {};
  node.value = value;
  node.next = null;
  return node;
};

Stack.prototype.push = function( value )
{
  let newTail = this.makeNode( value );

  if( !this.min )
  {
    this.min = value;
    newTail.next = value;
  }
  else if( this.min > value )
  {
    this.min = value;
    newTail.next = value;
  }
  else
  {
    newTail.next = this.min;
  }
  this.storage[ this.counter ] = newTail;
  this.counter++;
};

Stack.prototype.pop = function()
{
  this.counter--;
  let popped = this.storage[ this.counter ];
  delete this.storage[ this.counter ];

  if( this.counter === -1 )
  {
    this.counter = 0;
  }

  return popped;
};

Stack.prototype.findMin = function()
{
  return this.storage[ this.counter - 1 ].next;
};

let stack = new Stack();
stack.push( 3 );
stack.push( 5 );
stack.push( 8 );
console.log( stack.findMin() ); // 3
stack.push( 2 );
console.log( stack.findMin() ); // 2
stack.pop();
console.log( stack.findMin() ); // 3

