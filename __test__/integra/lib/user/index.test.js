/** @format */
const mongoose = require("mongoose");
const User = require("../../../../src/model/User");
const {
    findUserByEmail,
    findUserById,
    count,
    isUserExist,
    create,
    findAll,
    removeItem,
    updateProperties,
} = require("../../../../src/lib/user/index");

const uri = "mongodb://localhost:27017/test_DB";

beforeAll(async () => {
    await mongoose.connect(uri);
    await User.deleteMany({});
});

afterAll(async () => {
    mongoose.connection.close();
});
const name = "habib";
const email = "habib18@gmail.com";
const password = "pass123";

const search = "xyz";
const page = 1;
const limit = 10;
const sortType = "desc";
const sortBy = "updatedAt";

describe("User create function", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe("if proper value is inputed", () => {
        test("should be return a user", async () => {
            const user = await create({ name, email, password });
            expect(user).toHaveProperty("name", "habib");
            expect(user).toHaveProperty("email", "habib18@gmail.com");
        });
    });

    describe("if input value is missing", () => {
        test("should throw badRequest error", async () => {
            await expect(create({})).rejects.toThrow("Bad Request");
        });
    });
    describe("if user already exists", () => {
        test("should throw badRequest error ", async () => {
            const userData = {
                name: "habib",
                email: "habib18@gmail.com",
                password: "pass123",
                account: "01313306145",
            };
            await expect(create(userData)).rejects.toThrow(
                "User already exists"
            );
        });
    });
});

describe("find user by email", () => {
    describe("if user exists", () => {
        test("should return user", async () => {
            const user = await findUserByEmail(email);
            const demoUser = {
                name: "habib",
                email: "habib18@gmail.com",
            };
            expect(user).toMatchObject(demoUser);
            expect(user).toHaveProperty("name");
            expect(user).toHaveProperty("email");
        });
    });
    describe("if user exists", () => {
        test("should return false", async () => {
            const email = "asif@gmail.com";
            const user = await findUserByEmail(email);
            expect(user).toBe(false);
            expect(user).not.toBe(true);
        });
    });
});

describe("find user by id", () => {
    describe("if does not exists user", () => {
        test("should return null", async () => {
            const id = "6506fa9a15f02938d7fce87a";
            const user = await findUserById(id);

            expect(user).toBeFalsy();
            expect(user).toBeNull();
        });
    });
    describe("if  exists user", () => {
        test("should return user", async () => {
            const user = await findUserByEmail(email);
            const user_2 = await findUserById(user.id);

            expect(user_2).toHaveProperty("name");
            expect(user_2).toHaveProperty("email");
        });
    });
});
describe("check user existence", () => {
    describe("when user exists", () => {
        test("should return true", async () => {
            const result = await isUserExist(email);
            expect(result).toBe(true);
        });
    });
    describe("when did not user exists", () => {
        test("should return true", async () => {
            const email = "asif@gmail.com";
            const result = await isUserExist(email);
            expect(result).toBe(false);
        });
    });
});

describe("count user", () => {
    describe("if search option is not provide", () => {
        test("should return user number", async () => {
            const userNumber = await count({});
            expect(userNumber).toBeDefined();
            expect(userNumber).toBeGreaterThan(0);
        });
    });
    describe("if search option  match a user", () => {
        test("should return user number", async () => {
            const search = "ha";
            const userNumber = await count({ search });
            expect(userNumber).toBeDefined();
            expect(userNumber).toBeGreaterThan(0);
        });
    });
    describe("if search option  did not match a user", () => {
        test("should not return any user number", async () => {
            const search = "xyz";
            const userNumber = await count({ search });
            expect(userNumber).toBeDefined();
            expect(userNumber).not.toBeGreaterThan(0);
        });
    });
});

describe("Find all users", () => {
    describe("if search option did not match a user", () => {
        test("should return empty array", async () => {
            const users = await findAll({
                page,
                limit,
                sortBy,
                sortType,
                search,
            });
            expect(users.length).toBeDefined();
            expect(users.length).toBeLessThan(1);
        });
    });
    describe("if search option  matches one or some user", () => {
        test("should return empty array", async () => {
            const search = "hab";
            const users = await findAll({
                page,
                limit,
                sortBy,
                sortType,
                search: search,
            });
            expect(users.length).toBeDefined();
            expect(users.length).toBeGreaterThan(0);
        });
    });
    describe("if search option do not pass", () => {
        test("should return empty array or array of users", async () => {
            const users = await findAll({
                page,
                limit,
                sortBy,
                sortType,
            });
            expect(users.length).toBeDefined();
            expect(users.length).toBeGreaterThanOrEqual(0);
        });
    });
});

describe("update user properties", () => {
    describe("if user  exist", () => {
        test("should return a updated user", async () => {
            const user = await findUserByEmail(email);
            const role = "customer";
            const updatedUser = await updateProperties(user.id, { role });
            expect(updatedUser).toHaveProperty("name");
            expect(updatedUser).toHaveProperty("email");
            expect(updatedUser).toHaveProperty("role", "customer");
        });
    });
    describe("if user does not exist", () => {
        test("should throw error", async () => {
            const id = "6506fe641ee2c0523481e0f0";
            const role = "customer";
            await expect(updateProperties(id, { role })).rejects.toThrow(
                "Requested resource not found"
            );
        });
    });
});

describe("remove user", () => {
    describe(" if id is not passed", () => {
        test("should throw error", async () => {
            await expect(removeItem()).rejects.toThrow("Id is required");
        });
    });
    describe(" if user is not exists", () => {
        test("should throw error", async () => {
            const id = "6506fe641ee2c0523481e0f0";
            await expect(removeItem(id)).rejects.toThrow(
                "Requested resource not found"
            );
        });
    });
    describe(" if user is exists", () => {
        test("should return deleted user", async () => {
            const user = await findUserByEmail(email);
            const deletedUser = await removeItem(user.id);

            expect(deletedUser).toBeDefined();
            expect(deletedUser).toHaveProperty("email");
            expect(deletedUser).toHaveProperty("name");
        });
    });
});
/* import request from 'supertest';
import express from 'express';
import userService from '../../src/lib/user';
// Import the controller function
import createController from '../../src/api/v1/user/controllers/create';
// Mock the userService module
jest.mock('../../src/lib/user', () => ({
  create: jest.fn(),
}));
// Create an Express app and use the controller
const app = express();
app.use(express.json());
app.post('/api/v1/users', createController);
describe('User Creation Controller', () => {
  it('should create a new user', async () => {
    // Mock the userService.create function to return a user object
    const mockUser = {
      _id: 'someUserId',
      name: 'Ali Akkas',
      email: 'ali@gmil.com',
      password: 'pass123',
      role: 'user',
      status: 'pending',
    };
    (userService.create as jest.Mock).mockResolvedValue(mockUser);
    const newUser = {
      name: 'Ali Akkas',
      email: 'ali@gmil.com',
      password: 'pass123',
      role: 'user',
      status: 'pending',
    };
    const response = await request(app).post('/api/v1/users').send(newUser).expect(201);
    // Assertions
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toEqual(mockUser);
  });
}); */
