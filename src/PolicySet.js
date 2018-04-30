exports.PolicySet =  function getPolicySet() {
        return {
            "_id" : "5ae03e7132c2f126dc024f9d",
            "name" : "Product Policy - Florist access",
            "description" : "No access for global projects, full access for local products",
            "entityName" : "product",
            "policy" : {
                "subject" : {
                    "role" : [ 
                        "Florist",
                        "CSR"
                    ]
                },
                "resource" : {
                    "siteIds" : [ 
                        "FTD", 
                        "PRO", 
                        "IF"
                    ]
                },
                "action" : "CUSTOM",
                "ruleset" : {
                    "rules" : [ 
                        {
                            "priority" : 2,
                            "conditions" : {
                                "allOf" : [ 
                                    {
                                        "fact" : "policy.subject.role",
                                        "operator" : "equal",
                                        "value" : "Florist"
                                    },
                                    {
                                        "fact" : "policy.resource.siteIds",
                                        "operator" : "notequal",
                                        "value" : "custom"
                                    }
                                ]
                            },
                            "action" : "FULL_ACCESS"
                        }, 
                        {
                            "priority" : 1,
                            "conditions" : {
                                "anyOf" : [ 
                                    {
                                        "fact" : "policy.subject.role",
                                        "operator" : "equal",
                                        "value" : "APPLr"
                                    }
                                ]
                            },
                            "action" : "READ_ONLY"
                        }
                    ],
                    "default" : "NO_ACCESS"
                }
            }
        };
    }
    