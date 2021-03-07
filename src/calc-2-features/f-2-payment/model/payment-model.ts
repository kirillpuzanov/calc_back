import  {Schema, Document, model} from 'mongoose';


export interface IPayment extends Document {
    user_id: string
    user_name: string
    loadPlace: loadPlaceType
    packagingCargo: PackagingItemType[]
    withPallet: string
    totalCargoValue: TotalCargoValueType
    palletParam: PalletType
    transports: TransportType[]

    created: Date;
    updated: Date;
    _doc: object; // ?? загружать документ
}

const PaymentSchema: Schema = new Schema(
    {
        user_id: Schema.Types.ObjectId,
        user_name: String,
        loadPlace: String,
        packagingCargo: [{
            id: String,
            bagType: String,
            cargoTitle: String,
            width: Number,
            height: Number,
            length: Number,
            diameter: Number,
            weight: Number,
            amount: Number,
            inHeight:Boolean,
            inLength:Boolean,
            inWidth:Boolean,
            isStack:Boolean,
            img: String
        }],
        withPallet: String,
        totalCargoValue: {
            cargoVolume: Number,
            cargoMass: Number,
            maxL: Number,
            maxH: Number,
            maxW: Number,
        },
        palletParam: {
            id: String,
            typePallet: String,
            length: Number,
            width: Number,
            height: Number,
            carryingCapacity: Number,
            maxLoadingHeight: Number,
            separatorSheetHeight: Number,
            img: String
        },
        transports: [{
            id: String,
            car_name: String,
            car_char: String,
            car_o: Number,
            car_l: Number,
            car_w: Number,
            car_h: Number,
            car_m: Number,
            img: String
        }],

    },
    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'updated',
        },
    }
);
const PaymentModel = model<IPayment>('payment', PaymentSchema)
export default PaymentModel

export type loadPlaceType = 'Грузовик' | 'Контейнер'
export type PackagingItemType = {
    id: string // id  front
    bagType: string
    cargoTitle: string
    width: number
    height: number
    length: number
    diameter: number
    weight: number
    amount: number
    inHeight: boolean
    inLength: boolean
    inWidth: boolean
    isStack: boolean
    img: string
}
export type TotalCargoValueType = {
    cargoVolume: number
    cargoMass: number
    maxL: number
    maxH: number
    maxW: number
}
export type PalletType = {
    id: string
    typePallet: string
    length: number
    width: number
    height: number
    carryingCapacity: number
    maxLoadingHeight: number
    separatorSheetHeight: number
    img: string
}
export type TransportType = {
    id: string
    car_name: string
    car_char: string
    car_o: number
    car_l: number
    car_w: number
    car_h: number
    car_m: number
    img: string
}