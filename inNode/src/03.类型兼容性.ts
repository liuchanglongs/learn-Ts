/**
 * @Author: lcl
 * @Date: 2025/6/18
 */

import { error } from "console";

/**
 * 1. 基本类型
 * */
type Str = string;
const str = "llll";
const number = 11;
const a: Str = str;
// const a1:Str = number // 不能将类型“number”分配给类型“string”。

/**
 * 1. 对象
 * */
interface RequestData {
  code: number;
  type: string;
  time: string;
  error: string;
}
// 请求返回的值
const result = (() => {
  return { code: 200, name: "lcl", time: "", error: "", type: "", heihei: "" };
})();
const data: RequestData = result; // 兼容

const fn = (data: { type: string }) => {};
fn(data); // // 兼容

// 当一个类型系统具此属性时，被当做是“不可靠”的
// const obj: { type: string } = {  // 发生类型错误
//   code: 200,
//   name: "lcl",
//   time: "",
//   error: "",
//   type: "",
//   heihei: "",
// };

/**
 * 比较函数
 * */
let x = (a: number) => 0;
let y = (s: string, b: number) => 0;
let z = (b: number, s: string) => 0;

// y = x; // Error
// x = y; // Error
z = x;

/**
 * 函数参数双向协变
 * */
enum EventType {
  Mouse,
  Keyboard,
}

interface Event {
  timestamp: number;
}
interface MouseEvent extends Event {
  x: number;
  y: number;
}
interface KeyEvent extends Event {
  keyCode: number;
}

function listenEvent(eventType: EventType, handler: (n: Event) => void) {
  /* ... */
}

// Unsound, but useful and common
listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x + "," + e.y));

// 在具备可靠性（soundness）的情况下，不合意的替代方案
listenEvent(EventType.Mouse, (e: Event) =>
  console.log((<MouseEvent>e).x + "," + (<MouseEvent>e).y)
);
listenEvent(EventType.Mouse, <(e: Event) => void>(
  ((e: MouseEvent) => console.log(e.x + "," + e.y))
));

// 仍然禁止（明确报错）。针对完全不兼容的类型强制实施类型安全机制
// listenEvent(EventType.Mouse, (e: number) => console.log(e));

/**
 * 可选参数及剩余参数
 * */
function invokeLater(args: any[], callback: (...args: any[]) => void) {
  /* ... Invoke callback with 'args' ... */
}

// 不安全 ——invokeLater 方法「可能」会提供任意数量的参数
invokeLater([1, 2], (x, y) => console.log(x + ", " + y));

// 令人困惑（实际上 x 和 y 是必需的）且无法被自动发现
invokeLater([1, 2], (x, y) => console.log(x + ", " + y));
