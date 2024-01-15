import { CustomerController } from "../../src/controller/CustomerController";
import { Request, Response } from "express";
import { CustomerService } from "../../src/services/CustomerService";
import { GetUsers } from "../mock/users.mock";
import { ApiError } from "../../src/helpers/api-errors";

jest.mock("../../src/services/CustomerService");

describe('Customer controller', () => {
  const customerController = new CustomerController();

  test('Return all registered users using the getAllusers function', async () => {
    const request = {} as Request;
    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockGetAllUsers = jest.fn().mockResolvedValue(GetUsers.getAll);
    CustomerService.prototype.getAllUsers = mockGetAllUsers;

    await customerController.getAllUsers(request, response);

    expect(mockGetAllUsers).toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(GetUsers.getAll);
  });

  test('Returning user data using the getByIdUser function', async () => {
    const request = {
        params: { id: "659352b50a38a3091fe527d3" }
    } as unknown as Request;

    const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    } as unknown as Response;

    const mockGetByIdUser = jest.fn().mockResolvedValue(GetUsers.getByUser);
    CustomerService.prototype.getByIdUser = mockGetByIdUser;

    await customerController.getByIdUser(request, response);

    expect(mockGetByIdUser).toHaveBeenCalledWith("659352b50a38a3091fe527d3");
    expect(response.status).toHaveBeenLastCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(GetUsers.getByUser);
  });

  // test('Returning user data in case of error using the getByIdUser function', async () => {
  //   const request = {
  //       params: { id: "123" }
  //   } as unknown as Request;

  //   const response = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn()
  //   } as unknown as Response;

  //   const mockGetByIdUser = jest.fn().mockResolvedValue(new ApiError("Usuário não encontrado", 404));
  //   CustomerService.prototype.getByIdUser = mockGetByIdUser;

  //   await customerController.getByIdUser(request, response);

  //   expect(mockGetByIdUser).toHaveBeenCalledWith("123");
  //   expect(response.status).toHaveBeenLastCalledWith(404);
  //   expect(response.json).toHaveBeenCalledWith("Usuário não encontrado");
  // });
});