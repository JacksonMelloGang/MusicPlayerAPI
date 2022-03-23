const keyhelp = {
    "insert": {
        "method": "PUT",
        "routes": "/key",
        "header": {"authorization": "masterkey"},
        "return": "new key"
    },
    "delete": {
        "method": "DELETE",
        "routes": "/key",
        "header": {"authorization": "masterkey"},
        "body": "key to delete",
        "return": "success / error"
    },
    "get": {
        "method": "GET",
        "routes": "/key",
        "return": "help"
    },
    "get": {
        "method": "GET",
        "routes": "/key/?key={key}",
        "return": "information about the specified key / no information"
    }
};


module.exports = {
    keyhelp : keyhelp,
}