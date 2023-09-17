/** @format */

const { originalModule } = require("./create.test");

jest.mock("../../../../src/lib/user/index", () => {
    originalModule = jest.requireActual("../../../../src/lib/user/index");
    return {
        ...originalModule,
        isUserExist: jest
            .fn()
            .mockResolvedValue(true) /* .mockReturnValue(true) */, // Mock the isUserExist function
    };
});
