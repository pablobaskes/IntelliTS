import { getUsers } from "../src/controllers/user.controller";
import * as userService from "../src/services/user.service";
import * as errorHandler from "../src/utils/error.handler";
import type { ReqExtended } from "../src/interfaces/ReqExtended.interface";
import type { Response } from "express";

jest.mock("../src/services/user.service");
jest.mock("../src/utils/error.handler");

describe("getUsers_function", () => {
  const req: Partial<ReqExtended> = { user: "testUser" };
  const res: Partial<Response> = {
    send: jest.fn(),
    status: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("test_get_users_returns_all_users", async () => {
    const mockUsers = [{ name: "John" }, { name: "Jane" }];
    (userService.getAllUsers as jest.Mock).mockResolvedValue(mockUsers);
    await getUsers(req as ReqExtended, res as Response);
    expect(res.send).toHaveBeenCalledWith({
      users: mockUsers,
      user: "testUser",
    });
  });

  it("test_get_users_empty_user_list", async () => {
    (userService.getAllUsers as jest.Mock).mockResolvedValue([]);
    await getUsers(req as ReqExtended, res as Response);
    expect(res.send).toHaveBeenCalledWith({ users: [], user: "testUser" });
  });

  it("test_get_users_handle_http_called", async () => {
    const error = "ERROR_GET_USERS";
    const e = new Error("Test error");
    (userService.getAllUsers as jest.Mock).mockRejectedValue(e);
    await getUsers(req as ReqExtended, res as Response);
    expect(errorHandler.handleHttp).toHaveBeenCalledWith(res, error, e);
  });
  it("test_get_users_invalid_request_object", async () => {
    const req = {};
    const error = "ERROR_GET_USERS";
    const e = new Error("Test error");
    (userService.getAllUsers as jest.Mock).mockRejectedValue(e);
    await getUsers(req as any, res as Response);
    expect(errorHandler.handleHttp).toHaveBeenCalledWith(res, error, e);
  });

  it("test_get_users_returns_user_and_users", async () => {
    const mockUsers = [{ name: "John" }, { name: "Jane" }];
    (userService.getAllUsers as jest.Mock).mockResolvedValue(mockUsers);
    await getUsers(req as ReqExtended, res as Response);
    expect(res.send).toHaveBeenCalledWith({
      users: mockUsers,
      user: "testUser",
    });
  });
});
