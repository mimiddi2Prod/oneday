var tools = require("./../tool");

function SHOPLogin(){
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function(ver, param, res){
        var name = "SHOPLogin::Run";
        log.debug("SHOPLogin::Run.in");
        var data = [];
        var response = tool.error.OK;
        if(!param["op_id"]){
            response = tool.error.ErrorNotOpId;
        }
        // }else if(!param["user_type"]){
        //     response = tool.error.ErrorUserType;
        // }
        else{
            var sql = ""
            var row = [];
            try{
                sql = "select user_name,avatar,open_id,type,state,address_id,id from user where open_id = ?";
                row = await query(sql, [param["op_id"]]);
                if(row.length == 0 || row[0].avatar.length <= 0){
                    // response = tool.error.ErrorNotFoundUser;
                }else{
                    if(row[0]["state"] == 0){
                        var userType = row[0].type;
                        var user_id = row[0].id
                        data = {}
                        if(userType == 0){
                            data.nick_name = row[0].user_name;
                            data.avatar = row[0].avatar;
                            data.user_id = row[0].id;
                            data.address = []
                            // data.address_id = '';
                            if(row[0].address_id){
                                // data.address_id = row[0].address_id;
                                sql = 'select receiver,tel,province,city,area,road,id from address where id = ?'
                                row = await query(sql,row[0].address_id)
                                data.address = row
                                data.address[0].isDefault = true
                            }else{
                                sql = 'select receiver,tel,province,city,area,road,id from address where user_id = ?'
                                row = await query(sql,row[0].id)
                                if(row.length > 0){
                                    data.address[0] = row[0]
                                    data.address[0].isDefault = false
                                }
                            }

                        }
                        log.debug(name, "op_id:[", param["op_id"], "] is login succ");
                        await query("update user set last_login_time = CURRENT_TIMESTAMP where id = ? ", [user_id]);
                    }else{
                        response = tool.error.ErrorUserState;
                        log.warn(name, "op_id:[", param["op_id"], "] is forbidden login");
                    }
                }
            }catch(err){
                if(err.code){
                    response = tool.error.ErrorSQL;
                    log.warn(name, "code:", err.code, ", sql:", err.sql);
                }else{
                    log.warn(name, JSON.stringify(response));
                    response = tool.error.ErrorCatch;
                }
            }
        }

        if(response.code != tool.error.OKCode){
            log.warn(name, JSON.stringify(response));
        }

        tool.MakeResponse(200,
            {
                res: response,
                data:data,
                action:"login",
            }, res);
        tool.log.debug("SHOPLogin::Run.out");
    }
}

module.exports = SHOPLogin;