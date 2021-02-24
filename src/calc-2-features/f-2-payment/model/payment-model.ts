import  {Schema, Document, model} from 'mongoose';


export interface IPayment extends Document {
    // _id: mongoose.Types.ObjectId
    // user_name: mongoose.Types.ObjectId
    loadPlace: string
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
        // user_id: Schema.Types.ObjectId,
        // user_name: String,
        loadPlace: String,
        packagingCargo: [{
            id: String,
            img: String,
            title: String,
            width: Number,
            height: Number,
            length: Number,
            diameter: Number,
            volume: Number,
            weight: Number,
            amount: Number,
            inHeight:Boolean,
            inLength:Boolean,
            inWidth:Boolean,
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


export type PackagingItemType = {
    id: string
    img: string
    title: string
    width: number
    height: number
    length: number
    diameter: number
    volume: number
    weight: number
    amount: number
    inHeight:boolean,
    inLength:boolean,
    inWidth:boolean,
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