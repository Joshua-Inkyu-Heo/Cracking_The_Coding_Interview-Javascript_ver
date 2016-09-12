/*
  3.3 문제

  접시 무더기를 떠올려 보자. 접시를 너무 높이 쌓으면, 넘어질 것이다.
  그러므로 현실에서는 무더기 높이가 특정한 수준 이상으로 높아지면
  새로운 무더기를 만든다. 이것을 흉내 내는 자료구조 setOfStacks를
  구현해 보라. setOfStacks는 여러 스택으로 구성되어야 하며,
  아전 스택이 지정된 용량을 초과하는 경우 새로운 스택을 생성해야 한다.
  push와 pop은 스택이 하나인 경우와 동일하게 동작해야 한다.
  다시 말해, pop은 정확히 하나의 스택이 있을 때와 동일하게 값을
  반환해야 한다.
*/

/*
  3.3 해답

  자료구조를 어떻게 설계해야 할지는 제시된 상태이다. push는 하나의
  스택을 사용하는 경우와 똑같이 동작해야 한다. 따라서, push 후 스택이
  용량 한계에 도달한 경우 새로운 스택을 만들어주고 스택 배열의
  마지막 스택에 새로 만든 push를 호출해야 한다.
  pop도 push의 경우와 마찬가지로 마지막 스택에 pop을 호출해야 한다.
  만일 pop을 한 다음에 스택이 빈 상태가 되면, 해당 스택은 스택 리스트
  에서 제거해야 한다.
*/

'use strict';

let makeNode = function( value )
{
  this.value = value;
  this.next = null;
};

let Stack = function()
{
  this.storage = null;
  this.counter = 0;
};

Stack.prototype.push = function( value )
{
  let newNode = new makeNode( value );
  if( !this.storage )
  {
    this.storage = newNode;
  }
  else
  {
    newNode.next = this.storage;
    this.storage = newNode;
  }
  this.counter++;
};

Stack.prototype.pop = function()
{
  if( !this.storage )
  {
    return null;
  }
  let popped = this.storage.value;
  this.storage = this.storage.next;
  this.counter--;
  return popped;
};

Stack.prototype.peek = function()
{
  if( !this.storage )
  {
    return null;
  }
  return this.storage.value;
};

let setOfStacks = function( maxValue )
{
  this.maxValue = maxValue || 5;
  this.stackOfStacks = new Stack();
  this.currentStack = null;
}

setOfStacks.prototype.push = function( value )
{
  let newNode = new makeNode( value );
  if( !this.currentStack || this.currentStack.counter === this.maxValue )
  { //need to create a new stack
    let newStack = new Stack();
    newStack.push( new makeNode( value ) );
    this.stackOfStacks.push( newStack );
    this.currentStack = this.stackOfStacks.peek();
  }
  else
  {
    this.currentStack.push( newNode );
  }
};

setOfStacks.prototype.pop = function()
{
  if( !this.currentStack )
  {
    return null;
  }
  let popped = this.currentStack.pop();
  if( !this.currentStack.counter )
  {
    this.stackOfStacks.pop();
    this.currentStack = this.stackOfStacks.peek();
  }
  return popped;
};

setOfStacks.prototype.peek = function()
{
  if( !this.currentStack )
  {
    return null;
  }
  return this.currentStack.peek();
};

let set = new setOfStacks(5);
set.push( 'a' );
set.push( 'b' );
set.push( 'c' );
set.push( 'd' );
set.push( 'e' );
set.push( 'f' );
set.push( 'g' );
set.push( 'h' );
console.log( set );

