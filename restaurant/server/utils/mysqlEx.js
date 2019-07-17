function DBA() {
    if (!DBA.instance) {
        DBA.instance = {};
    }
    return DBA.instance;
}

DBA.Init = function () {
    return new DBA()
};

DBA.SetName = function (pool) {
    DBA.instance.query = function (sql, arr) {
        return new Promise(function (resovle, reject) {
            pool.getConnection(function (err, conn) {
                if (err) {
                    reject(err);
                } else {
                    conn.query(sql, arr, function (err, res) {
                        if (err) {
                            reject(err);
                        } else {
                            res = JSON.stringify(res);
                            res = JSON.parse(res);
                            resovle(res);
                        }
                        conn.release();
                    })
                }
            })
        });
    };
};

DBA.GetName = function () {
    return DBA.instance.query
};

module.exports = DBA;



