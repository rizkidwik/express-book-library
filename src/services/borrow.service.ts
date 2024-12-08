import { BorrowModel, CreateBorrowRequest, ReturnBorrow, STATUS, UpdateBorrow } from "../models/borrow";

export class BorrowService {
    static async request(data: CreateBorrowRequest){
        const resultId = await BorrowModel.create(data);

        return { resultId };
    }

    static async approve(data: UpdateBorrow){
        const cekData = await BorrowModel.findById(data.id)
        if(!cekData){
            throw Error('Data not found')
        }

        const endDate = new Date()
        endDate.setDate(endDate.getDate() + cekData.day)
        data.status = STATUS['APPROVED']
        data.start_date = new Date()
        data.end_date = endDate
        const result = await BorrowModel.approve(data)

        return result
    }

    static async return(data: ReturnBorrow){
        const cekData = await BorrowModel.findById(data.id)
        if(!cekData){
            throw Error('Data not found')
        }

        const endDateBook = new Date(cekData.end_date)
        const today = new Date()

        data.status = STATUS['RETURN']
        data.end_date = new Date()

        if(endDateBook > today){
            data.status = STATUS['LATE']
        }
        const result = await BorrowModel.return(data)

        return result
    }

    static async userLateCheck(id: number){
        const result = await BorrowModel.userLateCheck(id)

        return result
    }
}