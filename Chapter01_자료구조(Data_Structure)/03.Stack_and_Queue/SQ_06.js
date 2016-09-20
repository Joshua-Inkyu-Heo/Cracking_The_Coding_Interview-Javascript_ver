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

Stack.prototype.sortInStack = function( stack )
{
  this.tmpStack = new Stack();
  this.tmp;


  this.tmpStack.push( stack.pop() );

};

let stack = new Stack();

stack.push( 3 );
stack.push( 1 );
stack.push( 8 );
stack.push( 9 );
stack.push( 4 );

stack.sortInStack( stack );