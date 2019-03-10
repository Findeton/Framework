"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pgQueryPostProcessor = (queryString, queryParameters) => {
    let parameterCount = 0;
    let tokenizedQuery = queryString.split("");
    let outputQuery = "";
    let outputParameters = [];
    for (let i = 0; i < tokenizedQuery.length; i++) {
        if (tokenizedQuery[i] === "?") {
            if (tokenizedQuery[i + 1] === "?") {
                outputQuery += queryParameters[parameterCount];
                parameterCount++;
                i = i + 1;
            }
            else {
                outputQuery += `$${outputParameters.length + 1}`;
                outputParameters.push(queryParameters[parameterCount]);
                parameterCount++;
            }
        }
        else if (tokenizedQuery[i] === "$") {
            for (let j = i + 1; j < tokenizedQuery.length; j++) {
                if (Number.isNaN(Number(tokenizedQuery[j]))) {
                    i = j + 1;
                    break;
                }
                else if (j === tokenizedQuery.length - 1) {
                    i = j;
                    break;
                }
            }
            outputQuery += `$${outputParameters.length + 1}`;
            outputParameters.push(queryParameters[parameterCount]);
            parameterCount++;
        }
        else {
            outputQuery += tokenizedQuery[i];
        }
    }
    return [outputQuery, outputParameters];
};
//# sourceMappingURL=PGQueryPostProcessor.js.map