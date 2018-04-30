exports.ActionSets = function getActionSetById(actionSetId) {
    return {
        "entityName" : "product",
        "actionSetId" : "BASIC_INFO",
        "attributeSet" : [ 
            {
                "name" : "name",
                "accessLevel" : "READ_ONLY",
                "_id" : ObjectId("5ac3128510ed4616289293ac")
            }, 
            {
                "name" : "id",
                "accessLevel" : "READ_ONLY",
                "_id" : ObjectId("5ac3128510ed4616289293ab")
            }, 
            {
                "name" : "price",
                "accessLevel" : "READ_ONLY",
                "_id" : ObjectId("5ac3128510ed4616289293aa")
            }, 
            {
                "name" : "last_modified_by",
                "accessLevel" : "NO_ACCESS",
                "_id" : ObjectId("5ac3128510ed4616289293a9")
            }, 
            {
                "name" : "sale_price",
                "accessLevel" : "NO_ACCESS",
                "_id" : ObjectId("5ac3128510ed4616289293a8")
            }
        ]
    }
    
}