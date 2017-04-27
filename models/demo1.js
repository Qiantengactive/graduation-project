// var person_info = require("./huinong_info.js");
// /*
//  蔬菜：1
//  水果：2
//  禽类：3
//  水产：4
//  其他：5
//  */
//
// var data = {
//     "info_name": "张龙2",
//     "info_tel": "17600000002",
//     "info_pwd": "1234",
//     "info_site": {
//         "info_pro": "河南",
//         "info_city": "郑州",
//         "info_cout":"中原区",
//         "info_detail_add":"河南工业大学"
//     },
//     "seller_all": [
//         {
//             "type": 2,
//             "seller_name": "圣女果1",
//             "seller_price": "2元/斤",
//             "seller_weight": "5000斤",
//             "seller_site": {
//                 "pro": "河南",
//                 "city": "洛阳"
//             },
//             "seller_desc": "圣女果1圣女果1圣女果1圣女果1圣女果1圣女果11",
//             "pics": ["1.png", "2.png"]
//         },
//         {
//             "type": 2,
//             "seller_name": "圣女果2",
//             "seller_price": "2元/斤",
//             "seller_weight": "5000斤",
//             "seller_site": {
//                 "pro": "河南",
//                 "city": "洛阳"
//             },
//             "seller_desc": "圣女果2圣女果2圣女果2圣女果2圣女果2圣女果2圣女果22",
//             "pics": ["1.png", "2.png"]
//         },
//         {
//             "type": 2,
//             "seller_name": "圣女果3",
//             "seller_price": "2元/斤",
//             "seller_weight": "5000斤",
//             "seller_site": {
//                 "pro": "河南",
//                 "city": "洛阳"
//             },
//             "seller_desc": "圣女果3圣女果3圣女果3圣女果3圣女果33",
//             "pics": ["1.png", "2.png"]
//         },
//     ],
//     "get_all": [
//         {
//             "type": 3,
//             "get_name": "鸡肉1",
//             "get_price": "2/斤",
//             "get_weight": "400斤",
//             "get_site": {
//                 "get_pro": "河南",
//                 "get_city": "新郑"
//             },
//             "get_desc": "鸡肉1鸡肉1鸡肉1鸡肉1鸡肉1鸡肉1",
//         },
//         {
//             "type": 1,
//             "get_name": "鸡肉2",
//             "get_price": "2/斤",
//             "get_weight": "400斤",
//             "get_site": {
//                 "get_pro": "河南",
//                 "get_city": "新郑"
//             },
//             "get_desc": "鸡肉2鸡肉2鸡肉2鸡肉2鸡肉2鸡肉2鸡肉2",
//         },
//         {
//             "type": 1,
//             "get_name": "鸡肉3",
//             "get_price": "2/斤",
//             "get_weight": "400斤",
//             "get_site": {
//                 "get_pro": "河南",
//                 "get_city": "新郑"
//             },
//             "get_desc": "鸡肉3鸡肉3鸡肉2鸡肉2鸡肉2鸡肉2",
//         }
//     ]
// };
// person_info.create(data, function (error) {
//     if (error) {
//         console.log(error);
//     }
//     console.log("保存成功");
// });