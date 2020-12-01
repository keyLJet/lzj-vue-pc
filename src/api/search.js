import request from "@utils/request";

export const reqGetProductList = (data = {}) => {
  return request({
    method: "POST",
    url: "/list",
    data,
  });
};
