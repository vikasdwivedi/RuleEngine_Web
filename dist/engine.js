"use strict";

var policyset = {
    "_id": "5ae03e7132c2f126dc024f9d",
    "name": "Product Policy - Florist access",
    "description": "No access for global projects, full access for local products",
    "entityName": "product",
    "policy": {
        "subject": {
            "role": ["Florist", "CSR"]
        },
        "resource": {
            "siteIds": ["FTD", "PRO", "IF"]
        },
        "action": "CUSTOM",
        "ruleset": {
            "rules": [{
                "priority": 2,
                "conditions": {
                    "allOf": [{
                        "fact": "policy.subject.role",
                        "operator": "equal",
                        "value": "Florist"
                    }, {
                        "fact": "policy.resource.siteIds",
                        "operator": "notequal",
                        "value": "custom"
                    }]
                },
                "action": "FULL_ACCESS"
            }, {
                "priority": 1,
                "conditions": {
                    "anyOf": [{
                        "fact": "policy.subject.role",
                        "operator": "equal",
                        "value": "APPLr"
                    }]
                },
                "action": "READ_ONLY"
            }],
            "default": "NO_ACCESS"
        }
    }
};

var SourceObject;

function SortRulesByParameter(Rulesets, SortParameter) {
    return Rulesets.sort(function (a, b) {
        var x = a[SortParameter];var y = b[SortParameter];
        return x < y ? -1 : x > y ? 1 : 0;
    });
}

var run = function run(sourceObj, Rulesets) {
    SourceObject = sourceObj;
    var defaultAction = Rulesets.default;
    var sortingParameter = 'priority';
    var sortedRules = SortRulesByParameter(Rulesets.rules, sortingParameter);

    for (var i = 0; i < sortedRules.length; i++) {
        if (ProcessRule(sortedRules[i].conditions)) {
            return sortedRules[i].action;
        }
    }

    return defaultAction;
};

function ProcessRule(Conditions) {
    var result;
    var ruleConditions;

    if (Conditions.allOf) {
        ruleConditions = Conditions.allOf;
        result = ProcessCondition(ruleConditions[0]);

        for (var i = 1; i < ruleConditions.length; i++) {

            if (result === false) {
                return false;
            } else {
                result = result && ProcessCondition(ruleConditions[i]);
            }
        }
        return result;
    } else if (Conditions.anyOf) {
        ruleConditions = Conditions.anyOf;
        result = ProcessCondition(ruleConditions[0]);

        for (var _i = 1; _i < Conditions.anyOf.length; _i++) {

            if (result === true) {
                return true;
            } else {
                result = result || ProcessCondition(ruleConditions[_i]);
            }
        }
        return result;
    } else return false;
}

function ProcessCondition(Condition) {
    var factName = Condition.fact;
    var factValueFromSource = getFactValueFromSource(factName);

    if (factValueFromSource == null) return false;

    switch (Condition.operator) {
        case 'equal':
            return CheckEquality(Condition.value, factValueFromSource);
            break;
        case 'notequal':
            return CheckInEquality(Condition.value, factValueFromSource);
            break;
        default:
            break;
    }
}

function CheckEquality(Source, Target) {
    if (Array.isArray(Target)) {
        return Target.indexOf(Source) > -1;
    } else return Source == Target;
}

function CheckInEquality(Source, Target) {
    if (Array.isArray(Target)) {
        return Target.indexOf(Source) < 0;
    } else return Source != Target;
}

function getFactValueFromSource(factName) {
    var factNameSplit = factName.split('.');
    var factObjFromSource = SourceObject[factNameSplit[0]];
    if (factNameSplit.length > 1) {
        for (var i = 1; i < factNameSplit.length; i++) {
            factObjFromSource = factObjFromSource[factNameSplit[i]];

            if (factObjFromSource === undefined) {
                return null;
            }
        }
    }

    return factObjFromSource;
}

console.log(run(policyset, policyset.policy.ruleset));

exports.RunEngine = run;
//# sourceMappingURL=engine.js.map