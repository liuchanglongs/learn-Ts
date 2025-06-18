/**
 * @Author: lcl
 * @Date: 2025/6/18
 */
/**
 * 1. 扩展与合并
 * */
interface User {
  name: string;
}
interface User {
  age: number; // 合并后 User 包含 name 和 age
  //   name:number  // 后续属性声明必须属于同一类型。属性“name”的类型必须为“string”，但此处却为类型“number”。
}
const user: User = { name: "Alice", age: 30 }; // 合法

type User1 = { name: string };
// type User1 = { age: number };  // 报错：重复定义
// 正确做法：使用交叉类型:& 前面的覆盖相同的属性类型
type User2 = {
  age: number;
  // name: number, // 不合法：类型要相同
} & User1;
const user2: User2 = { name: "Alice", age: 30 }; // 合法

// interface User3 extends User { age: string }
// 接口“User3”错误扩展接口“User”。
//   属性“age”的类型不兼容。
//     不能将类型“string”分配给类型“number”。

interface User3 extends User {
  age: number;
}
