import express from 'express'
import pool from '../../model/sqlConn'
import { Request, Response, NextFunction } from 'express'
import { UserList } from '@shared/types'
const router = express.Router()

const getUsers = (): Promise<UserList> => new Promise((resolve, reject) => {
    pool.getConnection(function (err: any, database: any) {
        if (err){ reject(err); return } 
        database.query(`SELECT * FROM users`, async function(err: any, result: any){
            database.release()
            if (err){ reject(err); return }
            resolve(result)
        })
    })
})

router
    .route('/information')
    .get(async (req: Request, res: Response, next: NextFunction) => {
        const users: UserList = await getUsers()
        res.json({ users })
    })

module.exports = router
