exports.sendresponse = (suc, err, mes, pay) => {
  var responseBody = {
    success: suc,
    error: err,
    message: mes,
    payload: pay
  };
  return responseBody;
};

exports.sendloginresponse = (suc, err, mes, usr, acc, ref) => {
  var payload = {
    user: usr,
    accessToken: acc,
    refreshToken: ref
  };
  var responseBody = {
    success: suc,
    error: err,
    message: mes,
    payload: payload
  };
  return responseBody;
};

exports.sendresponsePagination = (
  suc,
  err,
  mes,
  pay,
  pag,
  siz,
  totcou,
  hasmo,
  hasle
) => {
  var pagination = {
    page: pag,
    size: siz,
    totalcount: totcou,
    hasmore: hasmo,
    hasless: hasle
  };
  var responseBody = {
    success: suc,
    error: err,
    message: mes,
    payload: pay,
    pagination: pagination
  };
  return responseBody;
};
