import request from "@utils/request";

// 封装登陆请求功能函数
export const reqLogin = (phone, password) => {
  return request({
    method: "POST",
    url: "/user/passport/login",
    data: {
      phone,
      password,
    },
    /* params:{},//get请求时，放置查询字符串参数 */
  });
};

//发送注册请求
export const reqRegister = ({ phone, password, code }) => {
	return request({
		method: "POST",
		url: "/user/passport/register",
		data: {
			phone,
			password,
			code,
		},
	});
};
