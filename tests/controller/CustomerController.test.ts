import { CustomerController } from "../../src/controller/CustomerController";
import { Request, Response } from "express";
import { CustomerService } from "../../src/services/CustomerService";
import { GetUsers } from "../mock/users.mock";

jest.mock("../../src/services/CustomerService");

describe('Customer controller', () => {

    test('given find transaction by user, when success, then return transactions', async () => {
      const request = {} as Request;
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
  
      const mockGetAllUsers = jest.fn().mockResolvedValue(GetUsers.getAll);
      CustomerService.prototype.getAllUsers = mockGetAllUsers;
  
      const customerController = new CustomerController();
      await customerController.getAllUsers(request, response);
  
      expect(mockGetAllUsers).toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith(GetUsers);
    });
  
    test('given find transaction by user, when an error occurs, then return 500 status', async () => {
      const request = {} as Request;
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
  
      const errorMessage = 'An error occurred!';
      const mockGetAllUsers = jest.fn().mockRejectedValue(new Error(errorMessage));
      CustomerService.prototype.getAllUsers = mockGetAllUsers;
  
      const customerController = new CustomerController();
      await customerController.getAllUsers(request, response);
  
      expect(mockGetAllUsers).toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });