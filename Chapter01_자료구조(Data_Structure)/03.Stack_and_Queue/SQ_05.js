/*
  3.5 문제

  두 개의 스택을 사용하여 큐를 구현하는 MyQueue 클래스를 작성하라.
*/

/*
  3.5 해답

  큐와 스택의 차이는 순서다. enqueue일 때, 하나의 스택에 쌓기만 하면 된다.
  dequeue일 때에는 여러 가지가 반복된다. 첫 번째 스택에서 하나씩 pop 하여
  두 번째 스택에 전부 push하고, 두 번째 스택에서 하나를 pop 해서
  dequeue의 효과를 낸 다음, 두 번째 스택에서 하나씩 pop 하여 첫 번째
  스택에 전부 push 하면 된다.

  예) 1,2,3,4 enqueue 하고 dequeue 했을 시
  stack1    stack2    stack2    stack1
    4         1         2         4
    3    >    2    >    3    >    3
    2         3         4         2
    1         4
*/

'use strict';

let Stack = function()
{
  this.storage = {};
  this.counter = 0;
};

Stack.prototype.push = function( value )
{
  this.storage[ this.counter ] = value;
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

let MyQueue = function()
{
  this.stack1 = new Stack();
  this.stack2 = new Stack();
};

MyQueue.prototype.enqueue = function( value )
{
  this.stack1.push( value );
};

MyQueue.prototype.dequeue = function()
{
  while( this.stack1.counter > 0 )
  {
    this.stack2.push( this.stack1.pop() );
    this.stack1.counter--;
  }

  let popped = this.stack2.pop();

  while( this.stack2.counter > 0 )
  {
    this.stack1.push( this.stack2.pop );
    this.stack2.counter--;
  }

  return popped;
};

let myqueue = new MyQueue();

myqueue.enqueue( 'a' );
myqueue.enqueue( 'b' );
myqueue.enqueue( 'c' );
myqueue.enqueue( 'd' );
myqueue.enqueue( 'e' );

console.log( myqueue.dequeue() );

