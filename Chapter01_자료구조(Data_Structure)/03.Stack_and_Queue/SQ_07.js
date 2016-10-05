/*
  3.7 문제

  먼저 들어온 동물이 먼저 나가는 동물 쉼터가 있다고 하자. 이 쉼터는
  개와 고양이만 수용할 수 있다. 사람들은 쉼터의 동물들 가운데 들어온지
  가장 오래된 동물부터 입양할 수 있는데, 개와 고양이 중 어떤 동물을
  데려갈지 선택할 수도 있다. 특정한 동물을 지정해 데려가는건 금지되어
  있다. 이 시스템을 자료구주로 구현하라. 해당 자료구조는 enqueue,
  dequeueAny, dequeueDog, dequeueCat의 연산들을 제공해야 한다.
*/

/*
  3.7 해답

  하나의 queue만 이용하면, dequeueAny의 구현은 편해지지만, dequeueDog,
  dequeueCat을 구현하려면 queue를 뒤져 첫 번째 개나 고양이를 찾아야만 한다.
  이렇게 되면 복잡도는 증가하고 효율성은 떨어진다. 그러므로 개와 고양이를 
  별도 queue로 관리하고, 그 두 queue를 AnimalQueue라는 클래스로 감싸는 것이다. 여기에 각 동물이 언제 queue에 들어갔는지 나타내는 일종의 time stamp를 
  지정해주면 된다. deqeueAny를 구현할 때 두 queue의 맨 앞 항목만 보고 
  time stamp가 가장 빠른것을 골라내면 된다.
*/

'use strict';

let Queue = function()
{
  this.first = 1;
  this.last = 0;
  this.storage = {};
};

let AnimalQueue = function()
{
  this.dogQueue = new Queue();
  this.catQueue = new Queue();
  this.timeStamp = 0;
};

AnimalQueue.prototype.enqueue = function( kind , name )
{
  if( kind === 'dog')
  {
    this.dogQueue.last++;
    this.dogQueue.storage[ this.dogQueue.last ] = [ name , this.timeStamp ];
    this.timeStamp++;
  }
  else if( kind === 'cat')
  {
    this.catQueue.last++;
    this.catQueue.storage[ this.catQueue.last ] = [ name , this.timeStamp ];
    this.timeStamp++;
  }
  else
  {
    console.log('Insert Error!!');
  }
};

AnimalQueue.prototype.dequeueDog = function()
{
  let dequeued = this.dogQueue.storage[ this.dogQueue.first ];
  delete this.dogQueue.storage[ this.dogQueue.first ];
  this.dogQueue.first++;
  return dequeued;
};

AnimalQueue.prototype.dequeueCat = function()
{
  let dequeued = this.catQueue.storage[ this.catQueue.first ];
  delete this.catQueue.storage[ this.catQueue.first ];
  this.catQueue.first++;
  return dequeued;
};

AnimalQueue.prototype.dequeueAny = function()
{
  let compareDog = this.dogQueue.storage[ this.dogQueue.first ][1];
  let compareCat = this.catQueue.storage[ this.catQueue.first ][1];

  if( compareDog > compareCat)
  {
    return this.dequeueCat();
  }
  else
  {
    return this.dequeueDog();
  }
};

let queue = new AnimalQueue();

queue.enqueue("dog" , "Alex");
queue.enqueue("dog" , "Bob");
queue.enqueue("dog" , "Cherry");
queue.enqueue("cat" , "Daisy");
queue.enqueue("cat" , "Elliott");
queue.enqueue("cat" , "Foxy");
queue.enqueue("dog" , "Goldie");
queue.enqueue("cat" , "Hottie");

console.log(queue.dequeueDog());
console.log(queue.dequeueCat());
console.log(queue.dequeueAny());
console.log(queue.dequeueAny());
console.log(queue.dequeueAny());


