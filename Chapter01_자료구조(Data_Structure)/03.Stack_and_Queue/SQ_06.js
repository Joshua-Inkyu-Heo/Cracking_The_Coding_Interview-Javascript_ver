/*
  3.6 문제

  큰 값이 위에 오도록 스택을 오름차순 정렬하는 프로그램을 작성하라.
  여벌 스택은 하나까지만 사용할 수 있고, 스탹에 보관된 요소를 배열 등의
  다른 자료구조로는 복사할 수 없다. 스택은 push, pop, peek, isEmpty
  네 가지 연산을 제공한다.
*/

/*
  3.6 해답

  해법 중 하나는 일반적인 정렬 알고리즘을 이용하는 것이다.
  스택 전체를 탐색하여 최솟값을 찾아 새로운 스택에 push하는 것인데,
  이렇게 하기 위해선 총 세 개의 스택이 필요하기 때문에 안된다.
  또 다른 방식은 최솟값을 계속 찾아 나가는 대신, stack1에서 꺼낸 값을
  stack2에 값 순서대로 삽입하여 정렬하는 방식을 사용하면 된다.
  3.5 문제와 비슷하게 두 개의 스택을 서로 pop, push하는 방식을 이용한다.
  기존의 방식대로가 아닌 Node를 이용한 방법으로 한다.

  예)   stack1    stack2
                   12
          5         8
         10         3
          7         1

  stack1    stack2    stack1    stack2    stack1    stack2    stack1    stack2
             12         8                   8                            12
              8    >   12              >   12         5     >             8
   10         3        10         3        10         3                   5
    7         1         7         1         7         1        10         3
                                                                7         1
      tmp = 5             tmp = 5            tmp = null
*/

'use strict';

let Stack = function()
{
  this.storage = {};
  this.counter = 0;
};

let MakeNode = function( value )
{
  this.value = value;
  this.next = null;
};

Stack.prototype.push = function( value )
{
  let newNode = new MakeNode( value );
  if( !this.storage )
  {
    this.storage = newNode;
  }
  else
  {
    // 노드 역순으로 Stack과 비슷하게
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

  if( this.counter === -1 )
  {
    this.counter = 0;
  }
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

Stack.prototype.isEmpty = function()
{
  if( !this.storage )
  {
    return true;
  }
  return false;
};

Stack.prototype.sort = function()
{
  let currStack = this;
  console.log(currStack.counter);
  let helperStack = new Stack();

  // 조건문을 !currStack.isEmpty() 으로 넣게되면
  // 반복이 총 6번이 되버림. 맨 앞의 값이 undefinded가 됨.
  // 그래서 isEmpty를 이용하지 않고 counter로 조건을 걸음.
  while( currStack.counter > 0 )
  { 
    helperStack.push( currStack.pop() );
    let node = helperStack.storage;
    while( node.next && node.value < node.next.value )
    {
      let curVal = node.value;
      node.value = node.next.value;
      node.next.value = curVal;
      node = node.next;
    }
  }
  this.storage = helperStack.storage;
};

let stack = new Stack();

stack.push( 3 );
stack.push( 1 );
stack.push( 8 );
stack.push( 9 );
stack.push( 4 );

stack.sort();

console.log(stack);

