import request from "supertest"
import { connectDB, disconnectDB } from "../config/database"
import { app } from '../app'

describe('Authentication endpoints' , () => {
    beforeAll(async () => {
        await connectDB()
    })

    afterAll(async () => {
        await disconnectDB()
    })

    describe('POST /auth/register', () => {
        it('should register a new user successfully', async () => {
            const response = await request(app)
            .post('/auth/register')
            .send({
                name: 'testing',
                email: 'test2@mail.com',
                password: '12345678'
            })

            expect(response.statusCode).toBe(201)
            expect(response.body).toHaveProperty('data')
            expect(response.body.data).toHaveProperty('token')
        })
    })

    describe('POST /auth/login', () => {
        it('should login successfully with correct credentials', async () => {
            const response = await request(app)
            .post('/auth/login')
            .send({
                name: 'testing',
                email: 'test1@mail.com',
                password: '12345678'
            })

            expect(response.statusCode).toBe(200)
            expect(response.body).toHaveProperty('data')
            expect(response.body.data).toHaveProperty('token')
            expect(response.body.data).toHaveProperty('user')
        })
    })
})