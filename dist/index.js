"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./calc-1-main/config");
const routes_1 = require("./calc-1-main/routes");
const appUse_1 = require("./calc-1-main/appUse");
const body_parser_1 = __importDefault(require("body-parser"));
const http = __importStar(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = express_1.default();
// parse application/json
app.use(body_parser_1.default.json({ limit: '7mb' }));
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ limit: '7mb', extended: false }));
// appUse=> cookie, bodyparser, log middleware
appUse_1.appUse(app);
// основные роуты
routes_1.routes(app);
const server = http.createServer(app);
// parse application/json
app.use(body_parser_1.default.json({ limit: '7mb' }));
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ limit: '7mb', extended: false }));
// подключаем БД
mongoose_1.default.connect(config_1.MongoDBUris, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: false,
    useFindAndModify: true,
}).then(() => {
    console.log('db connected successfully');
    // слушаем порт
    server.listen(process.env.PORT || config_1._PORT, () => {
        console.log(`server started`);
    });
}).catch(e => console.log('MongoDB connection error: ', Object.assign({}, e)));
// Имя Описание
// $eq Соответствует значениям, которые равны указанному значению.
// $gt Соответствует значениям, которые больше указанного значения.
// $gte Соответствует значениям, которые больше или равны указанному значению.
// $in Соответствует любому из значений, указанных в массиве.
// $lt Соответствует значениям, которые меньше указанного значения.
// $lte Соответствует значениям, которые меньше или равны указанному значению.
// $ne Соответствует всем значениям, которые не равны указанному значению.
// $nin Не соответствует ни одному из значений, указанных в массиве.
// $and Объединяет предложения запроса с логическим И возвращает все документы, которые соответствуют условиям обоих предложений.
// $not Инвертирует эффект выражения запроса и возвращает документы, которые не соответствуют выражению запроса.
// $nor Объединяет предложения запроса с логическим NOR и возвращает все документы, которые не соответствуют обоим предложениям.
// $or Объединяет предложения запроса с логическим ИЛИ возвращает все документы, которые соответствуют условиям любого из предложений.
// $exists Соответствует документам с указанным полем.
// $type Выбирает документы, если поле имеет указанный тип.
// $expr Позволяет использовать выражения агрегации на языке запросов.
// $jsonSchema Проверять документы на соответствие данной JSON-схеме.
// $mod Выполняет операцию по модулю над значением поля и выбирает документы с указанным результатом.
// $regex Выбирает документы, значения которых соответствуют заданному регулярному выражению.
// $text Выполняет текстовый поиск.
// $where Соответствует документам, которые удовлетворяют выражению JavaScript.
//# sourceMappingURL=index.js.map