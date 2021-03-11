import express from 'express';
import {_PORT, MongoDBUris} from './calc-1-main/config';

import {routes} from './calc-1-main/routes';
import {appUse} from './calc-1-main/appUse';
import bodyParser from 'body-parser';
import * as http from 'http';
import mongoose from 'mongoose';


const app = express();

// parse application/json
app.use(bodyParser.json({limit: '7mb'}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '7mb', extended: false}));


// appUse=> cookie, bodyparser, log middleware
appUse(app)

// основные роуты
routes(app);

const server = http.createServer(app)

// parse application/json
app.use(bodyParser.json({limit: '7mb'}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '7mb', extended: false}));

// подключаем БД
mongoose.connect(process.env.MongoDBUrl ?? MongoDBUris, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: false,
    useFindAndModify: true,
}).then(() => {

    console.log('db connected successfully')

    // слушаем порт
    server.listen(process.env.PORT || _PORT, () => {
        console.log(`server started`);
    });
}).catch(e => console.log('MongoDB connection error: ', {...e}));


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