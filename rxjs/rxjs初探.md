## 两种设计模式

#### 观察者模式

观察者模式要解决的问题，就是在一个持续产生事件的系统中，如何分割功能，让不同模块只需处理一部分逻辑。

![](assets\pic1.png)

发布者只管生产事件，它会通知其所有名下的观察者，而不关心观察者如何处理这些事件。相对的，观察者只管接受事件并处理，不关心数据如何产生。

在Rxjs中Observable是发布者，通过subscribe，将发布者和观察者联系起来。

#### 迭代器模式

迭代器是指能够遍历一个数据集合的对象，其作用是提供一个通用接口，让使用者不用关心这个数据集合的具体迭代方式。

迭代器另一个容易理解的名词叫游标（cursor），就像是一个移动的指针一样，从集合中一个元素移动到另一个元素，完成对整个集合的遍历。

在Rxjs中，作为迭代器的使用者，并不需要主动从Observable中去拉数据，而是只要subscribe上Observable之后，自动就可以收到消息推送。



## Observable和Observer

Observable会持续的emit数据，直到遇到complete才会终止。

```ts
import { Observable, Observer } from "rxjs";

const onSubscribe = (observer: Observer<number>) => {
    observer.next(1)
    observer.next(2)
    observer.complete()
}

const source = new Observable(onSubscribe)
const testObserver = {
    next(item) {
        console.log(item)
    },
    complete() {
        console.log('completed')
    }
}
source.subscribe(testObserver)

// 1

// 2

// completed
```

如果Observable里面没有complete，那么发布者会一直发布，不会终止，即使可能没有数据被emit出来。可以在[弹珠图示例网站](https://rxviz.com/examples/basic-interval)查看执行效果：

![](assets\pic2.png)

```js
Rx.Observable.create(obs => {
	obs.next(1)
})
```



## 各种功能操作符

实际业务中，上游得到的数据可能要经过多个中间处理过程之后才会返回给下游，而中间的处理过程就是使用多种操作符来实现。每个操作符之间都是独立的，因此，可以对操作符进行任意组合从而产生多种功能数据管道。

![](assets\pic3.png)

```ts
import { of, pipe, take, map } from "rxjs";

const tick = of(1,2,3,4).pipe(
    take(3),
    map(x => x + 3)
)
tick.subscribe(console.log)

// 4

// 5

// 6
```



## Subject

#### Cold Observable 和 Hot Observable

现实中有两种订阅模式，一种是订阅那一刻再接受Observable产生的数据（A）；另外一种是订阅之后，之前Observable发送的数据也希望拿到（B）。

非常现实的例子，电视台的任何一个频道节目如果看作一个Observable对象，那么每一台电视机就是一个Observer。当你打开电视切换频道的时候，相当于subscribe了对应频道的Observable，毫无疑问，切换到某个频道，你所看到的节目内容是从那一刻开始的，不包含之前的内容。这种A订阅模式称为**Hot Observable**。

另外一种是有机顶盒或者数字智能网络电视具有点播回看功能，这种B订阅模式称为**Cold Observable**。

每一个Cold Observable概念上都可以理解成对每一次subscribe都产生一个生产者，然后这个生产者产生的数据通过next函数传递给订阅的Observer。

而对于Hot Observable，概念上是没有一个独立于Observable对象的生产者，这个生产者的创建和subscribe调用没有关系，subscribe调用只是让Observer连接上生产者而已。

一个Observable是热还是冷，是相对生产者而言。如果每次订阅，都有一个热的生产者准备好，就是Hot Observable。相反，如果每次订阅都需要产生一个新的生产者，新的生产者就像汽车引擎一样刚启动是冷的，所以叫Cold Observable

#### 多播

Subject主要用于实现多播。和广播不同，多播是有限制的传播，比如说发朋友圈和发微博之间的区别。Subject的作用是将单播转换成多播。

![](assets\pic4.png)

Subject主要就是充当一个中间人的角色，对下游提供Observable能力，对上游提供Observer的能力。

```ts
import { Subject } from "rxjs"

const subject = new Subject()
const observer1 = {
    next: val => console.log('on observer1 data: ' + val),
    complete: () => console.log('on observer1 complete')
}
const subscription1 = subject.subscribe(observer1)
subject.next(1)
const observer2 = {
    next: val => console.log('on observer2 data: ' + val),
    complete: () => console.log('on observer2 complete')
}
subject.subscribe(observer2)
subject.next(2)
subscription1.unsubscribe()
subject.complete()


输出结果
// on observer1 data: 1 

// on observer1 data: 2 

// on observer2 data: 2 
//  
// on observer2 complete 
```

