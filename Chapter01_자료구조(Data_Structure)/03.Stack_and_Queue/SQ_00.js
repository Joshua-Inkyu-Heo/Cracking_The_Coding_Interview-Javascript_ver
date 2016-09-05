// 기본 Stack 구현
// pseudoclassical 방식으로 구현

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

Stack.prototype.size = function()
{
  return this.counter;
};

// let stack = new Stack();
// stack.push( 'a' );
// stack.push( 'b' );
// console.log( stack.size() );
// console.log( stack.pop() );
// console.log( stack.size() );


// --------------------------------------------------------

// 기본 Queueu 구현
// pseudoclassical 방식으로 구현

'use strict';

let Queue = function()
{
  this.first = 1;
  this.last = 0;
  this.storage = {};
};

Queue.prototype.enqueue = function( value )
{
  this.last++;
  this.storage[ this.last ] = value;
};

Queue.prototype.dequeue = function()
{
  let dequeued = this.storage[ this.first ];
  delete this.storage[ this.first ];
  this.first++;
  return dequeued;

};

Queue.prototype.size = function()
{
  if( this.first === this.last )
  {
    return 1;
  }
  else if( this.last - this.first < 0 )
  {
    return 0;
  }
  return this.last - this.first + 1;
};

let queue = new Queue();
queue.enqueue( 'a' );
queue.enqueue( 'b' );
queue.enqueue( 'c' );
console.log(queue);
console.log(queue.size());
console.log(queue.dequeue());
console.log(queue);
console.log(queue.size());

